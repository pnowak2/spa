define(function (require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    PagerCollection = require('../collections/pagerCollection'),
    PageView = require('./pageView'),
    widgetEventBus = require('../events/widgetEventBus');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function () {
      this.collection = new PagerCollection;
      this.listenTo(this.collection, 'reset', this.render);
      this.listenTo(widgetEventBus, 'pager:page-request', this.didSelectPage);
    },

    didSelectPage: function (pageModel) {
      this.collection.chain()
        .without(pageModel)
        .invoke('deselect');
    },

    dataReady: function (data) {
      var pageSize = this.model.get('pageSize'),
        pages = Math.ceil(data.total / pageSize),
        pageNumbers = _.range(1, pages + 1),
        objects = [];

      console.log('crp', data.currentPage);
      this.model.set('currentPage', data.currentPage || 1);

      _.each(pageNumbers, function (pageNumber) {
        objects.push({
          page: pageNumber,
          selected: this.model.get('currentPage') === pageNumber
        });
      }, this);

      this.collection.reset(objects);
    },

    render: function () {
      this.$el.empty();
      if (this.collection.isEmpty()) {
        return
      }

      this.collection.each(function (pageModel) {
        var pageView = new PageView({
          model: pageModel
        });

        this.$el.append(pageView.render().el);
      }, this);

      return this;
    }
  });
});