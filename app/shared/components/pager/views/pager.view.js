define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    PageCollection = require('../collections/page.collection'),
    PagerModel = require('../models/pager.model'),
    PageModel = require('../models/page.model'),
    PageView = require('../views/page.view'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/pager.tpl.html');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!_.has(options, ['model'])) {
        this.model = new PagerModel;
      }

      if (!(this.model instanceof PagerModel)) {
        throw new Error('model is not of correct type');
      }

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:currentPage', this.didChangeCurrentPage);
    },

    events: {
      'click .efc-pager__page--first': 'didClickFirstPageButton',
      'click .efc-pager__page--previous': 'didClickPreviousPageButton',
      'click .efc-pager__page--next': 'didClickNextPageButton',
      'click .efc-pager__page--last': 'didClickLastPageButton'
    },

    update: function(data) {
      this.model.update(data);
    },

    didChangeCurrentPage: function() {
      this.trigger('pager:page:selected', this.model.toJSON());
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
      var collection = PageCollection.create(
        this.model.getPagedWindow(),
        this.model.getCurrentPage()
      );

      this.listenTo(collection, 'page:selection-request', this.didClickPageButton);

      return collection;
    },

    createPageViews: function() {
      return this.createPageCollection().map(function(pageModel) {
        return new PageView({
          model: pageModel
        })
      });
    },

    getPagesContainer: function() {
      return this.$el.find('.efc-pager__pages');
    },

    render: function() {
      this.$el.html(Mustache.render(tpl, this.model.toJSON()));

      var pageViews = this.createPageViews(),
        container = this.getPagesContainer();

      _.each(pageViews, function(pageView) {
        container.append(pageView.render().el);
      });

      this.$el.toggle(!this.model.hasOnePage());

      return this;
    }
  });
});