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
    },

    initialize: function(options) {
      _.bindAll(this, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didZoomMap', 'didDragMap', 'didResizeMap');

      this.options = _.extend({}, this.defaults, options);

      this.clusterMarkers = [];
      this.markers = [];
    },

    initMap: function() {
      if (!this.map) {
        this.map = this.createMap();
        this.tileLayers = this.createTileLayers();
        this.buttonsBar = this.createButtonsBar();
        this.buttonsBar.addTo(this.map);

        _.each(this.tileLayers, function(tileLayer) {
          this.map.addLayer(tileLayer);
        }, this);
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
      map.on('dragend', this.didDragMap);
      map.on('resize', this.didResizeMap);

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

      _.map(data.items, function(item) {

      });

      this.updateItemsCount(data.total);
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
                popup: item.popupContent,
                popupOptions: {
                  autoPanPadding: [48, 42],
                }
              }
            );
          })
        })
        .value()
    },

    clearMarkers: function() {

    },

    isMinZoom: function() {
      return this.map.getZoom() <= this.map.getMinZoom();
    },

    isMaxZoom: function() {
      return this.map.getZoom() >= this.map.getMaxZoom();
    },

    getState: function() {
      var bounds = this.map.getBounds();

      return {
        currentZoom: this.map.getZoom(),
        initialZoom: this.options.initialZoom,
        minZoom: this.map.getMinZoom(),
        maxZoom: this.map.getMaxZoom(),
        isMinZoom: this.isMinZoom(),
        isMaxZoom: this.isMaxZoom(),
        bounds: {
          northEast: {
            lat: bounds.getNorthEast().lat,
            lng: bounds.getNorthEast().lng
          },
          northWest: {
            lat: bounds.getNorthWest().lat,
            lng: bounds.getNorthWest().lng
          },
          southEast: {
            lat: bounds.getSouthEast().lat,
            lng: bounds.getSouthEast().lng
          },
          southWest: {
            lat: bounds.getSouthWest().lat,
            lng: bounds.getSouthWest().lng
          }
        }
      }
    },

    updateItemsCount: function(total) {
      total = total || 0;
      this.getItemsCountElement().html(total);
      this.getItemsCountContainer().show();
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