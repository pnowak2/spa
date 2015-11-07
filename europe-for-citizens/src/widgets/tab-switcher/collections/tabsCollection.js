define(function(require) {
  var Backbone = require('backbone'),
    TabModel = require('../models/tabModel');

  return Backbone.Collection.extend({
    model: TabModel,

    selected: function() {
      return this.where({
        selected: true
      });
    },

    findTab: function(identifier) {
      return this.findWhere({
        identifier: identifier
      });
    },

    selectTab: function(identifier) {
      _.chain(this.selected())
        .invoke('deselect');

      this.findTab(identifier).select();
    }
  });
});