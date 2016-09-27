define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new MapView(options);
      this.listenTo(this.view, 'map:bounds-changed', function(mapState) {
        this.trigger('map:bounds-changed', mapState);
      });
    },

    initMap: function() {
      this.view.initMap();
    },

    invalidateSize: function() {
      this.view.invalidateSize();
    },
    
    getState: function () {
      return this.view.getState();
    },

    showMarkers: function(markersData) {
      this.view.showMarkers(markersData);
    }
  });
});