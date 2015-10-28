define(function (require) {
  var eventBus = require('app/core/eventBus'),
    _ = require('underscore');

  return _.create(eventBus);
});