define(function(require) {
  var Backbone = require('backbone'),
    constants = require('app/efc/util/constants'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    MarkerCluster = require('leafletmarkercluster');

  return Backbone.View.extend({
    className: 'efc-map',

    defaults: {
      tileUrl: constants.map.TILEURL,
      initialZoom: 5,
      initialPosition: [-37.82, 175.24],
      minZoom: 1,
      maxZoom: 16
    },

    initMap: function() {
      this.map = Leaflet.map(this.el);

      this.map.setView(
        this.defaults.initialPosition,
        this.defaults.initialZoom
      );

      this.map.addLayer(
        new Leaflet.TileLayer(this.defaults.tileUrl, {
          minZoom: this.defaults.minZoom,
          maxZoom: this.defaults.maxZoom
        })
      );

      this.map.on('dragend', function(e) {
        this.trigger('dragend', {
          bounds: this.map.getBounds(),
          zoom: this.map.getZoom()
        });
      }, this);

      this.map.on('zoomend', function(e) {
        this.trigger('zoomend', {
          bounds: this.map.getBounds(),
          zoom: this.map.getZoom()
        });
      });

      this.markers = Leaflet.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });

      this.map.addLayer(this.markers);
    },

    toLeafletMarker: function(markerComponent) {
      var markerState = markerComponent.getState(),
        marker = Leaflet.marker([
          markerState.lat,
          markerState.lng
        ]),
        markerPopup = markerComponent.render().view.el;

      marker.bindPopup(markerPopup);

      return marker;
    },

    showMarkerComponents: function(markerComponents) {
      this.markers.clearLayers();
      var markersArray = _.map(markerComponents, this.toLeafletMarker);
      this.markers.addLayers(markersArray);
    }
  });
});