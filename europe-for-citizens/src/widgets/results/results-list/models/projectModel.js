define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore');

  return Backbone.Model.extend({
    defaults: {
      id: '',
      title: '',
      description: '',
      year: '',
      countries: []
    }
  });
});