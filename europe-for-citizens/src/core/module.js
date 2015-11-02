define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    utils = require('./utils');

  var Module = function() {
    this.initialize.apply(this, arguments);
  }

  _.extend(Module.prototype, Backbone.Events, {
    initialize: function() {}
  });

  Module.extend = utils.extend;

  return Module;
});