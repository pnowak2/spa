define(function(require) {
  var Component = require('app/core/component'),
    AdvancedSearchView = require('./views/advancedSearch.view');

  return Component.extend({
    initialize: function(data) {
      this.view = new AdvancedSearchView(data);
    },

    getCriteria: function() {
      return this.view.getCriteria();
    }
  });
});