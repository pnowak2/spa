define(function(require) {
  var Backbone = require('backbone'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/eplus/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service'),
    exportService = require('../services/export/export.service');

  return Backbone.View.extend({
    id: 'eplus-searchable-results-list',

    className: 'eplus-searchable-results-list',

    initialize: function() {
      this.searchableListComponent = new SearchableListComponent({
        listComponent: new ResultsListComponent(),
        searchService: searchService,
        pagerConfig: {
          pageWindowSize: 3
        },
        pageStatsConfig: {
          visible: false
        }
      });

      this.cachedCriteria = {};

      this.listenTo(this.searchableListComponent, 'search:completed', function(data) {
        this.trigger('search:completed', data);
      });
    },

    onSearchRequest: function(criteria) {
      this.cachedCriteria = criteria;
      this.searchableListComponent.onSearchRequest(criteria);
    },

    onExportToXlsRequest: function() {
      exportService.exportXls(this.cachedCriteria);
    },

    render: function() {
      this.$el.html(
        this.searchableListComponent.render().view.el
      );

      return this;
    }
  });
});