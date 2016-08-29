define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/results-list.tpl.html');

  return Backbone.View.extend({
    className: 'ce-results-list',

    update: function(items) {
      this.items = items || [];
      this.render();
    },

    render: function() {
      var html = Mustache.render(tpl, {
        isEmpty: _.isEmpty(this.items),
        items: this.items
      });

      this.$el.html(html);

      return this;
    }
  });
});