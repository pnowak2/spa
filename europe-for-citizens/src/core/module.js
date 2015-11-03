define(function(require) {
  var _ = require('underscore'),
    EventBus = require('./eventBus'),
    utils = require('./utils');

  var Module = function() {
    this.initialize.apply(this, arguments);
  }

  _.extend(Module.prototype, EventBus.prototype, {
    initialize: function() {}
  });

  Module.extend = utils.extend;

  return Module;
});