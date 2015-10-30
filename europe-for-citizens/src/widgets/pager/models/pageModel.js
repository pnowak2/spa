define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      title: '',
      number: null,
      selected: false
    }
  });
});