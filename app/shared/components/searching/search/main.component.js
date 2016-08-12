define(function(require) {
  var Component = require('app/core/component'),
    SearchView = require('./views/search.view');

  return Component.extend({
    initialize: function(options) {
      options = options || {};

      this.view = new SearchView(options);

      this.listenTo(this.view, 'search:search', function(criteria) {
        this.trigger('search:search', criteria);
      });
    },

    update: function(criteria) {
      this.view.update(criteria);
    }
  });
});