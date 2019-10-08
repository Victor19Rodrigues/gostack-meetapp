'use strict';

module.exports = {
  up: queryInterface => {
    return queryInterface.renameColumn(
      'subscriptions',
      'meetup_id',
      'meetapp_id'
    );
  },

  down: queryInterface => {
    return queryInterface.renameColumn(
      'subscriptions',
      'meetapp_id',
      'meetup_id'
    );
  },
};
