define(function (require) {
  var Widget = require('app/core/widget'),
    TableView = require('./views/tableView'),
    widgetEventBus = require('./events/widgetEventBus');

  return Widget.extend({
    view: new TableView,

    initialize: function () {
      this.listenTo(widgetEventBus, 'results:actions:showmap', function (item) {
        this.trigger('results:actions:showmap', item);
      });
    },

    dataReady: function (data) {
      this.view.dataReady(data.items);
    }
  });
});