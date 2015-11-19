define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
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

    selectItems: function(itemIds) {
      this.unselectAll();

      var items = _.map(itemIds, function(id) {
        return this.get(id);
      }, this);

      _.chain(items)
        .compact()
        .invoke('select');
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