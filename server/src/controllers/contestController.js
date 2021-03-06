const createHttpError = require('http-errors');
const { changeOfferStatusMail } = require('../services/mailService');
const db = require('../models');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const fileDelete = require('../utils/fileDelete');
const CONSTANTS = require('../constants');

module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const {
      query: { characteristic1, characteristic2 },
    } = req;
    const types = [characteristic1, characteristic2, 'industry'].filter(
      Boolean,
    );

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [db.Sequelize.Op.or]: types,
        },
      },
    });
    if (!characteristics) {
      return next(createHttpError(400, 'Wrong characteristic type'));
    }
    characteristics.forEach(characteristic => {
      if (!response[characteristic.type]) {
        response[characteristic.type] = [];
      }
      response[characteristic.type].push(characteristic.describe);
    });
    res.send(response);
  } catch (e) {
    next(e);
  }
};

module.exports.getContestById = async (req, res, next) => {
  try {
    const { contestId } = req.params;
    let contestInfo = await db.Contest.findOne({
      where: { id: contestId },
      order: [[db.Offer, 'id', 'asc']],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken'],
          },
        },
        {
          model: db.Offer,
          required: false,
          where:
            req.tokenData.role === CONSTANTS.CREATOR
              ? { userId: req.tokenData.userId }
              : {
                  status: {
                    [db.Sequelize.Op.in]: [
                      CONSTANTS.OFFER_STATUS_ACCEPTED,
                      CONSTANTS.OFFER_STATUS_REJECTED,
                      CONSTANTS.OFFER_STATUS_WON,
                    ],
                  },
                },
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: ['password', 'role', 'balance', 'accessToken'],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (e) {
    next(e);
  }
};

module.exports.updateContest = async (req, res, next) => {
  try {
    let oldContest = null;
    const { contestId } = req.params;

    if (req.file) {
      oldContest = await db.Contest.findByPk(contestId);
      req.body.fileName = req.file.filename;
      req.body.originalFileName = req.file.originalname;
    }
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    if (oldContest) {
      fileDelete(oldContest.fileName);
    }

    res.send(updatedContest);
  } catch (e) {
    next(e);
  }
};

module.exports.setNewOffer = async (req, res, next) => {
  try {
    const newOffer = {};
    if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
      newOffer.fileName = req.file.filename;
      newOffer.originalFileName = req.file.originalname;
    } else {
      newOffer.text = req.body.offerData;
    }
    newOffer.userId = req.tokenData.userId;
    newOffer.contestId = req.params.contestId;

    const createdOffer = await contestQueries.createOffer(newOffer);
    createdOffer.contestId = undefined;
    createdOffer.userId = undefined;
    controller
      .getNotificationController()
      .emitEntryCreated(req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, createdOffer, { User }));
  } catch (e) {
    return next(e);
  }
};

module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  if (req.body.command === 'reject') {
    try {
      const offer = await rejectOffer(
        req.body.offerId,
        req.body.creatorId,
        req.body.contestId,
      );
      res.send(offer);
    } catch (e) {
      next(e);
    }
  } else if (req.body.command === 'resolve') {
    try {
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(
        req.body.contestId,
        req.body.creatorId,
        req.body.orderId,
        req.body.offerId,
        req.body.priority,
        transaction,
      );
      res.send(winningOffer);
    } catch (e) {
      transaction.rollback();
      next(e);
    }
  }
};

module.exports.getCustomersContests = async (req, res, next) => {
  const {
    pagination: { limit, offset },
    params: { userId, status },
  } = req;
  db.Contest.findAll({
    where: { status, userId },
    limit,
    offset,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        where: {
          status: {
            [db.Sequelize.Op.in]: [
              CONSTANTS.OFFER_STATUS_ACCEPTED,
              CONSTANTS.OFFER_STATUS_REJECTED,
              CONSTANTS.OFFER_STATUS_WON,
            ],
          },
        },
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest =>
          (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(e => next(e));
};

module.exports.getContests = async (req, res, next) => {
  const {
    query: { typeIndex, contestId, industry, awardSort, limit, offset },
  } = req;
  const ownEntries = req.query.ownEntities === 'true';

  const predicates = UtilFunctions.createWhereForAllContests(
    typeIndex,
    contestId,
    industry,
    awardSort,
  );

  db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit,
    offset: offset || 0,
    include: [
      {
        model: db.Offer,
        required: ownEntries,
        where: ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest =>
          (contest.dataValues.count = contest.dataValues.Offers.length),
      );
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(e => {
      next(e);
    });
};

module.exports.getOffersForModerator = async (req, res, next) => {
  try {
    const {
      pagination: { limit, offset },
    } = req;
    const { count, rows: offers } = await db.Offer.findAndCountAll({
      where: {
        status: {
          [db.Sequelize.Op.notIn]: [
            CONSTANTS.OFFER_STATUS_REJECTED,
            CONSTANTS.OFFER_STATUS_WON,
          ],
        },
      },
      order: [['id', 'DESC']],
      limit,
      offset,
      include: [
        { model: db.User, attributes: ['displayName', 'email'] },
        { model: db.Contest, attributes: ['status', 'title', 'focusOfWork'] },
      ],
    });

    if (!count) {
      return next(createHttpError(404, 'No offers'));
    }

    res.send({ count, offers });
  } catch (e) {
    next(e);
  }
};

module.exports.setOfferStatusForModerator = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const offer = await db.Offer.findOne({
      where: { id },
      include: [{ model: db.User, attributes: ['displayName', 'email'] }],
    });
    if (!offer) return next(createHttpError(404, 'Offer not found'));
    offer.status = status;
    const updatedOffer = await offer.update({ status });

    if (!updatedOffer)
      return next(createHttpError(500, 'Offer can"t be updated'));
    const {
      User: {
        dataValues: { displayName, email },
      },
    } = updatedOffer;
    await changeOfferStatusMail(email, displayName, status);
    res.send(updatedOffer);
  } catch (e) {
    next(e);
  }
};

const rejectOffer = async (offerId, creatorId, contestId) => {
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED },
    { id: offerId },
  );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      creatorId,
      'Someone of yours offers was rejected',
      contestId,
    );
  return rejectedOffer;
};

const resolveOffer = async (
  contestId,
  creatorId,
  orderId,
  offerId,
  priority,
  transaction,
) => {
  const finishedContest = await contestQueries.updateContestStatus(
    {
      status: db.sequelize.literal(`CASE
            WHEN "id"=${contestId}  AND "orderId"='${orderId}' THEN '${
        CONSTANTS.CONTEST_STATUS_FINISHED
      }'
            WHEN "orderId"='${orderId}' AND "priority"=${priority + 1}  THEN '${
        CONSTANTS.CONTEST_STATUS_ACTIVE
      }'
            ELSE '${CONSTANTS.CONTEST_STATUS_PENDING}'
            END`),
    },
    { orderId },
    transaction,
  );
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId,
    transaction,
  );
  const updatedOffers = await contestQueries.updateOfferStatus(
    {
      status: db.sequelize.literal(` CASE
            WHEN "id"=${offerId} THEN '${CONSTANTS.OFFER_STATUS_WON}'
            ELSE '${CONSTANTS.OFFER_STATUS_REJECTED}'
            END
    `),
    },
    {
      contestId,
    },
    transaction,
  );
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach(offer => {
    if (
      offer.status === CONSTANTS.OFFER_STATUS_REJECTED &&
      creatorId !== offer.userId
    ) {
      arrayRoomsId.push(offer.userId);
    }
  });
  controller
    .getNotificationController()
    .emitChangeOfferStatus(
      arrayRoomsId,
      'Someone of yours offers was rejected',
      contestId,
    );
  controller
    .getNotificationController()
    .emitChangeOfferStatus(creatorId, 'Someone of your offers WIN', contestId);
  return updatedOffers[0].dataValues;
};
