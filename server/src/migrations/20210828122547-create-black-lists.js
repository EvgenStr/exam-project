module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'BlackLists',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            onDelete: 'cascade',
          },
        },
        blockedUserId: {
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
            fields: ['blockedUserId', 'userId'],
          },
        ],
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('BlackLists');
  },
};
