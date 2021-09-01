module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        unique: 'participants',
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          onUpdate: 'cascade',
          onDelete: 'cascade',
        },
        unique: 'participants',
      },
      blackList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        defaultValue: [false, false],
      },
      favoriteList: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.BOOLEAN),
        defaultValue: [false, false],
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Conversations');
  },
};
