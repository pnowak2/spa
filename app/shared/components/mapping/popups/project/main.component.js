define(function(require) {
  var Component = require('app/core/component'),
    ProjectPopupView = require('./views/projectPopup.view'),
    ProjectPopupModel = require('./models/projectPopup.model');

  return Component.extend({
    initialize: function(options) {
      options = options || {};
      this.view = new ProjectPopupView({
        popupData: options.popupData
      });
    }
  });
});