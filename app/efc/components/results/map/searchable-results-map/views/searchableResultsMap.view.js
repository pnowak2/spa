define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    MapComponent = require('app/efc/components/mapping/map/main.component'),
    ProjectPopupComponent = require('app/efc/components/mapping/popups/project/main.component'),
    markersDataSource = require('../services/search/data/markers');

  return Backbone.View.extend({
    className: 'efc-searchable-results-map',

    initialize: function() {
      this.mapComponent = new MapComponent;
    },

    onSearchRequest: function(searchCriteria) {
      this.didSearchSucceed(markersDataSource);
    },

    performSearch: function(criteria) {

    },

    didSearchSucceed: function(data) {
      var markers = _.map(data, function(marker) {
        var popupComponent = new ProjectPopupComponent({
          popupData: {
            id: marker[2],
            title: marker[3],
            activity: marker[4],
            coordinator: marker[5],
            summary: marker[6]
          }
        });

        return {
          lat: marker[0],
          lng: marker[1],
          popupContent: popupComponent.render().view.el
        }
      });

      this.mapComponent.showMarkers(markers);
    },

    didSearchFail: function(error) {

    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});