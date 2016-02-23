define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapView = require('./views/partnersMap.view');

  return Component.extend({
    initialize: function() {
      this.view = new PartnersMapView;
    },

    initMap: function() {
      this.view.initMap();
    }
  });
});