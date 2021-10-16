const {
  Conversation,
  Message,
  User,
  Catalog,
  sequelize,
} = require('../../models');
const CONSTANTS = require('../../constants');

module.exports.findOrCreateConversation = async (customerId, creatorId) =>
  await Conversation.findOrCreate({
    where: { customerId, creatorId },
  });

module.exports.createMessage = async (userId, body, conversationId) =>
  await Message.create({ userId, body, conversationId });

module.exports.getConversationMessages = async conversationInstance =>
  await conversationInstance.getMessages();

module.exports.getConversationsPreviews = async (userId, role) => {
  const where =
    role === CONSTANTS.CREATOR ? { creatorId: userId } : { customerId: userId };
  return await Conversation.findAll({
    where,
    include: [
      { model: Message, limit: 1 },
      {
        model: User,
        as: role === CONSTANTS.CREATOR ? CONSTANTS.CUSTOMER : CONSTANTS.CREATOR,
        attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
      },
    ],
  });
};

module.exports.getConversation = async where =>
  await Conversation.findOne({ where });

module.exports.updateBlackOrFavoriteList = async (where, list, type) => {
  const [_, [updatedConversation]] = await Conversation.update(
    type === 'black' ? { blackList: list } : { favoriteList: list },
    {
      where,
      returning: true,
    },
  );
  return updatedConversation;
};

module.exports.newCatalog = async (chatId, catalogName, userId) => {
  const catalog = await Catalog.create(
    {
      catalogName,
      userId,
      chats: [chatId],
    },
    { raw: true },
  );

  return catalog;
};

module.exports.getAllUserCatalogs = async userId => {
  const catalogs = await Catalog.findAll({
    raw: true,
    where: { userId },
  });

  return catalogs;
};

module.exports.getCatalog = async catalogId =>
  await Catalog.findByPk(catalogId);

module.exports.getConversationByPk = async conversationId =>
  await Conversation.findByPk(conversationId);

module.exports.destroyCatalog = async id =>
  await Catalog.destroy({
    where: { id },
  });

module.exports.getInterlocutor = async interlocutorId =>
  await User.findByPk(interlocutorId, {
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });

module.exports.addChatToCatalog = async (instance, chatId) =>
  await instance.update({
    chats: sequelize.fn('array_append', sequelize.col('chats'), chatId),
  });

module.exports.removeChatFromCatalog = async (instance, chatId) =>
  await instance.update({
    chats: sequelize.fn('array_remove', sequelize.col('chats'), chatId),
  });
