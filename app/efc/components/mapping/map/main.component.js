define(function(require) {
  var Component = require('app/core/component'),
    MapView = require('./views/map.view');

  return Component.extend({
    initialize: function() {
      this.view = new MapView;
    },

    showMarkerComponents: function(markers) {
      this.view.showMarkerComponents(markers);
    }
  });
});