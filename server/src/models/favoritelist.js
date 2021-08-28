const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteList extends Model {
    static associate (models) {
      FavoriteList.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId',
        sourceKey: 'id',
      });
      FavoriteList.belongsTo(models.User, {
        as: 'favoriteUser',
        foreignKey: 'favoriteUserId',
        sourceKey: 'id',
      });
    }
  }
  FavoriteList.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      favoriteUserId: {
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
      modelName: 'FavoriteList',
    },
  );
  return FavoriteList;
};
