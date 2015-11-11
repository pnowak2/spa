define(function(require) {
  var Component = require('app/core/component'),
    SearchBoxView = require('./views/searchBox.view');

  return Component.extend({
    initialize: function() {
      this.view = new SearchBoxView;

      this.listenTo(this.view, 'search:keyword', function(searchCriteria) {
        this.trigger('search:keyword', searchCriteria);
      });
    }
  });
});