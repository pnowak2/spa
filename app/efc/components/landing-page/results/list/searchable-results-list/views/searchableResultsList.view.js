define(function(require) {
  var _ = require('underscore'),
    app = require('app/shared/modules/app.module'),
    Backbone = require('backbone'),
    ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component'),
    PagerComponent = require('app/shared/components/paging/pager/main.component'),
    ExportLinkComponent = require('app/shared/components/export-link/main.component'),
    PageStatsComponent = require('app/shared/components/paging/page-stats/main.component'),
    searchService = require('../services/search/search.service');

  return Backbone.View.extend({
    className: 'efc-searchable-results-list',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.exportLinkComponent = new ExportLinkComponent;
      this.pageStatsComponent = new PageStatsComponent;
      this.resultsListComponent = new ResultsListComponent;
      this.pagerComponent = new PagerComponent;

      this.cachedCriteria = {};
      this.listenTo(this.exportLinkComponent, 'exportLink:click', this.onExportResultsRequest);
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

    onExportResultsRequest: function () {

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
      this.exportLinkComponent.toggle(data.total > 0);
    },

    didSearchFail: function(error) {
      app.showError(error);
      this.exportLinkComponent.hide();
    },

    render: function() {
      this.$el.append(this.exportLinkComponent.render().view.el);
      this.$el.append(this.pageStatsComponent.render().view.el);
      this.$el.append(this.resultsListComponent.render().view.el);
      this.$el.append(this.pagerComponent.render().view.el);

      return this;
    }
  })
});