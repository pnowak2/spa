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

    validate: function() {

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
      var pagesCount = this.getPagesCount(),
        newCurrentPage = _.max([1, _.min([page, pagesCount])]);

      this.set('currentPage', newCurrentPage);

      return newCurrentPage;
    },

    setNextPage: function() {
      var pagesCount = this.getPagesCount(),
        nextPage = _.min([this.getCurrentPage() + 1, pagesCount]);

      this.set('currentPage', nextPage);

      return nextPage;
    },

    setFirstPage: function() {
      var firstPage = 1;
      this.set('currentPage', firstPage);

      return firstPage;
    },

    setLastPage: function() {
      var lastPage = this.getPagesCount();
      this.set('currentPage', lastPage);

      return lastPage;
    },

    getPagesCount: function() {
      return Math.ceil(this.getTotal() / this.getPageSize());
    }
  });
});