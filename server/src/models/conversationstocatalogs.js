const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationsToCatalogs extends Model {
    static associate () {}
  }
  ConversationsToCatalogs.init(
    {
      conversationId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Conversations',
          key: 'id',
        },
      },
      catalogId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Catalogs',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'ConversationsToCatalogs',
      timestamps: false,
    },
  );
  return ConversationsToCatalogs;
};
