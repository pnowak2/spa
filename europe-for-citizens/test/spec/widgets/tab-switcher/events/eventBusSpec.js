define(function(require) {

  var eventBus = require('app/widgets/tab-switcher/events/eventBus'),
    EventBus = require('app/core/eventBus');

  describe('Pager Event Bus', function() {
    it('should be defined', function() {
      expect(eventBus).toEqual(jasmine.any(EventBus));
    });
  });
});