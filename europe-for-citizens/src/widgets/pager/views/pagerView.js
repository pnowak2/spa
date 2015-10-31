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
      this.listenTo(eventBus, 'pager:page:selected', this.didSelectPage);
    },

    modelDidChange: function() {
      this.render();
    },

    didSelectPage: function(page) {
      this.model.setCurrentPage(page);
    },

    render: function() {
      var collection = PageCollection.createCollection(
        this.model.getPagedWindow(),
        this.model.getCurrentPage()
      );

      return this;
    }
  });
});