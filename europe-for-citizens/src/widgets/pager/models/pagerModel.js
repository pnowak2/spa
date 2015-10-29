define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore');

  return Backbone.Model.extend({
    defaults: {
      totalItems: 0,
      pageSize: 10,
      currentPage: 1,
      pageWindowSize: 5
    },

    initialize: function(attributes) {
      var attrs = _.defaults({}, attributes),
        numericalAttrs = _.pick(attrs, 'totalItems', 'pageSize', 'currentPage', 'pageWindowSize');

      _.each(numericalAttrs, function(value) {
        if (!_.isNumber(value)) {
          throw new Error('attribute should be numerical');
        }
      });

      if (attrs.pageSize <= 0) {
        throw new Error('page size cannot be zero or negative');
      }

      if (attrs.totalItems < 0) {
        throw new Error('total items cannot be negative');
      }

      if (attrs.pageWindowSize <= 0) {
        throw new Error('page window cannot be zero or negative');
      }

      this.setCurrentPage(attrs.currentPage);
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

    getPageWindowSize: function() {
      var pagesCount = this.getPagesCount(),
        pageWindowSize = this.get('pageWindowSize'),
        upperTrunc = _.min([pageWindowSize, pagesCount]);

      return upperTrunc;
    },

    getPagedWindow: function() {
      var pageWindowSize = this.getPageWindowSize(),
        leftPageWindowSize,
        rightPageWindowSize,
        pagesCount = this.getPagesCount(),
        currentPage = this.getCurrentPage(),
        startPage,
        endPage;

      if (pageWindowSize % 2 === 0) {
        // nonsymetrical pager (...*....)
        leftPageWindowSize = (pageWindowSize / 2) - 1;
        rightPageWindowSize = leftPageWindowSize + 1
      } else {
        // symmetrical pager (...*...)
        leftPageWindowSize = rightPageWindowSize = Math.floor(pageWindowSize / 2);
      }

      if (currentPage <= leftPageWindowSize) {
        // start
        startPage = 1;
        endPage = pageWindowSize;
      } else if (currentPage > (pagesCount - rightPageWindowSize)) {
        // end
        startPage = pagesCount - pageWindowSize + 1;
        endPage = pagesCount;
      } else {
        // middle
        startPage = currentPage - leftPageWindowSize;
        endPage = currentPage + rightPageWindowSize;
      }

      return _.range(startPage, endPage + 1);
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

    isFirstPageSelected: function() {
      return this.getCurrentPage() === 1;
    },

    isLastPageSelected: function() {
      return this.getCurrentPage() === this.getPagesCount();
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