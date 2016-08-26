define(function(require) {
  var Component = require('app/core/component'),
    FlagsView = require('./views/flags.view');

  return Component.extend({
    initialize: function(flagDescriptors) {
      this.view = new FlagsView(flagDescriptors);
    }
  });
});