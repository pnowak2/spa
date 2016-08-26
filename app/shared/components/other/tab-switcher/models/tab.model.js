define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      title: '',
      identifier: null,
      selected: false,
      targetSelector: null
    },

    isSelected: function() {
      return this.get('selected');
    },

    select: function() {
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    },

    getTargetSelector: function() {
      return this.get('targetSelector');
    }
  });
});