define(function(require) {
  var Component = require('app/core/component'),
    SearchView = require('./views/search.view');

  return Component.extend({
    initialize: function(data) {
      this.view = new SearchView(data);
    }
  });
});