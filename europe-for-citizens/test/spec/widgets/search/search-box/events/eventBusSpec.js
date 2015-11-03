define(function(require) {
  var eventBus = require('app/widgets/search/search-box/events/eventBus'),
    EventBus = require('app/core/eventBus');

  describe('SearchBox Event Bus', function() {
    it('should be defined', function() {
      expect(eventBus).toEqual(jasmine.any(EventBus));
    });
  });
});