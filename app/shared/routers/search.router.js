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

      updateUrl: function(criteria) {
        var queryString = qs.stringify(criteria, { arrayFormat: 'repeat' });
        this.navigate('search/' + queryString);
      }
    });

  return new Router();
});