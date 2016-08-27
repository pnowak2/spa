define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore');

  return Backbone.Collection.extend({
    allItems: function() {
      return this.toJSON();
    },

    initialItems: function() {
      return _.map(this.first(6), function(item) {
        return item.toJSON();
      });
    },

    restItems: function() {
      var allItems = this.allItems(),
        initialItems = this.initialItems();

      return allItems.slice(initialItems.length);
    },

    hasRestItems: function() {
      return !_.isEmpty(this.restItems());
    },

    itemsData: function() {
      return {
        allItems: this.allItems(),
        initialItems: this.initialItems(),
        restItems: this.restItems()
      };
    }
  });
});