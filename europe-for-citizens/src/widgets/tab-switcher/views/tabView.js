define(function(require) {
  var Mustache = require('mustache'),
    Backbone = require('backbone');

  return Backbone.View.extend({
    tagName: 'li',

    className: 'efc-tab',

    events: {
      'click': 'didClickTab'
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    didClickTab: function() {
      this.trigger('tab:selected', this.model.get('identifier'));
    },

    isSelected: function() {
      return this.model.isSelected();
    },

    render: function() {
      this.$el.html(Mustache.render('{{ title }}', this.model.toJSON()));
      this.$el.toggleClass('efc-selected', this.model.isSelected());

      return this;
    }
  });
});