module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Catalogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      catalogName: {
        type: Sequelize.STRING,
        allowNull: false,
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
      chats: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        defaultValue: [],
      },
    });
    await queryInterface.addConstraint('Catalogs', {
      type: 'UNIQUE',
      fields: ['catalogName', 'userId'],
      name: 'uniqueCatalogName',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Catalogs', 'uniqueCatalogName');
    await queryInterface.dropTable('Catalogs');
  },
};
