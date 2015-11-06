define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      title: '',
      identifier: null,
      selected: false
    },

    isSelected: function() {
      return this.get('selected');
    },

    toggle: function() {
      this.set('selected', !this.isSelected());
    },

    select: function() {
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    }
  });
});