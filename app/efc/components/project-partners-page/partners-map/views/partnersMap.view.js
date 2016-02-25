define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
    PopupComponent = require('app/shared/components/mapping/popup/main.component'),
    projectPartnersService = require('../services/projectPartners.service');

  return Backbone.View.extend({
    className: 'efc-partners-map',

    initialize: function(criteria) {
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

    },

    render: function() {
      $('.efc-project-partners-container').append(this.mapComponent.render().view.el);

      return this;
    }
  });
});