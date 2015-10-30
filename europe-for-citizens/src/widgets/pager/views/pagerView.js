define(function(require) {
  var Backbone = require('backbone'),
    PageCollection = require('../collections/pageCollection'),
    PagerModel = require('../models/pagerModel');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!(this.model instanceof PagerModel)) {
        throw new Error('model is not of correct type');
      }

      this.collection = new PageCollection;
      this.listenTo(this.model, 'change', this.modelDidChange);
    },

    modelDidChange: function() {
      this.render();
    },

    render: function() {
      return this;
    }
  });
});