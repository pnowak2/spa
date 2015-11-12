define(function(require) {
  var $ = require('jquery'),
    Component = require('app/core/component'),
    AppView = require('./views/app.view');

  return Component.extend({
    initialize: function() {
      this.view = new AppView;
    }
  });
});