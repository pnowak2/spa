define(function(require) {
  var Backbone = require('backbone'),
    MultiselectModel = require('../models/multiselect.model');

  return Backbone.Collection.extend({
    model: MultiselectModel,

    selected: function() {
      return this.where({
        selected: true
      });
    }
  });
});