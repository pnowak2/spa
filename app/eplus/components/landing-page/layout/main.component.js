define(function(require) {
  var Component = require('app/core/component'),
    LandingPageView = require('./views/landingPage.view');

  return Component.extend({
    initialize: function() {
      this.view = new LandingPageView;
    }
  });
});