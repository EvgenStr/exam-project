const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResetToken extends Model {
    static associate ({ User }) {
      ResetToken.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  ResetToken.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        validate: {
          notNull: true,
        },
      },
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'ResetToken',
    },
  );
  return ResetToken;
};
