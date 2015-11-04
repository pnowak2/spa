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

      this.collection = PageCollection.create(
        this.model.getPagedWindow(),
        this.model.getCurrentPage()
      );

      this.pageViews = this.collection.map(function(pageModel) {
        var pageView = new PageView({
          model: pageModel
        });

        this.listenTo(pageView, 'page:selected', this.didClickPageButton);

        return pageView;
      }, this);

      this.listenTo(this.model, 'change', this.modelDidChange);
    },

    events: {
      'click .efc-pager-first': 'didClickFirstPageButton',
      'click .efc-pager-previous': 'didClickPreviousPageButton',
      'click .efc-pager-next': 'didClickNextPageButton',
      'click .efc-pager-last': 'didClickLastPageButton'
    },

    modelDidChange: function() {
      var pagedWindow = this.model.getPagedWindow();
      this.collection.each(function(pageModel, i) {
        pageModel.set({
          page: pagedWindow[i],
          selected: this.model.getCurrentPage() === pagedWindow[i]
        });
      }, this);
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

    getPagesContainer: function() {
      return this.$el.find('.efc-pager-pages');
    },

    render: function() {
      this.$el.html(Mustache.render(tpl));
      var container = this.getPagesContainer();

      _.each(this.pageViews, function(pageView) {
        container.append(pageView.render().el);
      });

      return this;
    }
  });
});