define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      id: '',
      title: '',
      selected: false
    },

    select: function() {
      this.set('selected', true);
    },

    unselect: function() {
      this.set('selected', false);
    },

    isSelected: function() {
      return this.get('selected');
    }
  });
});