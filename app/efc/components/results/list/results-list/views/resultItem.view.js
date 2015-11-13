define(function(require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    ResultModel = require('../models/result.model'),
    tpl = require('text!../templates/result-item.tpl.html');

  return Backbone.View.extend({
    tagName: 'tr',

    initialize: function() {
      if (!(this.model instanceof ResultModel)) {
        throw new Error('model is not of correct type');
      }
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON());
      this.$el.html(html);

      return this;
    }
  });
});