define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new MapView(options);
      this.listenTo(this.view, 'map:bounds-changed', function(mapDetails) {
        this.trigger('map:bounds-changed', mapDetails);
      });
    },

    initMap: function() {
      this.view.initMap();
    },

    showMarkers: function(markersData) {
      this.view.showMarkers(markersData);
    }
  });
});