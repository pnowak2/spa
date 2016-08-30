define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/result-stats.tpl.html');

  return Backbone.View.extend({
    className: 'ce-result-stats',

    initialize: function () {
      this.data = {};
    },

    update: function(data) {
      this.data = data || {};
      this.render();
    },

    render: function() {
      var html = Mustache.render(tpl, {});

      this.$el.html(html);

      return this;
    }
  });
});