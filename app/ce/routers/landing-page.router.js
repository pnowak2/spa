define(function(require) {
  var Backbone = require('backbone'),
    Router = Backbone.Router.extend({
      routes: {
        'ce/keyword/:keyword': 'keywordSearch'
      },

      keywordSearch: function(keyword) {
        this.trigger('route:search:keyword', keyword);
      }
    });

  return new Router();
});