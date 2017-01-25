'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'videos',
      'videoViews',
      Sequelize.STRING
    )
    queryInterface.addColumn(
      'videos',
      'videoLikes',
      Sequelize.STRING
    )
    queryInterface.addColumn(
      'videos',
      'videoDislikes',
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
