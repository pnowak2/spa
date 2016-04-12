define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapView = require('./views/partnersMap.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new PartnersMapView(options);
    },

    initMap: function() {
      this.view.initMap();
    },

    showMarkers: function(data) {
    	this.view.showMarkers(data);
    }
  });
});