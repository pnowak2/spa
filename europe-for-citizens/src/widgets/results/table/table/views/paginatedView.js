define(function (require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    tpl = require('text!../templates/result-paginated.html'),
    TableView = require('./tableView');

  return Backbone.View.extend({
    className: 'efc-results-paginated',

    initialize: function (options) {
      this.tableView = new TableView;
      this.pagerWidget = options.pagerWidget;
    },

    dataReady: function (data) {
      this.tableView.dataReady(data);
    },

    render: function () {
      var html = Mustache.render(tpl);
      this.$el.html(html);

      this.$el.find('.efc-paginated-table').html(this.tableView.render().el);
      this.$el.find('.efc-paginated-pager').html(this.pagerWidget.render().view.el);

      return this;
    }
  });
});