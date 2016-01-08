define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    SearchableResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    SearchableResultsMapComponent = require('app/efc/components/results/map/searchable-results-map/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    MapComponent = require('app/efc/components/mapping/map/main.component'),
    tabsDataSource = require('../data/tabs');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'onSearchRequest');

      this.search = new SearchComponent;
      this.searchableList = new SearchableResultsListComponent;
      this.searchableMap = new SearchableResultsMapComponent;
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: tabsDataSource
      });

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
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
    }
  });
});