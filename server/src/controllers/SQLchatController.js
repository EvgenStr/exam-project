const Conversation = require('../models/conversation');
const Message = require('../models/message');
const ConversationsToCatalogs = require('../models/conversationstocatalogs');
const socketController = require('../socketInit');
const userQueries = require('./queries/userQueries');

module.exports.addMessage = async (req, res, next) => {
  const {
    tokenData: { id },
    body: { recipient },
  } = req;
};
