define(function(require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    tpl = require('text!../templates/result-item.html');

  return Backbone.View.extend({
    tagName: 'tr',

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);

      return this;
    }
  });
});