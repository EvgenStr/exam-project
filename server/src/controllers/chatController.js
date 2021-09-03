const createHttpError = require('http-errors');
const {
  Conversation,
  Message,
  User,
  Catalog,
  sequelize,
} = require('../models');
const { prepareRoles } = require('../utils/functions');
const socketController = require('../socketInit');
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
      params: { interlocutorId },
      tokenData: { userId, role },
    } = req;

    const { customerId, creatorId } = prepareRoles(
      role,
      userId,
      interlocutorId,
    );

    const [conversation] = await Conversation.findOrCreate({
      where: { customerId, creatorId },
    });
    const conversationWithMessages = await conversation.getMessages();
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
    const { userId, role } = req.tokenData;

    const conversations = await Conversation.findAll({
      where:
        role === CONSTANTS.CREATOR
          ? { creatorId: userId }
          : { customerId: userId },
      include: [
        { model: Message, limit: 1 },
        {
          model: User,
          as:
            role === CONSTANTS.CREATOR ? CONSTANTS.CUSTOMER : CONSTANTS.CREATOR,
          attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
        },
      ],
    });
    if (!conversations) {
      return res.send([]);
    }

    conversations.forEach(conversation => {
      conversation.dataValues.interlocutor =
        conversation[
          role === CONSTANTS.CREATOR ? CONSTANTS.CUSTOMER : CONSTANTS.CREATOR
        ];
      conversation.dataValues.participants = [
        conversation.customerId,
        conversation.creatorId,
      ];
      conversation.dataValues._id = conversation.id;
      conversation.sender = null;
      conversation.text = '';
      if (conversation.Messages[0]) {
        conversation.sender = conversation.Messages[0].userId || null;
        conversation.text = conversation.Messages[0].body || null;
      }
    });

    res.send(conversations);
  } catch (e) {
    next(e);
  }
};

module.exports.addToBlackList = async (req, res, next) => {
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
      return next(createHttpError(400, 'Blacklist can"t be updated'));
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

module.exports.addToFavoriteList = async (req, res, next) => {
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
      return next(createHttpError(400, 'Favorite list can"t be updated'));
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
    console.log(req.body, 'REQ BODY');
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
    if (!updatedCatalog) {
      return next(createHttpError(400, 'Name can"t be updated'));
    }
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
        createHttpError(400, 'The conversation is already in the catalog'),
      );
    }

    const updatedCatalog = await catalog.update({
      chats: sequelize.fn('array_append', sequelize.col('chats'), chatId),
    });

    if (!updatedCatalog) {
      return next(createHttpError(400, 'Conversation can"t be added'));
    }

    updatedCatalog.dataValues._id = updatedCatalog.id;
    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const catalog = await Catalog.findByPk(catalogId);

    if (!catalog) {
      return next(createHttpError(400, 'Invalid catalog'));
    }
    const updatedCatalog = await catalog.update({
      chats: sequelize.fn('array_remove', sequelize.col('chats'), chatId),
    });
    if (!updatedCatalog) {
      return next(createHttpError(400, 'Conversation can"t be removed'));
    }
    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.params;
    const catalog = await Catalog.destroy({
      where: { id: catalogId },
    });
    if (catalog !== 1) {
      return next(createHttpError(404, 'Catalog not found'));
    }
    res.end();
  } catch (e) {
    next(e);
  }
};
