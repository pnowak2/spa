define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    ResultsListComponent = require('app/efc/components/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component'),
    searchService = require('app/efc/services/search/search.service');

  return Backbone.View.extend({
    className: 'efc-paged-results-list',

    initialize: function() {
      // _.bindAll(this, 'didSearchSucceed');
      this.resultsListComponent = new ResultsListComponent;
      this.pagerComponent = new PagerComponent;
      this.cachedCriteria = {};

      this.startListeningPager();
    },

    startListeningPager: function() {
      this.listenTo(this.pagerComponent, 'pager:page:selected', this.onPageRequest);
    },

    stopListeningPager: function() {
      this.stopListening(this.pagerComponent, 'pager:page:selected');
    },

    resetPager: function() {
      this.stopListeningPager();
      this.pagerComponent.update({
        currentPage: 1
      });
      this.startListeningPager();
    },

    prepareSearchCriteria: function(criteria, pagerState) {
      return _.extend({}, criteria, pagerState)
    },

    onSearchRequest: function(searchCriteria) {
      this.resetPager();

      var pagerState = this.pagerComponent.getState(),
        criteria = this.prepareSearchCriteria(
          searchCriteria,
          pagerState
        );

      this.performSearch(criteria);

      this.cachedCriteria = criteria;
    },

    onPageRequest: function(pagerState) {
      var criteria = this.prepareSearchCriteria(
        this.cachedCriteria,
        pagerState
      );

      this.performSearch(criteria);
    },

    performSearch: function(criteria) {
      searchService.search(criteria)
        .then(this.didSearchSucceed)
        .catch(this.didSearchFail);
    },

    didSearchSucceed: function(data) {
      this.resultsListComponent.update(data.items);
      this.pagerComponent.update({
        totalItems: data.total
      });
    },

    didSearchFail: function(error) {

    },

    render: function() {
      this.$el.append(this.resultsListComponent.render().view.el);
      this.$el.append(this.pagerComponent.render().view.el);

      return this;
    }
  })
});