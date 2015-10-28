define(function (require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      page: null,
      selected: false
    },

    isSelected: function () {
      return this.get('selected');
    },

    select: function () {
      this.set('selected', true);
    },

    deselect: function () {
      this.set('selected', false);
    }
  });
});