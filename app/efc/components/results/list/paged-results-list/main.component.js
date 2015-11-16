define(function(require) {
  var Component = require('app/core/component'),
    PagedResultsListView = require('./views/pagedResultsList.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new PagedResultsListView;
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});