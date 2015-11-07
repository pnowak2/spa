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
      this.model.trigger('tab:selection-request', this.model.get('identifier'));
    },

    render: function() {
      this.$el.html(Mustache.render('{{ title }}', this.model.toJSON()));
      this.$el.toggleClass('efc-selected', this.model.isSelected());

      return this;
    }
  });
});