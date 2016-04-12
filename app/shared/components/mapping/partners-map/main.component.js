define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapView = require('./views/partnersMap.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new PartnersMapView(options);
    }
  });
});