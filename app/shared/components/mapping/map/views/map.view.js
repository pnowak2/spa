define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    constants = require('app/shared/util/constants'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    LeafletPruneCluster = require('leafletprunecluster'),
    Fullscreen = require('leafletfullscreen'),
    EasyButton = require('leafleteasybutton');

  return Backbone.View.extend({
    className: 'efc-map',

    defaults: {
      tileUrl: constants.urls.MAP_TILEURL,
      initialZoom: 4,
      initialPosition: [51, 17],
      minZoom: 4,
      maxZoom: 7
    },

    initialize: function() {
      this.clusterLayers = [];

      _.bindAll(this, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton');
    },

    initMap: function() {
      if (!this.map) {
        this.map = this.createMap();
        this.buttonsBar = this.createButtonsBar();
        this.tileLayer = this.createTileLayer();

        this.map.addLayer(this.tileLayer);
        this.buttonsBar.addTo(this.map);
      }
    },

    createMap: function() {
      var map = Leaflet.map(this.el, {
        attributionControl: false
      });

      map.setView(
        this.defaults.initialPosition,
        this.defaults.initialZoom
      );

      return map;
    },

    createButtonsBar: function() {
      var homeBtn = this.createHomeButton(),
        fullScreenBtn = this.createFullscreenButton(),
        printBtn = this.createPrintButton();

      return Leaflet.easyBar([homeBtn, fullScreenBtn, printBtn], {
        position: 'topleft'
      });
    },

    createHomeButton: function() {
      return Leaflet.easyButton('fa-home', this.didClickHomeButton);
    },

    createFullscreenButton: function() {
      return Leaflet.easyButton('fa-arrows-alt', this.didClickFullscreenButton);
    },

    createPrintButton: function() {
      return Leaflet.easyButton('fa-print', this.didClickPrintButton);
    },

    didClickHomeButton: function(btn, map) {
      map.setView(this.defaults.initialPosition, this.defaults.initialZoom);
    },

    didClickFullscreenButton: function(btn, map) {
      map.toggleFullscreen();
    },

    didClickPrintButton: function(btn, map) {
      window.print();
    },

    createTileLayer: function() {
      return Leaflet.tileLayer(this.defaults.tileUrl, {
        minZoom: this.defaults.minZoom,
        maxZoom: this.defaults.maxZoom
      });
    },

    showMarkers: function(markersData) {
      var leafletMarkers = this.toLeafletMarkers(markersData);

      this.clearClusterLayers();
      this.createClusterLayersWithMarkers(leafletMarkers);
    },

    toLeafletMarkers: function(markersData) {
      return _.map(markersData, function(markersByCountry) {
        return _.map(markersByCountry, function(marker) {
          return new PruneCluster.Marker(
            marker.lat,
            marker.lng, {
              id: marker.id,
              popup: marker.popupContent
            }
          );
        });
      });
    },

    clearClusterLayers: function() {
      _.each(this.clusterLayers, function(clusterLayer) {
        this.map.removeLayer(clusterLayer);
      }, this);

      this.clusterLayers = [];
    },

    createClusterLayersWithMarkers: function(leafletMarkers) {
      _.each(leafletMarkers, function(countryLeafletMarkers) {
        var countryClusterLayer = this.createClusterGroupLayer();

        countryClusterLayer.RegisterMarkers(countryLeafletMarkers);
        this.map.addLayer(countryClusterLayer);
        this.clusterLayers.push(countryClusterLayer);
      }, this);
    },

    createClusterGroupLayer: function() {
      return new PruneClusterForLeaflet;
    }
  });
});