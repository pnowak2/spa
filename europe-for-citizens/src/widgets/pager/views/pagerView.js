define(function(require) {
  var Backbone = require('backbone'),
    PageCollection = require('../collections/pageCollection'),
    PagerModel = require('../models/pagerModel'),
    PageModel = require('../models/pageModel'),
    PageView = require('../views/pageView'),
    eventBus = require('../events/eventBus'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/pager.html');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!(this.model instanceof PagerModel)) {
        throw new Error('model is not of correct type');
      }

      this.listenTo(this.model, 'change', this.modelDidChange);
      this.listenTo(eventBus, 'pager:page:selected', this.didClickPageButton);
    },

    events: {
      'click .efc-pager-first': 'didClickFirstPageButton',
      'click .efc-pager-previous': 'didClickPreviousPageButton',
      'click .efc-pager-next': 'didClickNextPageButton',
      'click .efc-pager-last': 'didClickLastPageButton'
    },

    modelDidChange: function() {
      this.render();
    },

    didClickPageButton: function(page) {
      this.model.setCurrentPage(page);
    },

    didClickFirstPageButton: function(e) {
      e.preventDefault();
      this.model.firstPage();
    },

    didClickPreviousPageButton: function(e) {
      e.preventDefault();
      this.model.previousPage();
    },

    didClickNextPageButton: function(e) {
      e.preventDefault();
      this.model.nextPage();
    },

    didClickLastPageButton: function(e) {
      e.preventDefault();
      this.model.lastPage();
    },

    createPageCollection: function() {
      return PageCollection.create(
        this.model.getPagedWindow(),
        this.model.getCurrentPage()
      );
    },

    createPageViews: function() {
      return this.createPageCollection().map(function(pageModel) {
        return new PageView({
          model: pageModel
        });
      });
    },

    getPagesContainer: function() {
      return this.$el.find('.efc-pager-pages');
    },

    render: function() {
      this.$el.html(Mustache.render(tpl));

      var pageViews = this.createPageViews(),
        container = this.getPagesContainer();

      _.each(pageViews, function(pageView) {
        container.append(pageView.render().el);
      });

      return this;
    }
  });
});