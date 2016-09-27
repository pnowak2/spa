define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new MapView(options);
    },

    initMap: function() {
      this.view.initMap();
    },

    invalidateSize: function() {
      this.view.invalidateSize();
    },

    showMarkers: function(markersData) {
      this.view.showMarkers(markersData);
    }
  });
});