define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      displayStartItem: 0,
      displayEndItem: 0,
      totalItems: 0,
      visible: true
    },

    isVisible: function() {
      return this.get('visible');
    },

    hasItems: function() {
      return this.get('totalItems') > 0;
    },

    update: function(options) {
      this.set(options);
    }
  });
});