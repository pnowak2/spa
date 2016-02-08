define(function(require) {
  var _ = require('underscore'),
    Mustache = require('mustache'),
    Backbone = require('backbone'),
    ResultModel = require('../models/result.model'),
    FlagsComponent = require('app/shared/components/flags/main.component'),
    tpl = require('text!../templates/result-item.tpl.html');

  return Backbone.View.extend({
    tagName: 'tr',

    initialize: function() {
      if (!(this.model instanceof ResultModel)) {
        throw new Error('model is not of correct type');
      }
    },

    createFlagsComponent: function() {
      var countries = this.model.toJSON().countries;
      return new FlagsComponent(countries);
    },

    render: function() {
      var html = Mustache.render(tpl, this.model.toJSON()),
        flagsEl = this.createFlagsComponent().render().view.el;

      this.$el.html(html);
      this.$el.find('.efc-results-table__countries').append(flagsEl);

      return this;
    }
  });
});