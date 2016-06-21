define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/shared/modules/app.module'),
    searchService = require('../services/search/search.service'),
    MapComponent = require('app/shared/components/mapping/map/extended/main.component');

  return Backbone.View.extend({
    className: 'eplus-ce-searchable-results-map',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.mapComponent = new MapComponent;
      this.listenTo(this.mapComponent, 'map:bounds-changed', this.onMapBoundsChanged);
      
      this.cachedCriteria = {};
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    prepareSearchCriteria: function(criteria, mapState) {
      return _.extend({}, criteria, mapState);
    },

    onSearchRequest: function(searchCriteria) {
      var criteria = this.prepareSearchCriteria(
        searchCriteria,
        this.mapComponent.getState()
      );

      this.performSearch(criteria);

      this.cachedCriteria = criteria;
    },

    onMapBoundsChanged: function(mapState) {
      var criteria = this.prepareSearchCriteria(
        this.cachedCriteria,
        mapState
      );

      this.performSearch(criteria);
    },

    performSearch: function(criteria) {
      searchService.search(criteria)
        .then(this.didSearchSucceed)
        .catch(this.didSearchFail);
    },

    didSearchSucceed: function(data) {

    },

    didSearchFail: function(error) {
      app.showError(error);
    },

    prepareMarkersData: function(data) {

    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});