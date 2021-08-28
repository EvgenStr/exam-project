module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'ConversationsToCatalogs',
      {
        conversationId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Conversations',
            key: 'id',
          },
        },
        catalogId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Catalogs',
            key: 'id',
          },
        },
      },
      {
        indexes: [
          {
            unique: true,
            fields: ['conversationId', 'catalogId'],
          },
        ],
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ConversationsToCatalogs');
  },
};
