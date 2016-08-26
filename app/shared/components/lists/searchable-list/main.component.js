define(function(require) {
  var Component = require('app/core/component'),
    SearchableListView = require('./views/searchableList.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new SearchableListView(options);
      this.listenTo(this.view, 'search:completed', function(data) {
        this.trigger('search:completed', data);
      });
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});