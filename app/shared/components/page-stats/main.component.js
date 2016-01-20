define(function(require) {
  var Component = require('app/core/component'),
    PageStatsView = require('./views/pageStats.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new PageStatsView(options);
    },

    update: function(options) {
      this.view.update(options);
    }
  });
});