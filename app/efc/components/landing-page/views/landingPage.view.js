define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    SearchableResultsMapComponent = require('app/efc/components/results/map/searchable-results-map/main.component'),
    SearchableResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component');

  return Backbone.View.extend({
    initialize: function() {
      this.search = new SearchComponent;
      this.searchableList = new SearchableResultsListComponent;
      this.searchableMap = new SearchableResultsMapComponent;
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: [{
          title: 'Map',
          identifier: 'map',
          targetSelector: '.' + this.searchableMap.view.className,
          selected: true
        }, {
          title: 'List',
          identifier: 'list',
          targetSelector: '.' + this.searchableList.view.className,
          selected: false
        }]
      });

      this.render();
      this.searchableMap.initMap();
      this.requestInitialSearch();

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
    },

    requestInitialSearch: function() {
      this.onSearchRequest({});
    },

    onSearchRequest: function(searchCriteria) {
      this.searchableList.onSearchRequest(searchCriteria);
      this.searchableMap.onSearchRequest(searchCriteria);
    },

    render: function() {
      $('.efc-search-container').append(this.search.render().view.el);
      $('.efc-results-container').append(this.tabSwitcher.render().view.el);
      $('.efc-results-container').append(this.searchableList.render().view.el);
      $('.efc-results-container').append(this.searchableMap.render().view.el);

      return this;
    }
  });
});