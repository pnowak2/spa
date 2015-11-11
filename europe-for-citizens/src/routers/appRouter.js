define(function(require) {
  var Backbone = require('backbone'),
    Router = Backbone.Router.extend({
      routes: {
        'search/:keyword': 'keywordSearch'
      },

      keywordSearch: function(keyword) {
        this.app.trigger('app:route:search', keyword);
      }
    });

  return Router;
});