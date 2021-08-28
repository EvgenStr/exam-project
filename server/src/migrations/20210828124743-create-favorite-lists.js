module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'FavoriteLists',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
            onDelete: 'cascade',
          },
        },
        favoriteUserId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id',
            onDelete: 'cascade',
          },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['favoriteUserId', 'userId'],
          },
        ],
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FavoriteLists');
  },
};
