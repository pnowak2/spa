define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function() {
      this.view = new MapView;
    },

    updateMarkers: function(markers) {
      this.view.updateMarkers(markers);
    }
  });
});