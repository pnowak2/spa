define(function(require) {
  var Component = require('app/core/component'),
    ProjectMarkerView = require('./views/projectMarker.view'),
    ProjectMarkerModel = require('./models/projectMarker.model');

  return Component.extend({
    initialize: function(options) {
      options = options || {};
      this.view = new ProjectMarkerView({
        markerData: options.markerData
      });
    },

    getState: function() {
      return this.view.model.toJSON();
    }
  });
});