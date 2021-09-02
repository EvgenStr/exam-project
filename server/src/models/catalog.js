const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate (models) {
      Catalog.belongsTo(models.User, { foreignKey: 'userId', sourceKey: 'id' });
      Catalog.belongsToMany(models.Conversation, {
        through: models.ConversationsToCatalogs,
        foreignKey: 'catalogId',
      });
    }
  }
  Catalog.init(
    {
      catalogName: { type: DataTypes.STRING(32), allowNull: false },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      chats: {
        allowNull: false,
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [false, false],
      },
    },
    {
      sequelize,
      modelName: 'Catalog',
      timestamps: false,
    },
  );
  return Catalog;
};
