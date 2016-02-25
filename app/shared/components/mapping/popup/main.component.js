define(function(require) {
  var Component = require('app/core/component'),
    PopupView = require('./views/popup.view');

  return Component.extend({
    initialize: function(options) {
      options = options || {};
      
      this.view = new PopupView(options);
    }
  });
});