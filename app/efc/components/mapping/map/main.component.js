define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function() {
      this.view = new MapView;
    },

    showMarkers: function(markers) {
      this.view.showMarkers(markers);
    }
  });
});