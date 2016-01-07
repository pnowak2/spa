define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      id: '',
      lat: null,
      lng: null,
      title: '',
      activity: '',
      coordinator: '',
      summary: ''
    }
  })
});