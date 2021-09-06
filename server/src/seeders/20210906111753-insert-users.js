const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../constants');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'John Doe',
          lastName: 'Moderator',
          displayName: 'Moderator',
          password: await bcrypt.hash('moderator@moderator.com', SALT_ROUNDS),
          email: 'moderator@moderator.com',
          role: 'moderator',
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      email: 'moderator@moderator.com',
    });
  },
};
