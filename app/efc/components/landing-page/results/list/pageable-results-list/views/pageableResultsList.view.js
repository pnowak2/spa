define(function(require) {
  var _ = require('underscore'),
    app = require('app/shared/modules/app.module'),
    Backbone = require('backbone'),
    ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/paging/pager/main.component'),
    PageStatsComponent = require('app/shared/components/paging/page-stats/main.component'),
    searchService = require('../services/search/search.service');

  return Backbone.View.extend({
    className: 'efc-pageable-results-list',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.pageStatsComponent = new PageStatsComponent;
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

      var criteria = this.prepareSearchCriteria(
        searchCriteria,
        this.pagerComponent.getState()
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
      data = data || {};

      this.resultsListComponent.update(data.items);
      this.pagerComponent.update({
        totalItems: data.total
      });
      this.pageStatsComponent.update(this.pagerComponent.getState());
    },

    didSearchFail: function(error) {
      app.showError(error);
    },

    render: function() {
      this.$el.append(this.pageStatsComponent.render().view.el);
      this.$el.append(this.resultsListComponent.render().view.el);
      this.$el.append(this.pagerComponent.render().view.el);

      return this;
    }
  })
});