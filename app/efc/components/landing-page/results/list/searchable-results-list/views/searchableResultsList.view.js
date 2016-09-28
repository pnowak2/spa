define(function(require) {
  var Backbone = require('backbone'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component'),
    ActionsToolbarComponent = require('app/shared/components/actions-toolbar/main.component'),
    searchService = require('../services/search/search.service'),
    exportService = require('../services/export/export.service');

  return Backbone.View.extend({
    className: 'efc-searchable-results-list',

    initialize: function() {
      this.actionsToolbarComponent = new ActionsToolbarComponent();
      this.searchableListComponent = new SearchableListComponent({
        listComponent: new ResultsListComponent(),
        searchService: searchService
      });

      this.cachedCriteria = {};

      this.listenTo(this.searchableListComponent, 'search:completed', this.didSearchComplete);
      this.listenTo(this.actionsToolbarComponent, 'actionsToolbar:export:click', this.onExportResultsRequest);
    },

    onSearchRequest: function(criteria) {
      this.cachedCriteria = criteria;
      this.searchableListComponent.onSearchRequest(criteria);
    },

    onExportResultsRequest: function () {
      exportService.export(this.cachedCriteria);
    },

    didSearchComplete: function (response) {
      response = response || {};
      response.data = response.data || {};

      this.actionsToolbarComponent.toggle(response.data.total > 0);
    },

    render: function() {
      this.$el.append(this.actionsToolbarComponent.render().view.el);
      this.$el.append(this.searchableListComponent.render().view.el);

      return this;
    }
  });
});