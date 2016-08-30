define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/results-list.tpl.html');

  return Backbone.View.extend({
    className: 'ce-results-list',

    initialize: function () {
      this.data = {};
    },

    update: function(items) {
      this.items = items || [];
      this.render();
    },

    render: function() {
      var html = Mustache.render(tpl, {
        hasItems: !_.isEmpty(this.items),
        items: this.items
      });

      this.$el.html(html);

      return this;
    }
  });
});