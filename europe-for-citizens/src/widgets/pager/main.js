define(function(require) {
  var Widget = require('app/core/widget');

  return Widget.extend({

    initialize: function() {

    },

    getState: function() {
      return {
        total: 0,
        pages: 0,
        pageSize: 10,
        currentPage: 1
      }
    },

    refresh: function() {}
  });
});