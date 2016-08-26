define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    PageableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component'),
    ProjectItemComponent = require('app/shared/components/project-item/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent
      });
      this.pageableResultsList = new PageableResultsListComponent;
      this.render();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
    },

    onSearchRequest: function(criteria) {
      this.pageableResultsList.onSearchRequest(criteria);
    },

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);
      $('.ce-results-container').append(this.pageableResultsList.render().view.el);

      return this;
    }
  });
});