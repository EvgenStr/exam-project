const { Conversation, Message, User, Catalog } = require('../../models');
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

module.exports.getConversation = async chatId =>
  await Conversation.findByPk(chatId);

module.exports.newCatalog = async (chatId, catalogName, userId) => {
  const catalog = await Catalog.create(
    {
      catalogName,
      userId,
      chats: [chatId],
    },
    { raw: true },
  );
  catalog.dataValues._id = catalog.id;
  return catalog;
};

module.exports.getAllUserCatalogs = async userId => {
  const catalogs = await Catalog.findAll({
    raw: true,
    where: { userId },
  });

  catalogs.forEach(catalog => {
    catalog._id = catalog.id;
  });
  return catalogs;
};

module.exports.getCatalog = async catalogId =>
  await Catalog.findByPk(catalogId);

module.exports.getConversation = async conversationId =>
  await Conversation.findByPk(conversationId);

module.exports.destroyCatalog = async id =>
  await Catalog.destroy({
    where: { id },
  });

module.exports.getInterlocutor = async interlocutorId =>
  await User.findByPk(interlocutorId, {
    attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
  });
