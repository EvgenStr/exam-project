const createHttpError = require('http-errors');
const { Conversation, Message } = require('../models');
const User = require('../models/user');
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
    let customerId = null;
    let creatorId = null;

    if (role === CONSTANTS.CUSTOMER) {
      customerId = userId;
      creatorId = recipient;
    } else {
      customerId = recipient;
      creatorId = userId;
    }
    const participants = [userId, recipient];

    const [conversation, created] = await Conversation.findOrCreate({
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
    res.send({ newMessage, preview });
  } catch (e) {
    next(e);
  }
};
