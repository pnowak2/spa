define(function(require) {
  var Component = require('app/core/component'),
    ResultStatsView = require('./views/resultStats.view');

  return Component.extend({
    initialize: function() {
      this.view = new ResultStatsView();
      this.listenTo(this.view, 'export:xls', function () {
        this.trigger('export:xls');
      });
    },

    update: function(data) {
      this.view.update(data);
    }
  });
});