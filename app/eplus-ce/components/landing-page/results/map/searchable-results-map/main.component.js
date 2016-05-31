define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsMapView = require('./views/searchableResultsMap.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new SearchableResultsMapView;
    },

    initMap: function() {
      this.view.initMap();
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});