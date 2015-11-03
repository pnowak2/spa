define(function(require) {
  var Widget = require('app/core/widget'),
    eventBus = require('./events/eventBus'),
    SearchBoxView = require('./views/searchBoxView');

  return Widget.extend({
    initialize: function() {
      this.view = new SearchBoxView;

      this.listenTo(eventBus, 'search:keyword', function(searchCriteria) {
        this.trigger('search:keyword', searchCriteria);
      });
    }
  });
});