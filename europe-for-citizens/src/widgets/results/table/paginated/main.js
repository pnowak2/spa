define(function (require) {
  var _ = require('underscore'),
    app = require('app/app'),
    Widget = require('app/core/widget'),
    PaginatedView = require('./views/paginatedView'),
    TableResultsWidget = require('app/widgets/results/table/table/main'),
    PagerWidget = require('app/widgets/pager/main'),
    searchService = require('app/services/search/searchService'),
    router = require('app/routers/router');


  return Widget.extend({
    view: new PaginatedView,

    initialize: function () {
      _.bindAll(this, 'searchSuccessful', 'searchFailed');
      this.tableResultsWidget = new TableResultsWidget;
      this.pagerWidget = new PagerWidget;

      this.listenTo(this.pagerWidget, 'pager:page-request', this.requestPage);
    },

    requestSearch: function (searchCriteria) {
      this.pg = 1;
      this.cachedSearchCriteria = searchCriteria;

      searchService.searchByKeyword(
        {
          keyword: searchCriteria.keyword,
          page: 1,
          pageSize: 10
        },
        this.searchSuccessful,
        this.searchFailed
      );
    },

    requestPage: function (page) {
      this.pg = page;
      searchService.searchByKeyword(
        {
          keyword: this.cachedSearchCriteria.keyword,
          page: page,
          pageSize: 10
        },
        this.searchSuccessful,
        this.searchFailed
      );
    },

    searchSuccessful: function (data) {
      this.tableResultsWidget.dataReady(data);
      this.pagerWidget.dataReady({
        total: data.total,
        currentPage: this.pg
      });
    },

    searchFailed: function (errorMessage) {
      app.showError(errorMessage);
    },

    render: function () {
      this.view.render();

      var tableEl = this.tableResultsWidget.render().view.$el;
      var pagerEl = this.pagerWidget.render().view.$el;

      this.view.$el.find('.efc-results-paginated-table').html(tableEl);
      this.view.$el.find('.efc-results-paginated-pager').append(pagerEl);

      return this;
    }
  });
});