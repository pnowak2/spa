define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function() {
      this.view = new MapView;
    },

    initMap: function() {
      this.view.initMap();
    },

    showMarkers: function(markersData) {
      this.view.showMarkers(markersData);
    }
  });
});