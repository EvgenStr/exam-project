const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate (models) {
      Conversation.belongsTo(models.User, {
        as: 'customer',
        foreignKey: 'customerId',
        sourceKey: 'id',
      });
      Conversation.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'creatorId',
        sourceKey: 'id',
      });
      Conversation.hasMany(models.Message, {
        foreignKey: 'conversationId',
        sourceKey: 'id',
      });
      Conversation.belongsToMany(models.Conversation, {
        through: models.ConversationsToCatalogs,
        foreignKey: 'conversationId',
      });
    }
  }
  Conversation.init(
    {
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      creatorId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        validate: {
          validator (value) {
            if (value === this.customerId) {
              throw new Error('Users should not be the same.');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Conversations',
    },
  );
  return Conversation;
};
