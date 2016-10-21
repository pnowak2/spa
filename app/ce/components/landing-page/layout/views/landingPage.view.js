define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    ResultStatsComponent = require('app/ce/components/landing-page/results/result-stats/main.component'),
    SearchableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component'),
    ResultsMapComponent = require('app/ce/components/landing-page/results/map/results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component'),
    router = require('app/shared/routers/search.router');

  return Backbone.View.extend({   
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent()
      });
      this.resultStats = new ResultStatsComponent();
      this.searchableResultsList = new SearchableResultsListComponent();
      this.resultsMap = new ResultsMapComponent();
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List view',
          identifier: 'list',
          targetSelector: '.' + this.searchableResultsList.view.className,
          selected: true
        }, {
          title: 'Map',
          identifier: 'map',
          targetSelector: '.' + this.resultsMap.view.className,
          selected: false
        }]
      });

      this.handleInitialResultsDisplay();
      this.render();
      this.resultsMap.initMap();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
      this.listenTo(this.searchableResultsList, 'search:completed', this.didListSearchSucceed);
      this.listenTo(this.resultStats, 'export:xls', this.onExportToXlsRequest);
      this.listenTo(this.tabSwitcher, 'tab-switcher:tab:selected', this.didSelectTab);
      this.listenTo(router, 'router:search', this.didRoute);
    },

    // Hack to force map to redraw
    didSelectTab: function(identifier) {
      this.resultsMap.invalidateSize();
    },

    onSearchRequest: function(criteria) {
      router.updateUrl(criteria);
      this.searchableResultsList.onSearchRequest(criteria);
      this.resultsMap.onSearchRequest(criteria);
    },

    onExportToXlsRequest: function () {
      this.searchableResultsList.onExportToXlsRequest();
    },

    didListSearchSucceed: function(response) {
      response = response || {};
      response.data = response.data || {};
      response.searchCriteria = response.searchCriteria || {};

      this.resultStats.update({
        itemsCount: response.data.total,
        criteria: response.searchCriteria
      });

      this.handleUpdatedResultsDisplay(response.data.total);
    },

    didRoute: function(criteria) {
      this.search.update(criteria);
      this.search.requestSearch();
    },

    handleInitialResultsDisplay: function () {
      this.getResultStatsContainer().hide();
      this.getTabbedResultsContainer().hide();
    },

    handleUpdatedResultsDisplay: function(total) {
      this.getResultStatsContainer().show();
      this.getTabbedResultsContainer().toggle(total > 0);
    },

    getSearchContainer: function() {
      return Backbone.$('.ce-search-container');
    },

    getResultStatsContainer: function() {
      return Backbone.$('.ce-result-stats-container');
    },

    getTabbedResultsContainer: function() {
      return Backbone.$('.ce-tabbed-results-container');
    },

    render: function() {
      this.getSearchContainer().append(this.search.render().view.el);
      this.getResultStatsContainer().append(this.resultStats.render().view.el);
      this.getTabbedResultsContainer().append(this.tabSwitcher.render().view.el);
      this.getTabbedResultsContainer().append(this.searchableResultsList.render().view.el);
      this.getTabbedResultsContainer().append(this.resultsMap.render().hide().view.el);

      return this;
    }
  });
});