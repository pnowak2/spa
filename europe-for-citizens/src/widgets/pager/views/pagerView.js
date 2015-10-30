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
      var collection = new PageCollection,
        currentPage = this.model.getCurrentPage(),
        pagedWindow = this.model.getPagedWindow(),
        pageObjects = _.map(pagedWindow, function(page) {
          return {
            title: page,
            number: page,
            selected: (currentPage === page)
          }
        }, this);

      collection.reset(pageObjects);

      return collection;
    },

    modelDidChange: function() {
      this.render();
    },

    render: function() {
      var collection = this.createPageCollection();

      return this;
    }
  });
});