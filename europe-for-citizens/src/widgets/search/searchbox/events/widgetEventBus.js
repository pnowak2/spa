define(function (require) {
  var _ = require('underscore'),
    eventBus = require('app/core/eventBus');

  return _.create(eventBus);
});