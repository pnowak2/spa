define(function(require) {
  var Component = require('app/core/component'),
    PartnersMapView = require('./views/partnersMap.view');

  return Component.extend({
    initialize: function(criteria) {
      this.view = new PartnersMapView(criteria);
    }
  });
});