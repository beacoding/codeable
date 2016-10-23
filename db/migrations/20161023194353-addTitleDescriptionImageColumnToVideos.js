'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'videos',
      'videoTitle',
      Sequelize.STRING
    )
    queryInterface.addColumn(
      'videos',
      'videoDescription',
      Sequelize.STRING
    )
    queryInterface.addColumn(
      'videos',
      'videoImage',
      Sequelize.STRING
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
