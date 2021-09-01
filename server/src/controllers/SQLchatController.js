const createHttpError = require('http-errors');
const {
  Conversation,
  Message,
  User,
  BlackList,
  FavoriteList,
} = require('../models');
const ConversationsToCatalogs = require('../models/conversationstocatalogs');
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
      body: { interlocutorId, conversationId },
    } = req;
    const conversation = await Conversation.findByPk(conversationId);
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

    const result = conversations.map(conversation => {
      const prepared = {};
      prepared.interlocutor =
        conversation[role === 'creator' ? 'customer' : 'creator'];
      prepared.blackList = prepared.interlocutor.blockedUser;
      prepared.sender = conversation.Messages[0].userId;
      prepared.text = conversation.Messages[0].body;
      prepared.participants = [conversation.customerId, conversation.creatorId];
      prepared.favoriteList = prepared.interlocutor.favoriteUser;
      prepared._id = conversation.id;
      return prepared;
    });

    res.send(result);
  } catch (e) {
    next(e);
  }
};
