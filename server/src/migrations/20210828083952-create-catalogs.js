module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Catalogs',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
            onUpdate: 'cascade',
            onDelete: 'cascade',
          },
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['name', 'userId'],
          },
        ],
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Catalogs');
  },
};
