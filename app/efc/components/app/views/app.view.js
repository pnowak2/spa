define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SearchComponent = require('app/efc/components/searching/search/main.component'),
    SearchableResultsListComponent = require('app/efc/components/results/list/searchable-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    MapComponent = require('app/efc/components/mapping/map/main.component'),
    tabsDataSource = require('../data/tabs'),
    markersDataSource = require('../data/markers'),
    ProjectMarkerComponent = require('app/efc/components/mapping/markers/project/main.component');

  return Backbone.View.extend({
    initialize: function(attrs) {
      _.bindAll(this, 'onSearchRequest');

      this.search = new SearchComponent;
      this.searchableList = new SearchableResultsListComponent;
      this.tabSwitcher = new TabSwitcherComponent({
        tabDescriptors: tabsDataSource
      });
      this.map = new MapComponent;

      this.listenTo(this.search, 'search:search', this.onSearchRequest);
    },

    onSearchRequest: function(searchCriteria) {
      this.searchableList.onSearchRequest(searchCriteria);
    },

    render: function() {
      // $('.efc-search-container').append(this.search.render().view.el);
      // $('.efc-results-container').append(this.tabSwitcher.render().view.el);
      // $('.efc-results-container').append(this.searchableList.render().view.el);
      $('.efc-results-container').append(this.map.render().view.el);
      this.map.view.initMap();

      var markerComponents = _.map(markersDataSource, function(marker) {
        return new ProjectMarkerComponent({
          markerData: {
            id: marker[2],
            lat: marker[0],
            lng: marker[1],
            title: 'Hanseatic Tradition for VET:Mobility Strategies for Promoting Enterprenership Skills of VET Students',
            activity: 'Strand1: European Remembrance',
            coordinator: 'Netherhall Educational Association',
            summary: 'More and more VET institutions are willing to arrange international placements and apprenticeships for their students. The ET2020 strategic priority No1 "Making lifelong learning and mobility a re...'
          }
        });
      });

      this.map.view.showMarkerComponents(markerComponents);
    }
  });
});