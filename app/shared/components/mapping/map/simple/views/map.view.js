define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    constants = require('app/shared/util/constants'),
    Mustache = require('mustache'),
    Leaflet = require('leaflet'),
    LeafletPruneCluster = require('leafletprunecluster'),
    Fullscreen = require('leafletfullscreen'),
    EasyButton = require('leafleteasybutton'),
    tpl = require('text!../templates/map.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-map',

    defaults: {
      tileUrl: constants.urls.MAP_TILEURL,
      initialZoom: 4,
      initialPosition: [53, 17],
      minZoom: 3,
      maxZoom: 7,
      zoomClusterSizeTrigger: 5,
      countryClusterSize: 900,
      localClusterSize: 120
    },

    initialize: function(options) {
      this.options = _.extend({}, this.defaults, options);
      this.clusterLayers = [];

      _.bindAll(this, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didZoomMap');
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
      var map = Leaflet.map(this.getMapContainerElement(), {
        attributionControl: false,
        worldCopyJump: true
      });

      map.setView(
        this.options.initialPosition,
        this.options.initialZoom
      );

      map.on('zoomend', this.didZoomMap);

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
      map.setView(this.options.initialPosition, this.options.initialZoom);
    },

    didClickFullscreenButton: function(btn, map) {
      map.toggleFullscreen();
    },

    didClickPrintButton: function(btn, map) {
      window.print();
    },

    didZoomMap: function() {
      _.each(this.clusterLayers, function(countryClusterLayer) {
        var clusterSize = this.calculateClusterSize(this.map.getZoom());

        countryClusterLayer.Cluster.Size = clusterSize;
        countryClusterLayer.ProcessView();
      }, this);
    },

    calculateClusterSize: function(zoomLevel) {
      var zoomClusterSizeTrigger = this.options.zoomClusterSizeTrigger,
        countryClusterSize = this.options.countryClusterSize,
        localClusterSize = this.options.localClusterSize,
        clusterSize = (zoomLevel < zoomClusterSizeTrigger ? countryClusterSize : localClusterSize);

      return clusterSize;
    },

    createTileLayer: function() {
      return Leaflet.tileLayer(this.options.tileUrl, {
        minZoom: this.options.minZoom,
        maxZoom: this.options.maxZoom
      });
    },

    showMarkers: function(data) {
      data = data || {};

      var leafletMarkers = this.toLeafletMarkers(data.markers);

      this.clearClusterLayers();
      this.createClusterLayersWithMarkers(leafletMarkers);
      this.updateItemsCount(data.total);
    },

    updateItemsCount: function(total) {
      total = total || 0;
      this.getItemsCountElement().html(total);
      this.getItemsCountContainer().show();
    },

    toLeafletMarkers: function(markersData) {
      return _.map(markersData, function(markersByCountry) {
        return _.map(markersByCountry, function(marker) {
          var icon = this.createMarkerIcon(marker.markerName);
          return new PruneCluster.Marker(
            marker.lat,
            marker.lng, {
              id: marker.id,
              popup: marker.popupContent,
              icon: icon,
              popupOptions: {
                autoPanPadding: [48, 42],
              }
            }
          );
        }, this);
      }, this);
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
      var clusterSize = this.calculateClusterSize(this.map.getZoom());
      return new PruneClusterForLeaflet(clusterSize);
    },

    createMarkerIcon: function(markerName) {
      var path = Leaflet.Icon.Default.imagePath,
        defaultIcon = new Leaflet.Icon.Default();

      if (markerName === 'blue') {
        return Leaflet.icon({
          iconUrl: path + '/marker-' + markerName + '.png',
          shadowUrl: path + '/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      } else if (markerName === 'blue-medium') {
        return Leaflet.icon({
          iconUrl: path + '/marker-' + markerName + '.png',
          shadowUrl: path + '/marker-shadow.png',
          iconSize: [29, 48],
          iconAnchor: [17, 48],
          shadowAnchor: [16, 41],
          popupAnchor: [-2, -41],
          shadowSize: [41, 41]
        });
      } else {
        return defaultIcon;
      }
    },

    getMapContainerElement: function() {
      return this.$el.find('.vlr-map__map-container').get(0);
    },

    getItemsCountContainer: function() {
      return this.$el.find('.vlr-map__items-count-container');
    },

    getItemsCountElement: function() {
      return this.$el.find('.vlr-map__items-count');
    },

    invalidateSize: function () {
      this.map.invalidateSize();
    },

    render: function() {
      var html = Mustache.render(tpl);
      this.$el.append(html);

      return this;
    }
  });
});