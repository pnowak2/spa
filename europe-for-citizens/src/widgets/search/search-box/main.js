define(function(require) {
  var Widget = require('app/core/widget'),
    SearchBoxView = require('./views/searchBox.view');

  return Widget.extend({
    initialize: function() {
      this.view = new SearchBoxView;

      this.listenTo(this.view, 'search:keyword', function(searchCriteria) {
        this.trigger('search:keyword', searchCriteria);
      });
    }
  });
});