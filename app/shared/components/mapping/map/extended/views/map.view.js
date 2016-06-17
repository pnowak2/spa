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
      _.bindAll(this, 'didClickHomeButton', 'didClickFullscreenButton', 'didClickPrintButton');

      this.options = _.extend({}, this.defaults, options);
    },

    initMap: function () {
      if (!this.map) {
        this.map = this.createMap();
        this.buttonsBar = this.createButtonsBar();

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

      return map;
    },

    showMarkers: function(data) {

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