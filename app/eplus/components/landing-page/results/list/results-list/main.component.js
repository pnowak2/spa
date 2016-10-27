define(function(require) {
  var Component = require('app/core/component'),
    ResultsListView = require('./views/resultsList.view');

  return Component.extend({
    initialize: function() {
      this.view = new ResultsListView();
    },
    update: function(items) {
      this.view.update(items);
    }
  });

});