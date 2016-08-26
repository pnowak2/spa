define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    SearchableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component'),
    ProjectItemComponent = require('app/shared/components/other/project-item/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent
      });
      this.searchableResultsList = new SearchableResultsListComponent;
      this.render();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
    },

    onSearchRequest: function(criteria) {
      this.searchableResultsList.onSearchRequest(criteria);
    },

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);
      $('.ce-results-container').append(this.searchableResultsList.render().view.el);

      return this;
    }
  });
});