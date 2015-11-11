define(function(require) {
  var Backbone = require('backbone'),
    Router = Backbone.Router.extend({
      routes: {
        'search/:keyword': 'keywordSearch'
      },

      keywordSearch: function(keyword) {
        this.trigger('routed', 'app:route:search:keyword', keyword);
      }
    });

  return Router;
});