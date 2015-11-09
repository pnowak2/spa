define(function (require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    ProjectCollection = require('../collections/projectsCollection'),
    ItemView = require('./itemView'),
    tpl = require('text!../templates/result-table.html');

  return Backbone.View.extend({
    className: 'efc-results-table',

    initialize: function () {
      this.collection = new ProjectCollection;
      this.listenTo(this.collection, 'reset', this.render);
    },

    dataReady: function (data) {
      this.collection.reset(data);
    },

    render: function () {
      this.$el.html(Mustache.render(tpl, {
        hasData: !this.collection.isEmpty()
      }));

      var tbody = this.$el.find('tbody');

      this.collection.each(function (itemModel) {
        var itemView = new ItemView({
          model: itemModel
        });
        tbody.append(itemView.render().el);
      }, this);

      return this;
    }
  });
});