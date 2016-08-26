define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    SelectItemModel = require('../models/selectItem.model');

  return Backbone.Collection.extend({
    model: SelectItemModel,

    initialize: function(models, options) {
      this.originalItems = new (Backbone.Collection.extend({
        model: SelectItemModel
      }))(models).toJSON();
    },

    selectedItems: function() {
      return this.where({
        selected: true
      });
    },

    firstSelectedItem: function () {
      return this.selectedItems()[0];
    },

    selectItem: function(id) {
      var model = this.get(id);

      if (model) {
        model.select();
      }
    },

    hasSelection: function() {
      return !_.isEmpty(this.selectedItems());
    },

    hasOneSelection: function() {
      return this.hasSelection() && this.selectedItems().length === 1;
    },

    isDirty: function() {
      return !_.isEqual(this.toJSON(), this.originalItems);
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