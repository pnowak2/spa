define(function(require) {
  var Widget = require('app/core/widget'),
    widgetEventBus = require('./events/widgetEventBus'),
    SearchboxView = require('./views/searchboxView'),
    searchboxView = new SearchboxView;

  return Widget.extend({

    view: searchboxView,

    initialize: function() {
      this.listenTo(widgetEventBus, 'searchbox:keyword', function(searchCriteria) {
        this.trigger('searchbox:keyword', searchCriteria);
      });
    }
  });
});