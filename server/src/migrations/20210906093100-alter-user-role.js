const replaceEnum = require('sequelize-replace-enum-postgres').default;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await replaceEnum({
      queryInterface,
      tableName: 'Users',
      columnName: 'role',
      newValues: ['customer', 'creator', 'moderator'],
      enumName: 'enum_Users_role',
    });
    // return queryInterface.sequelize.query(
    //   `ALTER TYPE "enum_Users_role" ADD VALUE 'moderator'`,
    // );
  },

  down: async (queryInterface, Sequelize) => {
    await replaceEnum({
      queryInterface,
      tableName: 'Users',
      columnName: 'role',
      newValues: ['customer', 'creator'],
      enumName: 'enum_Users_role',
    });
  },
};
