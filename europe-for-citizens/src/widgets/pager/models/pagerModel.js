define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore');

  return Backbone.Model.extend({
    defaults: {
      totalItems: 0,
      pageSize: 10,
      currentPage: 1
    },

    initialize: function(options) {
      if (options.pageSize === 0) {
        throw new Error('page size cannot be zero');
      }

      if (options.totalItems < 0) {
        throw new Error('total items cannot be negative');
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

      if (attrs.currentPage < 1) {
        return 'current page cannot be smaller than zero';
      }
    },

    getTotalItems: function() {
      return this.get('totalItems');
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

    nextPage: function() {
      var nextPage = this.getCurrentPage() + 1;
      this.setCurrentPage(nextPage);
    },

    previousPage: function() {
      var previousPage = this.getCurrentPage() - 1;
      this.setCurrentPage(previousPage);
    },

    firstPage: function() {
      this.setCurrentPage(1);
    },

    lastPage: function() {
      var lastPage = this.getPagesCount();
      this.setCurrentPage(lastPage);
    },

    getPagesCount: function() {
      var pagesCount = Math.ceil(this.getTotalItems() / this.getPageSize());
      return _.max([pagesCount, 1]);
    },

    toJSON: function() {
      var serialized = _.assign(this.constructor.__super__.toJSON.call(this), {
        pagesCount: this.getPagesCount()
      });

      return serialized;
    }
  });
});