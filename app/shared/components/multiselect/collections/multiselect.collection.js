define(function(require) {
  var Backbone = require('backbone'),
    SelectItemModel = require('../models/selectItem.model');

  return Backbone.Collection.extend({
    model: SelectItemModel,

    selectedItems: function() {
      return this.where({
        selected: true
      });
    },

    selectItem: function(id) {
      var model = this.get(id);

      if (model) {
        model.select();
      }
    },

    unselectItem: function(id) {
      var model = this.get(id);

      if (model) {
        model.unselect();
      }
    },

    unselectAll: function() {
      this.invoke('unselect');
    }
  });
});