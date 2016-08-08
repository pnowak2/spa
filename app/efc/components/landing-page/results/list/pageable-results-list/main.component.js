define(function(require) {
  var Component = require('app/core/component'),
    PageableResultsListView = require('./views/pageableResultsList.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new PageableResultsListView;
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});