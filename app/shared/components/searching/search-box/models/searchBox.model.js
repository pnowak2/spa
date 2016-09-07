define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      keyword: ''
    },

    isDirty: function() {
      return !_.isEmpty(this.get('keyword'));
    }
  });
});