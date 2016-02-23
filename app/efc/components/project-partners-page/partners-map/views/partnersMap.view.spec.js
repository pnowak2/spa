define(function(require) {
  var Backbone = require('backbone'),
    PartnersMapView = require('./partnersMap.view');

  describe('Partners Map View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PartnersMapView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });
  });

});