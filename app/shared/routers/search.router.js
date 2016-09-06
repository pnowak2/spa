define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    qs = require('qs'),
    Router = Backbone.Router.extend({
      routes: {
        'search/*criteria': 'onSearch'
      },

      onSearch: function(queryString) {
        var criteria = qs.parse(queryString);
        this.trigger('router:search', _.pick(criteria, 'keyword'));
      },

      updateUrl: function(criteria) {
        var queryString = qs.stringify(
          _.pick(criteria, 'keyword'), {
            arrayFormat: 'repeat'
          }
        );
        this.navigate('search/' + queryString);
      }
    });

  return new Router();
});