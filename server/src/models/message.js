const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate (models) {
      Message.belongsTo(models.User, { foreignKey: 'sender' });
      Message.belongsTo(models.Conversation, {
        foreignKey: 'conversationId',
      });
    }
  }
  Message.init(
    {
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      body: {
        type: DataTypes.STRING(256),
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Conversations',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Message',
    },
  );
  return Message;
};
