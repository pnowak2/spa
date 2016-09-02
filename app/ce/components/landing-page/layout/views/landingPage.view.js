define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    ResultStatsComponent = require('app/ce/components/landing-page/results/result-stats/main.component'),
    SearchableResultsListComponent = require('app/ce/components/landing-page/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/other/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent()
      });
      this.resultStats = new ResultStatsComponent();
      this.searchableResultsList = new SearchableResultsListComponent();
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'List view',
          identifier: 'list',
          targetSelector: '.' + this.searchableResultsList.view.className,
          selected: true
        }, {
          title: 'Map',
          identifier: 'map',
          targetSelector: '<todo>',
          selected: false
        }]
      });

      this.handleInitialResultsDisplay();
      this.render();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
      this.listenTo(this.searchableResultsList, 'search:completed', this.didListSearchSucceed);
      this.listenTo(this.resultStats, 'export:xls', this.onExportToXlsRequest);
    },

    onSearchRequest: function(criteria) {
      this.searchableResultsList.onSearchRequest(criteria);
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
        keyword: response.searchCriteria.keyword,
        isAdvancedSearchDirty: response.searchCriteria.isAdvancedSearchDirty
      });

      this.handleUpdatedResultsDisplay(response.data.total);
    },

    handleInitialResultsDisplay: function () {
      this.resultStats.hide();
      this.tabSwitcher.hide();
      this.searchableResultsList.hide();
    },

    handleUpdatedResultsDisplay: function(total) {
      if(total > 0) {
        this.resultStats.show();
        this.tabSwitcher.show();
        this.searchableResultsList.show();
      } else {
        this.tabSwitcher.hide();
        this.searchableResultsList.hide();
      }
    },

    render: function() {
      $('.ce-search-container').append(this.search.render().view.el);
      $('.ce-result-stats-container').append(this.resultStats.render().view.el);
      $('.ce-tabs-container').append(this.tabSwitcher.render().view.el);
      $('.ce-results-container').append(this.searchableResultsList.render().view.el);

      return this;
    }
  });
});