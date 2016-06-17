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
      _.bindAll(this, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton', 'didZoomMap', 'didMoveMap', 'didResizeMap');

      this.options = _.extend({}, this.defaults, options);
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
      map.on('moveend', this.didMoveMap);
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

    },

    updateItemsCount: function(total) {
      total = total || 0;
      this.getItemsCountElement().html(total);
      this.getItemsCountContainer().show();
    },

    didZoomMap: function () {
      this.trigger('map:bounds-changed');
    },

    didMoveMap: function () {
      this.trigger('map:bounds-changed');
    },

    didResizeMap: function () {
      this.trigger('map:bounds-changed');
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