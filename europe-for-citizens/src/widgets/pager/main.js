define(function(require) {
  var Widget = require('app/core/widget'),
    PagerModel = require('./models/pagerModel'),
    PagerView = require('./views/pagerView');

  return Widget.extend({
    initialize: function(attrs) {
      var model = this.model = new PagerModel(attrs);
      this.view = new PagerView({
        model: model
      });

      this.listenTo(this.view, 'pager:page:selected', function(page) {
        this.trigger('pager:page:selected', page);
      });
    },

    getState: function() {
      return this.model.toJSON();
    }
  });
});