define(function(require) {
  var Backbone = require('backbone'),
    Event = require('app/core/event');

  describe('Event Bus - PubSub object', function() {
    describe('type', function() {
      it('should be function', function() {
        expect(Event).toEqual(jasmine.any(Function));
      });
    });

    describe('creation', function() {
      it('should be possible to create with new', function() {
        var vent = new Event;

        expect(vent).toEqual(jasmine.any(Event));
      });
    });

    describe('api', function() {
      it('should have backbone events mixed in', function() {
        var eventKeys = _.keys(Event.prototype),
          backboneEventKeys = _.keys(Backbone.Events);

        _.each(backboneEventKeys, function(backboneEventKey) {
          expect(eventKeys).toContain(backboneEventKey);
        });
      });
    });
  });
});