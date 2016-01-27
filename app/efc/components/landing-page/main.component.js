define(function(require) {
  var Component = require('app/core/component'),
    AppView = require('./views/landingPage.view');

  return Component.extend({
    initialize: function() {
      this.view = new AppView;
    }
  });
});