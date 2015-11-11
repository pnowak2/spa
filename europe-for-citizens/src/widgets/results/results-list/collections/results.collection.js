define(function(require) {
  var Backbone = require('backbone'),
    ProjectModel = require('../models/result.model');

  return Backbone.Collection.extend({
    model: ProjectModel
  });
});