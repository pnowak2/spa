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
      tileUrls: [constants.urls.MAP_TILEURL],
      initialZoom: 4,
      initialPosition: [53, 17],
      minZoom: 3,
      maxZoom: 7,
      clusterSizeOnMaxZoomLevel: 120,
      boundaryFactor: .33
    },

    initialize: function(options) {
      _.bindAll(this, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didClickClusterMarker', 'didZoomMap', 'didDragMap', 'didResizeMap');

      this.options = _.extend({}, this.defaults, options);
    },

    initMap: function() {
      if (!this.map) {
        this.map = this.createMap();
        this.tileLayers = this.createTileLayers();
        this.markersLayerGroup = Leaflet.layerGroup();
        this.buttonsBar = this.createButtonsBar();
        this.buttonsBar.addTo(this.map);

        _.each(this.tileLayers, function(tileLayer) {
          this.map.addLayer(tileLayer);
        }, this);

        this.map.addLayer(this.markersLayerGroup);
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

      map.on('zoomend', _.debounce(this.didZoomMap, 400));
      map.on('dragend', _.debounce(this.didDragMap, 400));
      map.on('resize', _.debounce(this.didResizeMap, 400));

      return map;
    },

    createTileLayers: function() {
      return _.map(this.options.tileUrls, function(tileUrl) {
        return Leaflet.tileLayer(tileUrl, {
          minZoom: this.options.minZoom,
          maxZoom: this.options.maxZoom
        });
      }, this);
    },

    showMarkers: function(data) {
      data = data || {};

      var markerGroups = this.toLeafletMarkers(data.items),
        clusters = this.toClusterMarkers(data.items);

      this.clearAllMarkers();

      this.registerPointMarkers(markerGroups);
      this.registerClusterMarkers(clusters);

      this.updateItemsCount(data.total);
    },

    registerPointMarkers: function(markerGroups) {

    },

    registerClusterMarkers: function(markers) {

    },

    clearAllMarkers: function() {
      this.markersLayerGroup.clearLayers();
    },

    toLeafletMarkers: function(items) {
      return _.chain(items)
        .where({
          type: 'marker'
        })
        .groupBy('group')
        .values()
        .map(function(items) {
          return _.map(items, function(item) {
            return new PruneCluster.Marker(
              item.lat,
              item.lng, {
                id: item.id,
                icon: this.createMarkerIcon(item.icon),
                popup: item.popupContent,
                popupOptions: {
                  autoPanPadding: [48, 42],
                }
              }
            );
          }, this)
        }, this)
        .value()
    },

    toClusterMarkers: function(items) {
      return _.chain(items)
        .where({
          type: 'cluster'
        })
        .map(function(item) {
          var clusterMarker = Leaflet.marker([item.lat, item.lng], {
            icon: this.createMarkerIcon('cluster', {
              population: item.itemsCount
            })
          });

          clusterMarker.on('click', this.didClickClusterMarker);

          return clusterMarker;
        }, this)
        .value();
    },

    createMarkerIcon: function(icon, data) {
      data = data || {};

      var path = Leaflet.Icon.Default.imagePath;

      switch (icon) {
        case 'marker-blue':
          return Leaflet.icon({
            iconUrl: path + '/marker-' + icon + '.png',
            shadowUrl: path + '/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });
          break;
        case 'cluster':
          return new Leaflet.DivIcon({
            html: '<div><span>' + data.population + '</span></div>',
            className: 'prunecluster prunecluster-medium',
            iconSize: Leaflet.point(38, 38)
          });
          break;
        default:
          return new Leaflet.Icon.Default()
      }

      return defaultIcon;
    },

    calculateClusterSize: function() {
      if (this.isMaxZoom()) {
        return this.options.clusterSizeOnMaxZoomLevel;
      } else {
        return 1;
      }
    },

    createClusterGroupLayer: function() {
      return new PruneClusterForLeaflet(this.calculateClusterSize());
    },

    isMinZoom: function() {
      return this.map.getZoom() <= this.map.getMinZoom();
    },

    isMaxZoom: function() {
      return this.map.getZoom() >= this.map.getMaxZoom();
    },

    getState: function() {
      var bounds = this.calculateBounds() || {
        northEast: {},
        northWest: {},
        southEast: {},
        southWest: {}
      };

      return {
        currentZoom: this.map.getZoom(),
        initialZoom: this.options.initialZoom,
        minZoom: this.map.getMinZoom(),
        maxZoom: this.map.getMaxZoom(),
        isMinZoom: this.isMinZoom(),
        isMaxZoom: this.isMaxZoom(),
        bounds: {
          northEast: {
            lat: bounds.northEast.lat,
            lng: bounds.northEast.lng
          },
          northWest: {
            lat: bounds.northWest.lat,
            lng: bounds.northWest.lng
          },
          southEast: {
            lat: bounds.southEast.lat,
            lng: bounds.southEast.lng
          },
          southWest: {
            lat: bounds.southWest.lat,
            lng: bounds.southWest.lng
          }
        }
      }
    },

    calculateBounds: function() {
      var originalBounds = this.map.getBounds(),
        bounds = {
          northEast: originalBounds.getNorthEast(),
          northWest: originalBounds.getNorthWest(),
          southEast: originalBounds.getSouthEast(),
          southWest: originalBounds.getSouthWest()
        },
        boundsWith = parseFloat(bounds.northEast.lng) - parseFloat(bounds.northWest.lng),
        boundsHeight = parseFloat(bounds.northEast.lat) - parseFloat(bounds.southEast.lat);

      return {
        northEast: {
          lat: Leaflet.Util.formatNum(parseFloat(bounds.northEast.lat) + this.options.boundaryFactor * boundsHeight, 14),
          lng: Leaflet.Util.formatNum(parseFloat(bounds.northEast.lng) + this.options.boundaryFactor * boundsWith, 14)
        },
        northWest: {
          lat: Leaflet.Util.formatNum(parseFloat(bounds.northWest.lat) + this.options.boundaryFactor * boundsHeight, 14),
          lng: Leaflet.Util.formatNum(parseFloat(bounds.northWest.lng) - this.options.boundaryFactor * boundsWith, 14)
        },
        southEast: {
          lat: Leaflet.Util.formatNum(parseFloat(bounds.southEast.lat) - this.options.boundaryFactor * boundsHeight, 14),
          lng: Leaflet.Util.formatNum(parseFloat(bounds.southEast.lng) + this.options.boundaryFactor * boundsWith, 14)
        },
        southWest: {
          lat: Leaflet.Util.formatNum(parseFloat(bounds.southWest.lat) - this.options.boundaryFactor * boundsHeight, 14),
          lng: Leaflet.Util.formatNum(parseFloat(bounds.southWest.lng) - this.options.boundaryFactor * boundsWith, 14)
        }
      }
    },

    updateItemsCount: function(total) {
      total = total || 0;
      this.getItemsCountElement().html(total);
      this.getItemsCountContainer().show();
    },

    didClickClusterMarker: function(e) {
      this.map.setView(e.latlng, this.map.getZoom() + 1);
    },

    didZoomMap: function() {
      this.trigger('map:bounds-changed', this.getState());
    },

    didDragMap: function() {
      this.trigger('map:bounds-changed', this.getState());
    },

    didResizeMap: function() {
      this.trigger('map:bounds-changed', this.getState());
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

    getMapContainerElement: function() {
      return this.$el.find('.vlr-map__map-container').get(0);
    },

    getItemsCountContainer: function() {
      return this.$el.find('.vlr-map__items-count-container');
    },

    getItemsCountElement: function() {
      return this.$el.find('.vlr-map__items-count');
    },

    render: function() {
      var html = Mustache.render(tpl);
      this.$el.append(html);

      return this;
    }
  });
});