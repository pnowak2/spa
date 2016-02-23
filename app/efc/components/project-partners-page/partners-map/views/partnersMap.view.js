define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    MapComponent = require('app/shared/components/mapping/map/main.component'),
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
      this.onSearchRequest(criteria);
    },

    onSearchRequest: function(criteria) {

    },

    render: function() {
      $('.efc-project-partners-container').append(this.mapComponent.render().view.el);

      return this;
    }
  });
});