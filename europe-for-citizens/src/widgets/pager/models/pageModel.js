define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      page: null,
      selected: false
    }
  });
});