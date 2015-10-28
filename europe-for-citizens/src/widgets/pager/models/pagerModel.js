define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore');

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

      if (options.currentPage > this.getPagesCount() ||
        options.currentPage < 0) {
        throw new Error('current page is beyond pages count');
      }
    },

    validate: function(attrs) {
      var pagesCount = this.getPagesCount();

      if (attrs.currentPage > pagesCount) {
        return 'current page cannot be bigger than total pages count';
      }

      if (attrs.currentPage < 0) {
        return 'current page cannot be smaller than zero';
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

    setCurrentPage: function(page) {
      this.set('currentPage', page, {
        validate: true
      });
    },

    setNextPage: function() {
      var nextPage = this.getCurrentPage() + 1;
      this.setCurrentPage(nextPage);
    },

    setFirstPage: function() {
      this.setCurrentPage(1);
    },

    setLastPage: function() {
      var lastPage = this.getPagesCount();
      this.setCurrentPage(lastPage);
    },

    getPagesCount: function() {
      return Math.ceil(this.getTotal() / this.getPageSize());
    }
  });
});