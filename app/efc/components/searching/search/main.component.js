define(function(require) {
  var Component = require('app/core/component'),
    SearchView = require('./views/search.view');

  return Component.extend({
    initialize: function() {
      this.view = new SearchView;
    }
  });
});