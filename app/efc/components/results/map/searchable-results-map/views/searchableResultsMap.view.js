define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    MapComponent = require('app/efc/components/mapping/map/main.component'),
    ProjectMarkerComponent = require('app/efc/components/mapping/markers/project/main.component'),
    markersDataSource = require('../services/search/data/markers');

  return Backbone.View.extend({
    className: 'efc-searchable-results-map',

    initialize: function() {
      this.mapComponent = new MapComponent;
    },

    onSearchRequest: function(searchCriteria) {
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

      this.mapComponent.showMarkerComponents(markerComponents);
    },

    performSearch: function(criteria) {

    },

    didSearchSucceed: function(data) {

    },

    didSearchFail: function(error) {

    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});