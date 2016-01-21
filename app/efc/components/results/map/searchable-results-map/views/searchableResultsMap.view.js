define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/app.module'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
    searchService = require('../services/search/search.service'),
    ProjectPopupComponent = require('app/shared/components/mapping/popups/project/main.component');

  return Backbone.View.extend({
    className: 'efc-searchable-results-map',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.mapComponent = new MapComponent;
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    onSearchRequest: function(searchCriteria) {
      searchService.search(searchCriteria)
        .then(this.didSearchSucceed)
        .catch(this.didSearchFail);
    },

    didSearchSucceed: function(data) {
      data = data || {};

      var markers = this.prepareMarkersData(data);
      this.mapComponent.showMarkers(markers);
    },

    didSearchFail: function(error) {
      app.showError(error);
    },

    prepareMarkersData: function(data) {
      data = data || {};
      return _.map(data.itemsByCountry, this.prepareMarkersByCountryData);
    },

    prepareMarkersByCountryData: function(countryItems) {
      return _.map(countryItems, function(countryItem) {
        countryItem = countryItem || {};

        var popupComponent = new ProjectPopupComponent({
            popupData: {
              id: countryItem.id,
              title: countryItem.title,
              description: countryItem.description,
              activity: countryItem.activity,
              coordinator: countryItem.coordinator
            }
          }),
          popupContent = popupComponent.render().view.el;

        return {
          id: countryItem.id,
          lat: countryItem.lat,
          lng: countryItem.lng,
          popupContent: popupContent
        }
      });
    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});