define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsListView = require('./views/searchableResultsList.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new SearchableResultsListView();

      this.listenTo(this.view, 'search:completed', function(data) {
        this.trigger('search:completed', data);
      });
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    },
    
    onExportToXlsRequest: function(searchCriteria) {
      this.view.onExportToXlsRequest(searchCriteria);
    }
  });

});