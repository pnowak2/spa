define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      page: null,
      selected: false
    },

    select: function() {
      this.set('selected', true);
    },

    deselect: function() {
      this.set('selected', false);
    }
  });
});