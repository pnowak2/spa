define(function(require) {
  var Widget = require('app/core/widget'),
    PagerModel = require('./models/pagerModel'),
    PagerView = require('./views/pagerView');

  return Widget.extend({
    initialize: function(attrs) {
      this.view = new PagerView({
        model: new PagerModel(attrs)
      });

      this.listenTo(this.view, 'pager:page:selected', function(page) {
        this.trigger('pager:page:selected', page);
      });
    },

    getState: function() {
      return this.view.model.toJSON();
    },

    updateState: function(state) {
      this.view.model.update(state);
    }
  });
});