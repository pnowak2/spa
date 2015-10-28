define(function (require) {
  var Backbone = require('backbone'),
      Mustache = require('mustache'),
      tpl = require('text!../templates/paginated.html');

  return Backbone.View.extend({
    className: 'efc-results-paginated',

    render: function () {
      var html = Mustache.render(tpl);
      this.$el.html(html);
    }
  });
});