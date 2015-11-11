define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    PageModel = require('../models/page.model');

  return Backbone.Collection.extend({
    model: PageModel
  }, {
    create: function(pages, selectedPage) {
      if (!_.isArray(pages)) {
        throw new Error('pages is not an array');
      }

      var pageObjects = _.map(pages, function(page) {
        return {
          page: page,
          selected: (selectedPage === page)
        }
      }, this);

      return new this(pageObjects);
    }
  });
});