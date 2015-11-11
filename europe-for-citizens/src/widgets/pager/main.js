define(function(require) {
  var Component = require('app/core/component'),
    PagerModel = require('./models/pager.model'),
    PagerView = require('./views/pager.view');

  return Component.extend({
    initialize: function(attrs) {
      this.view = new PagerView({
        model: new PagerModel(attrs)
      });

      this.listenTo(this.view, 'pager:page:selected', function(pagerDetails) {
        this.trigger('pager:page:selected', pagerDetails);
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