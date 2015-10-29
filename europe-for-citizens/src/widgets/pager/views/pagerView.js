define(function(require) {
  var Backbone = require('backbone');

  return Backbone.View.extend({
    className: 'efc-pager',

    initialize: function(options) {
      if (!this.model) {
        throw new Error('view should be created with model');
      }
    }
  });
});