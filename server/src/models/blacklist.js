const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlackList extends Model {
    static associate (models) {
      BlackList.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      BlackList.belongsTo(models.User, {
        as: 'blockedUser',
        foreignKey: 'blockedUserId',
        sourceKey: 'id',
      });
    }
  }
  BlackList.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      blockedUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'BlackList',
    },
  );
  return BlackList;
};
