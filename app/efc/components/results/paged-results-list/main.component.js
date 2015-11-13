define(function(require) {
  var Component = require('app/core/component'),
    ResultsListComponent = require('app/efc/components/results/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    PagedResultsListView = require('./views/pagedResultsList.view');

  return Component.extend({
    initialize: function(attrs) {
      this.resultsListComponent = new ResultsListComponent(attrs);
      this.pagerComponent = new PagerComponent(attrs);

      this.view = new PagedResultsListView({
        resultsListComponent: this.resultsListComponent,
        pagerComponent: this.pagerComponent
      });
    },

    getPagerState: function() {
      return this.pagerComponent.getState();
    },

    update: function(data) {
      data = data || {};

      this.resultsListComponent.update(data.items);
      this.pagerComponent.update({
        totalItems: data.total
      });
    }
  });
});