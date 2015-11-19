define(function(require) {
  var Component = require('app/core/component'),
    MultiselectView = require('./views/multiselect.view');

  return Component.extend({
    initialize: function(items, options) {
      options = options || {};
      this.view = new MultiselectView(items, options);

      this.listenTo(this.view, 'multiselect:selected', function(data) {
        this.trigger('multiselect:selected', data);
      });
    },

    selectedItems: function() {
      return this.view.selectedItems();
    },

    selectItems: function(itemIds) {
      this.view.selectItems(itemIds);
    },

    update: function(items) {
      this.view.update(items);
    }
  });
});