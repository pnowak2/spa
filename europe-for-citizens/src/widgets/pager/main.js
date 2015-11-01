define(function(require) {
  var Widget = require('app/core/widget'),
    PagerModel = require('./models/pagerModel'),
    PagerView = require('./views/pagerView'),
    eventBus = require('./events/eventBus');

  return Widget.extend({
    initialize: function(attrs) {
      var model = this.model = new PagerModel(attrs);
      this.view = new PagerView({
        model: model
      });

      this.listenTo(eventBus, 'pager:page:selected', function(page) {
        this.trigger('pager:page:selected', page);
      });
    },

    getState: function() {
      return this.model.toJSON();
    }
  });
});