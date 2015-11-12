define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    Event = function() {};

  _.extend(Event.prototype, Backbone.Events);

  return Event;
});