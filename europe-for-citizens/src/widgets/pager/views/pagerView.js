define(function(require) {
  var Backbone = require('backbone'),
    PageCollection = require('../collections/pageCollection'),
    PagerModel = require('../models/pagerModel'),
    PageModel = require('../models/pageModel');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!(this.model instanceof PagerModel)) {
        throw new Error('model is not of correct type');
      }

      this.listenTo(this.model, 'change', this.modelDidChange);
    },

    createPageCollection: function() {
      var collection = new PageCollection;

      _.each(this.model.getPagedWindow(), function(page) {
        collection.add({
          title: page,
          number: page,
          selected: this.model.getCurrentPage() === page
        })
      }, this);

      return collection;
    },

    modelDidChange: function() {
      this.render();
    },

    render: function() {
      return this;
    }
  });
});