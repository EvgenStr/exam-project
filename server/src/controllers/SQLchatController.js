const createHttpError = require('http-errors');
const {
  Conversation,
  Message,
  User,
  BlackList,
  FavoriteList,
  Catalog,
  ConversationsToCatalogs,
  sequelize,
} = require('../models');
const socketController = require('../socketInit');
const userQueries = require('./queries/userQueries');
const CONSTANTS = require('../constants');

module.exports.addMessage = async (req, res, next) => {
  try {
    const {
      tokenData: { userId, role },
      body: { recipient, messageBody },
    } = req;
    const participants = [userId, recipient];
    let customerId = null;
    let creatorId = null;

    if (role === CONSTANTS.CUSTOMER) {
      customerId = userId;
      creatorId = recipient;
    } else {
      customerId = recipient;
      creatorId = userId;
    }

    const [conversation] = await Conversation.findOrCreate({
      where: { customerId, creatorId },
    });

    if (!conversation) {
      return next(createHttpError(401, 'Invalid conversation'));
    }
    const newMessage = await Message.create({
      userId,
      body: messageBody,
      conversationId: conversation.id,
    });
    newMessage.participants = participants;
    const preview = {
      _id: conversation.id,
      sender: newMessage.userId,
      text: newMessage.body,
      createAt: newMessage.createdAt,
      participants,
      blackList: [false, false],
      favoriteList: [false, false],
    };
    socketController.getNotificationController().emitNewMessage({
      recipient,
      userId,
      dialogId: conversation.id,
    });
    socketController
      .getChatController()
      .emitNewMessage(recipient, { newMessage, preview });
    res.send({ message: newMessage, preview });
  } catch (e) {
    next(e);
  }
};

module.exports.getChat = async (req, res, next) => {
  try {
    const {
      body: { interlocutorId },
      tokenData: { userId, role },
    } = req;
    let customerId = null;
    let creatorId = null;

    if (role === CONSTANTS.CUSTOMER) {
      customerId = userId;
      creatorId = interlocutorId;
    } else {
      customerId = interlocutorId;
      creatorId = userId;
    }

    const [conversation] = await Conversation.findOrCreate({
      where: { customerId, creatorId },
    });
    const conversationWithMessages = await conversation.getMessages(); /*pagination*/
    const interlocutor = await User.findByPk(interlocutorId, {
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    res.send({ messages: conversationWithMessages, interlocutor });
  } catch (e) {
    next(e);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const {
      tokenData: { userId, role },
    } = req;

    const conversations = await Conversation.findAll({
      where:
        role === CONSTANTS.CREATOR
          ? { creatorId: userId }
          : { customerId: userId },
      include: [
        { model: Message, limit: 1 },
        {
          model: User,
          as: role === 'creator' ? 'customer' : 'creator',
          attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
          include: [
            { model: BlackList, as: 'blockedUser' },
            { model: FavoriteList, as: 'favoriteUser' },
          ],
        },
      ],
    });
    if (!conversations) {
      return res.send([]);
    }

    const result = conversations.map(conversation => {
      const prepared = {};
      prepared.interlocutor =
        conversation[role === 'creator' ? 'customer' : 'creator'];
      prepared.blackList = prepared.interlocutor.blockedUser;
      prepared.participants = [conversation.customerId, conversation.creatorId];
      prepared.favoriteList = prepared.interlocutor.favoriteUser;
      prepared._id = conversation.id;
      prepared.sender = null;
      prepared.text = '';
      if (conversation.Messages[0]) {
        prepared.sender = conversation.Messages[0].userId || null;
        prepared.text = conversation.Messages[0].body || null;
      }
      return prepared;
    });

    res.send(result);
  } catch (e) {
    next(e);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const {
      body: { blackListFlag, participants },
      tokenData: { userId, role },
    } = req;

    const index = participants.indexOf(userId);
    const conversation = await Conversation.findOne({
      where:
        role === CONSTANTS.CREATOR
          ? { creatorId: userId }
          : { customerId: userId },
    });

    conversation.blackList[index] = blackListFlag;
    const updatedConversation = await conversation.save();
    if (!updatedConversation) {
      return next(createHttpError(400, "Blacklist can't be updated"));
    }
    updatedConversation.dataValues.participants = participants;
    const interlocutorId = req.body.participants.filter(
      participant => participant !== req.tokenData.userId,
    )[0];
    socketController
      .getChatController()
      .emitChangeBlockStatus(interlocutorId, updatedConversation);
    res.send(updatedConversation);
  } catch (e) {
    next(e);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const {
      body: { favoriteFlag, participants },
      tokenData: { userId, role },
    } = req;

    const index = participants.indexOf(userId);
    const conversation = await Conversation.findOne({
      where:
        role === CONSTANTS.CREATOR
          ? { creatorId: userId }
          : { customerId: userId },
    });

    conversation.favoriteList[index] = favoriteFlag;
    const updatedConversation = await conversation.save();
    if (!updatedConversation) {
      return next(createHttpError(400, "Favorite list can't be updated"));
    }
    updatedConversation.dataValues.participants = participants;

    res.send(updatedConversation);
  } catch (e) {
    next(e);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
      body: { catalogName, chatId },
    } = req;
    const conversation = await Conversation.findByPk(chatId);
    if (!conversation) {
      return next(createHttpError(400, 'Invalid conversation'));
    }
    const catalog = await Catalog.create(
      {
        catalogName,
        userId,
        chats: [chatId],
      },
      { raw: true },
    );
    catalog.dataValues._id = catalog.id;
    // console.log(catalog, 'CATALOG');

    res.send(catalog);
  } catch (e) {
    next(e);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const {
      tokenData: { userId },
    } = req;
    const catalogs = await Catalog.findAll({
      raw: true,
      where: { userId },
    });

    catalogs.forEach(catalog => {
      catalog._id = catalog.id;
    });
    res.send(catalogs);
  } catch (e) {
    next(e);
  }
};
module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const catalog = await Catalog.findByPk(catalogId);

    if (!catalog) {
      return next(createHttpError(400, 'Invalid catalog'));
    }

    catalog.catalogName = catalogName;
    const updatedCatalog = await catalog.save();
    updatedCatalog.dataValues._id = updatedCatalog.id;

    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const catalog = await Catalog.findByPk(catalogId);
    const conversation = await Conversation.findByPk(chatId);
    if (!catalog || !conversation) {
      return next(createHttpError(400, 'Invalid catalog'));
    }
    if (catalog.chats.includes(chatId)) {
      return next(
        createHttpError(400, 'the conversation is already in the catalog'),
      );
    }

    const updatedCatalog = await catalog.update({
      chats: sequelize.fn('array_append', sequelize.col('chats'), chatId),
    });
    updatedCatalog.dataValues._id = updatedCatalog.id;
    console.log(updatedCatalog, 'UPDATEBDYBDW');
    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};
