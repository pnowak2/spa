define(function(require) {
  var Component = require('app/core/component'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
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

      this.listenTo(this.resultsListComponent, 'all', this.trigger);
      this.listenTo(this.pagerComponent, 'all', this.trigger);
    },

    getPagerState: function() {
      return this.pagerComponent.getState();
    },

    update: function(resultsListData, pagerData) {
      this.stopListening(this.pagerComponent, 'all');
      this.view.update(resultsListData, pagerData);
      this.listenTo(this.pagerComponent, 'all', this.trigger);
    }
  });
});