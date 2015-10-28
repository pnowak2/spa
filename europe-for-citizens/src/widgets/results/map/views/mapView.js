define(function (require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/result-map.html');

  return Backbone.View.extend({
    className: 'efc-results-map',

    initialize: function () {
      this.count = 0;
    },

    showItem: function (projectModel) {
      this.$el.html(projectModel.id);
    },

    render: function () {
      this.$el.html(Mustache.render(tpl));

      return this;
    }
  });
});