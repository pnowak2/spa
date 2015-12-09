define(function(require) {
  var Component = require('app/core/component'),
    AdvancedSearchView = require('./views/advancedSearch.view');

  return Component.extend({
    initialize: function() {
      this.view = new AdvancedSearchView;
    },

    getCriteria: function() {
      return this.view.getCriteria();
    },

    hasSelections: function() {
      return this.view.hasSelections();
    }
  });
});