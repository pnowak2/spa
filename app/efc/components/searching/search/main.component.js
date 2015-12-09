define(function(require) {
  var Component = require('app/core/component'),
    SearchView = require('./views/search.view');

  return Component.extend({
    initialize: function() {
      this.view = new SearchView;

      this.listenTo(this.view, 'search:search', function(criteria) {
        this.trigger('search:search', criteria);
      });
    }
  });
});