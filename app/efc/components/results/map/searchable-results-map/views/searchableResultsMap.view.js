define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    app = require('app/app.module'),
    MapComponent = require('app/efc/components/mapping/map/main.component'),
    searchService = require('../services/search/search.service'),
    ProjectPopupComponent = require('app/efc/components/mapping/popups/project/main.component'),
    markersDataSource = require('../services/search/data/markers');

  return Backbone.View.extend({
    className: 'efc-searchable-results-map',

    initialize: function() {
      _.bindAll(this, 'didSearchSucceed', 'didSearchFail');
      this.mapComponent = new MapComponent;
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

      return _.map(data.items, function(item) {
        var popupComponent = new ProjectPopupComponent({
            popupData: {
              id: item.id,
              title: item.title,
              description: item.description,
              activity: item.activity,
              coordinator: item.coordinator
            }
          }),
          popupContent = popupComponent.render().view.$el.html();

        return {
          lat: item.lat,
          lng: item.lng,
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