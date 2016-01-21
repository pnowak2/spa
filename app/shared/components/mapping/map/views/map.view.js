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
        this.clusterGroupLayer = this.createClusterGroupLayer();

        this.buttonsBar.addTo(this.map);
        this.map.addLayer(this.tileLayer);
        this.map.addLayer(this.clusterGroupLayer);
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

    createClusterGroupLayer: function() {
      return new PruneClusterForLeaflet;
    },

    toLeafletMarker: function(markers) {
      return _.map(markers, function(marker) {
        return new PruneCluster.Marker(
          marker.lat,
          marker.lng, {
            id: marker.id,
            popup: marker.popupContent
          }
        )
      });
    },

    toLeafletMarkers: function(markers) {
      return _.map(markers, this.toLeafletMarker, this);
    },

    clearClusterLayers: function() {
      _.each(this.clusterLayers, function(clusterLayer) {
        this.map.removeLayer(clusterLayer);
      }, this);

      this.clusterLayers = [];
    },

    showMarkers: function(markers) {
      this.clearClusterLayers();

      var markersArray = this.toLeafletMarkers(markers);

      _.each(markersArray, function(countryMarkers) {
        var clusterGroupLayer = this.createClusterGroupLayer();
        this.clusterLayers.push(clusterGroupLayer);

        clusterGroupLayer.RegisterMarkers(countryMarkers);
        clusterGroupLayer.ProcessView();
        this.map.addLayer(clusterGroupLayer);
      }, this);
    },

    render: function() {
      return this;
    }
  });
});