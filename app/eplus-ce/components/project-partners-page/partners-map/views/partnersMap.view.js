define(function(require) {
  var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    app = require('app/shared/modules/app.module'),
    PartnersMapComponent = require('app/shared/components/mapping/partners-map/main.component'),
    projectPartnersService = require('../services/projectPartners.service');

  return Backbone.View.extend({
    className: 'efc-partners-map',

    initialize: function(criteria) {
      _.bindAll(this, 'didFindSucceed', 'didFindFail');

      this.partnersMapComponent = new PartnersMapComponent;
      this.render();

      this.partnersMapComponent.initMap();
      this.requestInitialSearch(criteria);
    },

    requestInitialSearch: function (criteria) {
      projectPartnersService.find(criteria)
        .then(this.didFindSucceed)
        .catch(this.didFindFail)
    },

    didFindSucceed: function(data) {
      this.partnersMapComponent.showMarkers(data);
    },

    didFindFail: function(error) {
      app.showError(error);
    },

    render: function() {
      $('.efc-project-partners-container').append(this.partnersMapComponent.render().view.el);

      return this;
    }
  });
});