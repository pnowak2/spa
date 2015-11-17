define(function(require) {
  var Component = require('app/core/component'),
    MultiselectView = require('./views/multiselect.view');

  return Component.extend({
    initialize: function(items) {
      this.view = new MultiselectView(items);
    },

    selectedItems: function() {
      return this.view.selectedItems();
    },

    update: function(items) {
      this.view.update(items);
    }
  });
});