'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'videos', 
      'videoClicks', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'videos', 
      'videoClicks', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    );
  }
};
