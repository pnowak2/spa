define(function(require) {
  var Component = require('app/core/component'),
    AppView = require('./views/app.view');

  return Component.extend({
    initialize: function() {
      this.view = new AppView;
    }
  });
});