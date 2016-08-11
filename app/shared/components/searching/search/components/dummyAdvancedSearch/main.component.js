define(function(require) {
  var Backbone = require('backbone'),
  Component = require('app/core/component');

  return Component.extend({
    view: new(Backbone.View.extend()),
    getCriteria: function() {},
    hasSelections: function() {}
  });
});