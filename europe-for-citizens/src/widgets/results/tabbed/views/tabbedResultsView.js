define(function (require) {
  var Backbone = require('backbone'),
      Mustache = require('mustache'),
      tpl = require('text!../templates/tabbed-results.html');

  return Backbone.View.extend({
    className: 'efc-results-combined',

    initialize: function () {

    },

    render: function () {
      var html = Mustache.render(tpl);
      this.$el.html(html);
    }
  });
});