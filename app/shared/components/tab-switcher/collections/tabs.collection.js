define(function(require) {
  var Backbone = require('backbone'),
    TabModel = require('../models/tab.model');

  return Backbone.Collection.extend({
    model: TabModel,

    initialize: function(tabDescriptors) {
      this.validateTabDescriptors(tabDescriptors);
    },

    reset: function(tabDescriptors) {
      this.validateTabDescriptors(tabDescriptors);
      this.constructor.__super__.reset.apply(this, arguments);
    },

    validateTabDescriptors: function(tabDescriptors) {
      var selectedModels = _.where(tabDescriptors, {
        selected: true
      });

      if (selectedModels.length > 1) {
        throw new Error('More than one model is selected')
      }
    },

    selectedTabs: function() {
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
      var foundTab = this.findTab(identifier);

      if (foundTab) {
        _.chain(this.selectedTabs())
          .invoke('deselect');

        foundTab.select();
      }
    }
  });
});