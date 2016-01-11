define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      id: '',
      title: '',
      description: '',
      activity: '',
      coordinator: ''
    }
  })
});