define(function(require) {
  var Backbone = require('backbone'),
    PageableListComponent = require('app/shared/components/lists/pageable-list/main.component'),
    ResultsListComponent = require('app/ce/components/landing-page/results/list/results-list/main.component'),
    searchService = require('../services/search/search.service');

  return Backbone.View.extend({
    className: 'ce-pageable-results-list',

    initialize: function() {
      this.pageableListComponent = new PageableListComponent({
        listComponent: new ResultsListComponent,
        searchService: searchService
      });
    },

    onSearchRequest: function(criteria) {
      this.pageableListComponent.onSearchRequest(criteria);
    },

    render: function() {
      this.$el.html(
        this.pageableListComponent.render().view.el
      );

      return this;
    }
  })
});