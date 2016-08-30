define(function(require) {
  var Component = require('app/core/component'),
    ResultStatsView = require('./views/resultStats.view');

  return Component.extend({
    initialize: function() {
      this.view = new ResultStatsView();
    },

    update: function(data) {
      
    }
  });
});