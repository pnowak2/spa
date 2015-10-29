define(function(require) {
  var Backbone = require('backbone'),
    PageModel = require('../models/pageModel');

  return Backbone.Collection.extend({
    model: PageModel
  });
});