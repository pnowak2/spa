define(function (require) {
  var Widget = require('app/core/widget'),
    widgetEventBus = require('./events/widgetEventBus'),
    PagerModel = require('./models/pagerModel'),
    PagerView = require('./views/pagerView');

  return Widget.extend({
    initialize: function (options) {
      var pagerModel = new PagerModel(options);

      this.view = new PagerView({
        model: pagerModel
      });

      this.listenTo(widgetEventBus, 'pager:page-request', function (pageModel) {
        this.trigger('pager:page-request', pageModel.get('page'));
      });
    },

    dataReady: function (data) {
      this.view.dataReady(data);
    },

    render: function () {
      this.view.render();

      return this;
    }
  });
});