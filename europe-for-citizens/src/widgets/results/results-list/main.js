define(function(require) {
  var Component = require('app/core/component'),
    ResultsListView = require('app/widgets/results/results-list/views/resultsList.view');

  return Component.extend({
    initialize: function() {
      this.view = new ResultsListView;
    },

    update: function(data) {
      this.view.update(data);
    }
  });
});