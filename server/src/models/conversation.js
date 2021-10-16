const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate (models) {
      Conversation.belongsTo(models.User, {
        as: 'customer',
        foreignKey: 'customerId',
      });
      Conversation.belongsTo(models.User, {
        as: 'creator',
        foreignKey: 'creatorId',
      });
      Conversation.hasMany(models.Message, {
        sourceKey: 'id',
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
      },
      blackList: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [false, false],
      },
      favoriteList: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.BOOLEAN),
        defaultValue: [false, false],
      },
    },
    {
      sequelize,
      modelName: 'Conversation',
      validate: {
        UsersNotEqual () {
          if (this.creatorId === this.customerId) {
            throw new Error('Users should not be the same.');
          }
        },
      },
    },
  );
  return Conversation;
};
