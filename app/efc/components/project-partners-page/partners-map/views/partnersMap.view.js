define(function(require) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component'),
    projectPartnersService = require('../services/projectPartners.service');

  return Backbone.View.extend({
    className: 'efc-partners-map',

    initialize: function(criteria) {
      _.bindAll(this, 'didFindSucceed', 'didFindFail');

      this.mapComponent = new MapComponent;

      this.render();
      this.mapComponent.initMap();
      this.requestInitialSearch(criteria);
    },

    requestInitialSearch: function(criteria) {
      this.onFindRequest(criteria);
    },

    onFindRequest: function(criteria) {
      projectPartnersService.find(criteria)
        .then(this.didFindSucceed)
        .catch(this.didFindFail);
    },

    didFindSucceed: function(data) {
      data = data || {};

      var markers = this.prepareMarkersData(data);
      this.mapComponent.showMarkers(markers);
    },

    didFindFail: function(error) {
      app.showError(error);
    },

    prepareMarkersData: function(data) {
      data = data || {};

      var total = data.total,
        coordinatorGroup = _.map([data.coordinator], function(coordinator) {
          return this.toMapMarker(coordinator, 'blue');
        }, this),
        partnersGroup = _.map(data.partners, function(partner) {
          return this.toMapMarker(partner);
        }, this),
        markers = [coordinatorGroup, partnersGroup];

      return {
        total: total,
        markers: markers
      }
    },

    toMapMarker: function(markerData, color) {
      markerData = markerData || {};

      var popupComponent = new PopupComponent({
          type: 'organisation',
          data: markerData
        }),
        popupContent = popupComponent.render().view.el;

      return {
        lat: markerData.lat,
        lng: markerData.lng,
        color: color,
        popupContent: popupContent
      }
    },

    render: function() {
      $('.efc-project-partners-container').append(this.mapComponent.render().view.el);

      return this;
    }
  });
});