define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    EventBus = function() {};

  _.extend(EventBus.prototype, Backbone.Events);

  return EventBus;
});