define(function(require) {
  var Backbone = require('backbone'),
    qs = require('qs'),
    Router = Backbone.Router.extend({
      routes: {
        'search/*criteria': 'onSearch'
      },

      onSearch: function(queryString) {
        var criteria = qs.parse(queryString);
        this.trigger('router:search', criteria);
      },

      update: function(criteria) {
        var queryString = qs.stringify(criteria, { arrayFormat: 'repeat' });
        this.navigate(queryString);
      }
    });

  return new Router();
});