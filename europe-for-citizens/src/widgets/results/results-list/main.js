define(function(require) {
  var Widget = require('app/core/widget'),
    ResultsListView = require('app/widgets/results/results-list/views/resultsListView');

  return Widget.extend({
    initialize: function() {
      this.view = new ResultsListView;
    },

    update: function(data) {
      this.view.update(data);
    }
  });
});