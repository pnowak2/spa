define(function(require) {
  var Backbone = require('backbone'),
    EventBus = require('app/core/eventBus');

  describe('Event Bus', function() {
    describe('type', function() {
      it('should be function', function() {
        expect(EventBus).toEqual(jasmine.any(Function));
      });
    });

    describe('creation', function() {
      it('should be possible to create with new', function() {
        var vent = new EventBus;

        expect(vent).toEqual(jasmine.any(EventBus));
      });
    });

    describe('api', function() {
      it('should have backbone events mixed in', function() {
        var eventBusKeys = _.keys(EventBus.prototype),
          backboneEventKeys = _.keys(Backbone.Events);

        _.each(backboneEventKeys, function(backboneEventKey) {
          expect(eventBusKeys).toContain(backboneEventKey);
        });
      });
    });
  });
});