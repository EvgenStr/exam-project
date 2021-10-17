module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Messages', 'userId', 'sender');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('Messages', 'sender', 'userId');
  },
};
