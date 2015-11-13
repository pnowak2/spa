define(function(require) {
  var Component = require('app/core/component'),
    PagedResultsListView = require('./views/pagedResultsList.view');

  return Component.extend({
    initialize: function() {
      this.view = new PagedResultsListView;
    },

    getPagerState: function() {
      return this.view.pagerComponent.getState();
    },

    update: function(data) {
      data = data || {};

      this.view.resultsListComponent.update(data.items);
      this.view.pagerComponent.update({
        totalItems: data.total
      });
    }
  });
});