define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    constants = require('app/efc/util/constants'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    MarkerCluster = require('leafletmarkercluster');

  return Backbone.View.extend({
    className: 'efc-map',

    defaults: {
      tileUrl: constants.map.TILEURL,
      initialZoom: 13,
      initialPosition: [-37.82, 175.24],
      minZoom: 1,
      maxZoom: 16
    },

    initMap: function() {
      this.map = this.createMap();
      this.tileLayer = this.createTileLayer();
      this.clusterGroupLayer = this.createClusterGroupLayer();

      this.map.addLayer(this.tileLayer);
      this.map.addLayer(this.clusterGroupLayer);
    },

    createMap: function() {
      var map = Leaflet.map(this.el);
      map.setView(
        this.defaults.initialPosition,
        this.defaults.initialZoom
      );

      return map;
    },

    createTileLayer: function() {
      return Leaflet.tileLayer(this.defaults.tileUrl, {
        minZoom: this.defaults.minZoom,
        maxZoom: this.defaults.maxZoom
      });
    },

    createClusterGroupLayer: function() {
      return Leaflet.markerClusterGroup({
        chunkedLoading: true,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true
      });
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

    toLeafletMarkers: function(markerComponents) {
      return _.map(markerComponents, this.toLeafletMarker, this);
    },

    showMarkerComponents: function(markerComponents) {
      this.clusterGroupLayer.clearLayers();
      var markersArray = this.toLeafletMarkers(markerComponents);
      this.clusterGroupLayer.addLayers(markersArray);
    }
  });
});