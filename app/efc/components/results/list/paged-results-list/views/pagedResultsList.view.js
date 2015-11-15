define(function(require) {
  var Backbone = require('backbone'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    searchService = require('app/efc/services/search/search.service');

  return Backbone.View.extend({
    className: 'efc-paged-results-list',

    initialize: function() {
      this.resultsListComponent = new ResultsListComponent;
      this.pagerComponent = new PagerComponent;
    },

    onSearchRequest: function(searchCriteria) {
      this.pagerComponent.update({
        currentPage: 1
      });

      var criteria = _.extend({}, searchCriteria, this.pagerComponent.getState());
      searchService.search(criteria)
        .then(this.didSearchSucceed)
        .catch(this.didSearchFail);
    },

    didSearchSucceed: function(data) {

    },

    didSearchFail: function() {

    },

    render: function() {
      this.$el.append(this.resultsListComponent.render().view.el);
      this.$el.append(this.pagerComponent.render().view.el);

      return this;
    }
  })
});