define(function(require) {
  var Backbone = require('backbone'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/ce/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service');

  return Backbone.View.extend({
    id: 'ce-searchable-results-list',

    className: 'ce-searchable-results-list',

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

      this.listenTo(this.searchableListComponent, 'search:completed', function(data) {
        this.trigger('search:completed', data);
      });
    },

    onSearchRequest: function(criteria) {
      this.searchableListComponent.onSearchRequest(criteria);
    },

    render: function() {
      this.$el.html(
        this.searchableListComponent.render().view.el
      );

      return this;
    }
  });
});