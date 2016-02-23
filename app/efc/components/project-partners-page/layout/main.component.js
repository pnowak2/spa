define(function(require) {
  var Component = require('app/core/component'),
    ProjectPartnersView = require('./views/projectPartnersPage.view');

  return Component.extend({
    initialize: function(config) {
      this.view = new ProjectPartnersView(config);
    }
  });
});