define(function(require) {
  var Backbone = require('backbone'),
    SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component'),
    ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service');

  return Backbone.View.extend({
    className: 'efc-searchable-results-list',

    initialize: function() {
      this.searchableListComponent = new SearchableListComponent({
        listComponent: new ResultsListComponent,
        searchService: searchService
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
  })
});