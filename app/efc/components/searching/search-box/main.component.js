define(function(require) {
  var Component = require('app/core/component'),
    SearchBoxView = require('./views/searchBox.view');

  return Component.extend({
    initialize: function() {
      this.view = new SearchBoxView;

      this.listenTo(this.view, 'search-box:search', function(searchCriteria) {
        this.trigger('search-box:search', searchCriteria);
      });

      this.listenTo(this.view, 'search-box:more', function() {
        this.trigger('search-box:more');
      });
    }
  });
});