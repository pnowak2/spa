define(function(require) {
  var Component = require('app/core/component'),
    MultiselectView = require('./views/multiselect.view');

  return Component.extend({
    initialize: function() {
      this.view = new MultiselectView();
    },

    selectedItems: function() {
      return this.view.selectedItems();
    },

    update: function(items) {
      this.view.update(items);
    }
  });
});