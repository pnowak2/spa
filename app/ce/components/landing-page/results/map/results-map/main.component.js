define(function(require) {
  var Component = require('app/core/component'),
    ResultsMapView = require('./views/resultsMap.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new ResultsMapView();
    },

    initMap: function() {
      this.view.initMap();
    },

    invalidateSize: function() {
      this.view.invalidateSize();
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});