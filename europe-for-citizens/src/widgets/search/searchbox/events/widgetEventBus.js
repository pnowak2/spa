define(function(require) {
  var _ = require('underscore'),
    EventBus = require('app/core/eventBus');

  return _.create(eventBus);
});