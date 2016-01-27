define(function(require) {
  var Backbone = require('backbone'),
    PageStatsModel = require('../models/pageStats.model'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/pageStats.tpl.html');

  return Backbone.View.extend({
    className: 'efc-page-stats',

    initialize: function(options) {
      this.model = new PageStatsModel(options);

      this.listenTo(this.model, 'change', this.render);
    },

    update: function(options) {
      this.model.update(options);
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());

      this.$el.html(html);

      this.$el.toggle(this.model.hasItems());

      return this;
    }
  });
});