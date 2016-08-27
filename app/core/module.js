define(function(require) {
  var _ = require('underscore'),
    Event = require('./event'),
    utils = require('./utils');

  var Module = function() {
    this.initialize.apply(this, arguments);
  };

  _.extend(Module.prototype, Event.prototype, {
    initialize: function() {}
  });

  Module.extend = utils.extend;

  return Module;
});