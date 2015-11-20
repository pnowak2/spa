define(function(require) {
  var Component = require('app/core/component'),
    SearchView = require('./views/search.view');

  return Component.extend({
    initialize: function(data) {
      this.view = new SearchView(data);

      this.listenTo(this.view, 'search:search', function(criteria) {
        this.trigger('search:search', criteria);
      });
    }
  });
});