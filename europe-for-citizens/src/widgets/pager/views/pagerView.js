define(function(require) {
  var Backbone = require('backbone'),
    PagerModel = require('../models/pagerModel');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!this.model) {
        throw new Error('view should be created with model');
      }

      if (!(this.model instanceof PagerModel)) {
        throw new Error('model is not of correct type');
      }
    }
  });
});