const { Conversation, Message, User } = require('../../models');
const CONSTANTS = require('../../constants');

module.exports.findOrCreateConversation = async (customerId, creatorId) =>
  await Conversation.findOrCreate({
    where: { customerId, creatorId },
  });

module.exports.createMessage = async (userId, body, conversationId) =>
  await Message.create({ userId, body, conversationId });

module.exports.getConversationMessages = async conversationInstance =>
  await conversationInstance.getMessages();

module.exports.getConversationsPreviews = async (userId, role) =>
  await Conversation.findAll({
    where:
      role === CONSTANTS.CREATOR
        ? { creatorId: userId }
        : { customerId: userId },
    include: [
      { model: Message, limit: 1 },
      {
        model: User,
        as: role === CONSTANTS.CREATOR ? CONSTANTS.CUSTOMER : CONSTANTS.CREATOR,
        attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
      },
    ],
  });

module.exports.updateConversationBlackList = async (
  userId,
  role,
  flag,
  index,
) => {
  const where =
    role === CONSTANTS.CREATOR ? { creatorId: userId } : { customerId: userId };
  const conversation = await Conversation.findOne({ where });
  conversation.blackList[index] = flag;

  const [_, [updatedConversation]] = await Conversation.update(
    { blackList: conversation.blackList },
    {
      where,
      returning: true,
    },
  );
  return updatedConversation;
};

module.exports.updateConversationFavoriteList = async (
  userId,
  role,
  flag,
  index,
) => {
  const where =
    role === CONSTANTS.CREATOR ? { creatorId: userId } : { customerId: userId };
  const conversation = await Conversation.findOne({ where });

  conversation.favoriteList[index] = flag;
  const [_, [updatedConversation]] = await Conversation.update(
    { favoriteList: conversation.favoriteList },
    {
      where,
      returning: true,
    },
  );
  return updatedConversation;
};
