define(function(require) {
  var Backbone = require('backbone'),
    PageModel = require('../models/pageModel');

  return Backbone.View.extend({
    tagName: 'a',

    attributes: {
      href: '#'
    },

    events: {
      'click': 'didClickPage'
    },

    initialize: function(attrs) {
      if (!(this.model instanceof PageModel)) {
        throw new Error('model is not of correct type');
      }
    },

    didClickPage: function() {

    },

    render: function() {
      return this;
    }
  });
});