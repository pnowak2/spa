define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    constants = require('app/efc/util/constants'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    LeafletPruneCluster = require('leafletprunecluster'),
    Fullscreen = require('leafletfullscreen');

  return Backbone.View.extend({
    className: 'efc-map',

    defaults: {
      tileUrl: constants.urls.TILEURL,
      initialZoom: 4,
      initialPosition: [48, 9],
      minZoom: 1,
      maxZoom: 16
    },

    initMap: function() {
      if (!this.map) {
        this.map = this.createMap();

        this.tileLayer = this.createTileLayer();
        this.clusterGroupLayer = this.createClusterGroupLayer();

        this.map.addLayer(this.tileLayer);
        this.map.addLayer(this.clusterGroupLayer);
      }
    },

    createMap: function() {
      var map = Leaflet.map(this.el, {
        fullscreenControl: true
      });
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
      return new PruneClusterForLeaflet;
    },

    toLeafletMarker: function(marker) {
      var leafletMarker = new PruneCluster.Marker(
        marker.lat,
        marker.lng
      );

      leafletMarker.data.popup = marker.popupContent;

      return leafletMarker;
    },

    toLeafletMarkers: function(markers) {
      return _.map(markers, this.toLeafletMarker, this);
    },

    showMarkers: function(markers) {
      this.clusterGroupLayer.RemoveMarkers();
      var markersArray = this.toLeafletMarkers(markers);
      this.clusterGroupLayer.RegisterMarkers(markersArray);
      this.clusterGroupLayer.ProcessView();
    },

    render: function() {
      return this;
    }
  });
});