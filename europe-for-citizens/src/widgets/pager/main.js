define(function(require) {
  var Widget = require('app/core/widget'),
    PagerModel = require('./models/pagerModel'),
    PagerView = require('./views/pagerView');

  return Widget.extend({
    initialize: function(options) {
      var model = this.model = new PagerModel(options);
      this.view = new PagerView({
        model: model
      });
    },

    getState: function() {
      return this.model.toJSON();
    },

    refresh: function() {

    }
  });
});