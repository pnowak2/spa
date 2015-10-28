define(function (require) {
  var _ = require('underscore'),
    widgetEventBus = require('../events/widgetEventBus'),
    Mustache = require('mustache'),
    Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'li',

    className: 'efc-tab',

    events: {
      'click': 'didClickTab'
    },

    initialize: function () {
      this.listenTo(this.model, 'change:selected', this.selectionDidChange);
    },

    didClickTab: function () {
      this.model.select();
    },

    isTabSelected: function () {
      return this.model.isSelected();
    },

    selectionDidChange: function () {
      if (this.model.isSelected()) {
        widgetEventBus.trigger('tab-switcher:selected', this.model);
      }
      this.$el.toggleClass('efc-selected', this.model.isSelected());
    },

    render: function () {
      this.$el.html(Mustache.render('{{title}}', this.model.toJSON()));

      return this;
    }
  });
});