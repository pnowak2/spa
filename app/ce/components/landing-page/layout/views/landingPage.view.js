define(function(require) {
  var _ = require('underscore'),
    $ = require('jquery'),
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

      this.render();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
      this.listenTo(this.searchableResultsList, 'search:completed', this.didSearchSucceed);
    },

    onSearchRequest: function(criteria) {
      this.searchableResultsList.onSearchRequest(criteria);
    },

    didSearchSucceed: function(data) {

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