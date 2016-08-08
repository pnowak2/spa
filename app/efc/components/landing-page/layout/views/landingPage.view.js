define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/shared/components/searching/search/main.component'),
    AdvancedSearchComponent = require('app/efc/components/landing-page/searching/advanced-search/main.component'),
    PageableResultsListComponent = require('app/efc/components/landing-page/results/list/pageable-results-list/main.component'),
    ResultsMapComponent = require('app/efc/components/landing-page/results/map/results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent({
        advancedSearchComponent: new AdvancedSearchComponent
      });
      this.pageableResultsList = new PageableResultsListComponent;
      this.resultsMap = new ResultsMapComponent;
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'Map',
          identifier: 'map',
          targetSelector: '.' + this.resultsMap.view.className,
          selected: true
        }, {
          title: 'List',
          identifier: 'list',
          targetSelector: '.' + this.pageableResultsList.view.className,
          selected: false
        }]
      });

      this.render();
      this.resultsMap.initMap();
      this.requestInitialSearch();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
    },

    requestInitialSearch: function() {
      this.onSearchRequest({});
    },

    onSearchRequest: function(searchCriteria) {
      this.pageableResultsList.onSearchRequest(searchCriteria);
      this.resultsMap.onSearchRequest(searchCriteria);
    },

    render: function() {
      $('.efc-search-container').append(this.search.render().view.el);
      $('.efc-results-container').append(this.tabSwitcher.render().view.el);
      $('.efc-results-container').append(this.pageableResultsList.render().view.el);
      $('.efc-results-container').append(this.resultsMap.render().view.el);

      return this;
    }
  });
});