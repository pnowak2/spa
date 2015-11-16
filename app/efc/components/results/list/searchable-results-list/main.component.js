define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsListView = require('./views/searchableResultsList.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new SearchableResultsListView;
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});