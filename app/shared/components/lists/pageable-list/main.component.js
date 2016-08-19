define(function(require) {
  var Component = require('app/core/component'),
    PageableListView = require('./views/pageableList.view');

  return Component.extend({
    initialize: function(options) {
      this.view = new PageableListView(options);
    },

    onSearchRequest: function(searchCriteria) {
      this.view.onSearchRequest(searchCriteria);
    }
  });
});