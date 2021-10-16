const createHttpError = require('http-errors');
const chatQueries = require('./queries/chatQueries');
const {
  prepareRoles,
  createPreview,
  prepareConversations,
} = require('../utils/functions');
const socketController = require('../socketInit');
const CONSTANTS = require('../constants');

module.exports.addMessage = async (req, res, next) => {
  try {
    const {
      tokenData: { userId, role },
      body: { recipient, messageBody },
    } = req;
    const participants =
      role === CONSTANTS.CUSTOMER ? [userId, recipient] : [recipient, userId];
    const { customerId, creatorId } = prepareRoles(role, userId, recipient);

    const [conversation] = await chatQueries.findOrCreateConversation(
      customerId,
      creatorId,
    );

    if (!conversation) {
      return next(createHttpError(500, 'Invalid conversation'));
    }

    const newMessage = await chatQueries.createMessage(
      userId,
      messageBody,
      conversation.id,
    );
    newMessage.dataValues.participants = participants;
    const interlocutor = await chatQueries.getInterlocutor(recipient);

    const preview = createPreview(
      conversation.id,
      newMessage,
      participants,
      interlocutor,
    );

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

    if (parseInt(interlocutorId) === parseInt(userId)) {
      return next(createHttpError(500, 'Users should not be the same.'));
    }

    const [conversation] = await chatQueries.findOrCreateConversation(
      customerId,
      creatorId,
    );

    const conversationWithMessages = await chatQueries.getConversationMessages(
      conversation,
    );
    const interlocutor = await chatQueries.getInterlocutor(interlocutorId);
    res.send({ messages: conversationWithMessages, interlocutor });
  } catch (e) {
    next(e);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const { userId, role } = req.tokenData;
    const conversations = await chatQueries.getConversationsPreviews(
      userId,
      role,
    );
    if (!conversations) {
      return res.send([]);
    }
    const previews = prepareConversations(conversations, role);

    res.send(previews);
  } catch (e) {
    next(e);
  }
};

module.exports.updateBlackList = async (req, res, next) => {
  try {
    const {
      body: { blackListFlag, participants },
      tokenData: { userId, role },
    } = req;
    const index = participants.indexOf(userId);
    const where =
      role === CONSTANTS.CREATOR
        ? { creatorId: userId }
        : { customerId: userId };
    const conversation = await chatQueries.getConversation(where);
    conversation.blackList[index] = blackListFlag;
    const updatedConversation = await chatQueries.updateBlackOrFavoriteList(
      where,
      conversation.blackList,
      'black',
    );
    if (!updatedConversation) {
      return next(createHttpError(500, 'Blacklist can"t be updated'));
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

module.exports.updateFavoriteList = async (req, res, next) => {
  try {
    const {
      body: { favoriteFlag, participants },
      tokenData: { userId, role },
    } = req;
    const index = participants.indexOf(userId);
    const where =
      role === CONSTANTS.CREATOR
        ? { creatorId: userId }
        : { customerId: userId };
    const conversation = await chatQueries.getConversation(where);
    conversation.favoriteList[index] = favoriteFlag;
    const updatedConversation = await chatQueries.updateBlackOrFavoriteList(
      where,
      conversation.favoriteList,
      'favorite',
    );
    if (!updatedConversation) {
      return next(createHttpError(500, 'Favorite list can"t be updated'));
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
    const conversation = await chatQueries.getConversationByPk(chatId);
    if (!conversation) {
      return next(createHttpError(404, 'Invalid conversation'));
    }
    const catalog = await chatQueries.newCatalog(chatId, catalogName, userId);

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
    const catalogs = await chatQueries.getAllUserCatalogs(userId);
    res.send(catalogs);
  } catch (e) {
    next(e);
  }
};

module.exports.updateCatalogName = async (req, res, next) => {
  try {
    const { catalogId, catalogName } = req.body;
    const catalog = await chatQueries.getCatalog(catalogId);
    catalog.catalogName = catalogName;
    const updatedCatalog = await catalog.save();

    if (!updatedCatalog) {
      return next(createHttpError(500, 'Catalog name can"t be updated'));
    }
    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const catalog = await chatQueries.getCatalog(catalogId);
    const conversation = await chatQueries.getConversationByPk(chatId);

    if (!catalog || !conversation) {
      return next(createHttpError(404, 'Invalid catalog'));
    }
    if (catalog.chats.includes(chatId)) {
      return next(
        createHttpError(500, 'The conversation is already in the catalog'),
      );
    }

    const updatedCatalog = await chatQueries.addChatToCatalog(catalog, chatId);

    if (!updatedCatalog) {
      return next(createHttpError(500, 'Conversation can"t be added'));
    }

    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const { catalogId, chatId } = req.body;
    const catalog = await chatQueries.getCatalog(catalogId);

    if (!catalog) {
      return next(createHttpError(400, 'Invalid catalog'));
    }
    const updatedCatalog = await chatQueries.removeChatFromCatalog(
      catalog,
      chatId,
    );
    if (!updatedCatalog) {
      return next(createHttpError(500, 'Conversation can"t be removed'));
    }
    res.send(updatedCatalog);
  } catch (e) {
    next(e);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const { catalogId } = req.params;
    const catalog = await chatQueries.destroyCatalog(catalogId);
    if (catalog !== 1) {
      return next(createHttpError(404, 'Catalog not found'));
    }
    res.end();
  } catch (e) {
    next(e);
  }
};
