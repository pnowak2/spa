define(function(require) {
  var Backbone = require('backbone'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/results-list.tpl.html');

  return Backbone.View.extend({
    className: 'ce-results-list',

    initialize: function() {

    },

    update: function(items) {

    },

    render: function() {
      var html = Mustache.render(tpl);

      this.$el.html(html);

      return this;
    }
  });
});