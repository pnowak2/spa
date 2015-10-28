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

      this.setCurrentPage(options.currentPage);
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
      var pagesCount = this.getPagesCount(),
        upperTrunc = _.min([page, pagesCount]),
        lowerTrunc = _.max([upperTrunc, 1]);

      this.set('currentPage', lowerTrunc);
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
      var attrs = this.constructor.__super__.toJSON.call(this),
        serialized = _.assign(attrs, {
          pagesCount: this.getPagesCount()
        });

      return serialized;
    }
  });
});