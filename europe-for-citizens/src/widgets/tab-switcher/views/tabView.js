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
      this.listenTo(this.model, 'change:selected', this.didModelSelectionChange);
    },

    didClickTab: function() {
      this.model.select();
    },

    isSelected: function() {
      return this.model.isSelected();
    },

    didModelSelectionChange: function() {
      this.$el.toggleClass('efc-selected', this.model.isSelected());
      if (this.model.isSelected()) {
        eventBus.trigger('tab-switcher:tab:selected', this.model.toJSON());
      }
    },

    render: function() {
      this.$el.html(Mustache.render('{{ title }}', this.model.toJSON()));

      return this;
    }
  });
});