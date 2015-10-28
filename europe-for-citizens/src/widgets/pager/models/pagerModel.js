define(function(require) {
  var Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      total: 0,
      pageSize: 10,
      currentPage: 1
    },

    initialize: function(options) {
      if (options.pageSize === 0) {
        throw new Error('page size cannot be zero');
      }
    },

    getTotal: function() {
      return this.get('total');
    },

    getPageSize: function() {
      return this.get('pageSize');
    },

    getCurrentPage: function() {
      return this.get('currentPage');
    },

    nextPage: function() {
      return this.getCurrentPage() + 1;
    },

    getPages: function() {
      return Math.ceil(this.getTotal() / this.getPageSize());
    }
  });
});