define(function(require) {
  var eventBus = require('../events/eventBus'),
    Mustache = require('mustache'),
    Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'li',

    className: 'efc-tab',

    events: {
      'click': 'didClickTab'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.didModelChange);
    },

    didClickTab: function() {
      this.model.select();
    },

    isSelected: function() {
      return this.model.isSelected();
    },

    didModelChange: function() {
      if (this.model.isSelected()) {
        eventBus.trigger('tab-switcher:tab:selected', this.model);
      }
      this.render();
    },

    render: function() {
      this.$el.html(Mustache.render('{{ title }}', this.model.toJSON()));
      this.$el.toggleClass('efc-selected', this.model.isSelected());

      return this;
    }
  });
});