define(function(require) {
  var Backbone = require('backbone'),
    PageCollection = require('../collections/pageCollection'),
    PagerModel = require('../models/pagerModel'),
    PageModel = require('../models/pageModel'),
    eventBus = require('../events/eventBus');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!(this.model instanceof PagerModel)) {
        throw new Error('model is not of correct type');
      }

      this.listenTo(this.model, 'change', this.modelDidChange);
      this.listenTo(eventBus, 'pager:page:selected', this.didClickPageButton);
    },

    modelDidChange: function() {
      this.render();
    },

    didClickPageButton: function(page) {
      this.model.setCurrentPage(page);
    },

    didClickFirstPageButton: function() {
      this.model.firstPage();
    },

    didClickPreviousPageButton: function() {
      this.model.previousPage();
    },

    didClickNextPageButton: function() {
      this.model.nextPage();
    },

    didClickLastPageButton: function() {
      this.model.lastPage();
    },

    render: function() {
      var collection = PageCollection.create(
        this.model.getPagedWindow(),
        this.model.getCurrentPage()
      );

      return this;
    }
  });
});