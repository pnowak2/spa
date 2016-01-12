define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/app.module'),
    MapComponent = require('app/efc/components/mapping/map/main.component'),
    searchService = require('../services/search/search.service'),
    ProjectPopupComponent = require('app/efc/components/mapping/popups/project/main.component');

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

    prepareMarkerData: function(dataItem) {
      dataItem = dataItem || {};

      var popupComponent = new ProjectPopupComponent({
          popupData: {
            id: dataItem.id,
            title: dataItem.title,
            description: dataItem.description,
            activity: dataItem.activity,
            coordinator: dataItem.coordinator
          }
        }),
        popupContent = popupComponent.render().view.el;

      return {
        lat: dataItem.lat,
        lng: dataItem.lng,
        popupContent: popupContent
      }
    },

    prepareMarkersData: function(data) {
      data = data || {};
      return _.map(data.items, this.prepareMarkerData);
    },

    render: function() {
      this.$el.append(this.mapComponent.render().view.el);

      return this;
    }
  });
});