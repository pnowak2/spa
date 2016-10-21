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

      this.listenTo(this.view, 'multiselect:change', function(item) {
        this.trigger('multiselect:change', item);
      });
    },

    hasItems: function() {
      return this.view.hasItems();
    },

    selectedItems: function() {
      return this.view.selectedItems();
    },

    firstSelectedItem: function() {
      return this.view.firstSelectedItem();
    },

    hasSelection: function() {
      return this.view.hasSelection();
    },

    hasOneSelection: function() {
      return this.view.hasOneSelection();
    },

    hasMultipleSelections: function() {
      return this.view.hasMultipleSelections();
    },

    isDirty: function() {
      return this.view.isDirty();
    },

    selectItems: function(itemIds) {
      this.view.selectItems(itemIds);
    },

    selectItem: function(itemId) {
      this.view.selectItem(itemId);
    },

    update: function(items) {
      this.view.update(items);
    },

    clear: function() {
      this.view.clear();
    },

    unselectAll: function() {
      this.view.unselectAll();
    },

    disable: function() {
      this.view.disable();
    },

    enable: function() {
      this.view.enable();
    },

    isEnabled: function() {
      return this.view.isEnabled();
    },

    isVisible: function() {
      return this.view.isVisible();
    }
  });
});