define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/shared/modules/app.module'),
    MapComponent = require('app/shared/components/mapping/map/simple/main.component'),
    searchService = require('../services/search/search.service'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/results-map.tpl.html');

  return Backbone.View.extend({
    className: 'ce-results-map',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.mapComponent = new MapComponent();
    },

    initMap: function() {
      this.mapComponent.initMap();
    },

    invalidateSize: function () {
      this.mapComponent.invalidateSize();
    },

    onSearchRequest: function(searchCriteria) {
      searchService.search(searchCriteria)
        .then(this.didSearchSucceed)
        .catch(this.didSearchFail);

      this.toggleCountryExplanation(searchCriteria);
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

      var total = data.total,
        markers = _.map(data.markers, this.prepareMarkersByCountryData, this);

      return {
        total: total,
        markers: markers
      };
    },

    prepareMarkersByCountryData: function(countryItems) {
      return _.map(countryItems, function(countryItem) {
        countryItem = countryItem || {};

        var popupComponent = this.createPopupComponent(countryItem),
          popupContent = popupComponent.render().view.el;

        return {
          id: countryItem.id,
          lat: countryItem.lat,
          lng: countryItem.lng,
          popupContent: popupContent
        };
      }, this);
    },

    createPopupComponent: function(countryItem) {
      return new PopupComponent({
        type: 'ce-project',
        data: {
          id: countryItem.id,
          title: countryItem.title,
          badges: countryItem.badges,
          programme: countryItem.programme,
          action: countryItem.action,
          coordinator: countryItem.coordinator,
          startDate: countryItem.startDate,
          endDate: countryItem.endDate
        }
      });
    },

    toggleCountryExplanation: function(searchCriteria) {
      searchCriteria = searchCriteria || {};
      var hasCountryCriteria = !_.isEmpty(searchCriteria.countries);

      this.getCountryExplanationContainer().toggle(hasCountryCriteria);
    },

    getMapContainer: function() {
      return this.$el.find('.ce-results-map__map-container');
    },

    getCountryExplanationContainer: function() {
      return this.$el.find('.vlr-map__country-search-explanation');
    },

    render: function() {
      var html = Mustache.render(tpl);
      this.$el.append(html);
      this.getMapContainer().append(this.mapComponent.render().view.el);

      return this;
    }
  });
});