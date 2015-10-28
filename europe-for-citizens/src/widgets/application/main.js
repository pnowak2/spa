define(function (require) {
  var $ = require('jquery'),
    app = require('app/app'),
    Widget = require('app/core/widget'),
    TabbedResultsWidget = require('app/widgets/results/tabbed/main'),
    SearchboxWidget = require('app/widgets/search/searchbox/main');

  return Widget.extend({
    initialize: function () {
      this.searchboxWidget = new SearchboxWidget;
      this.tabbedResultsWidget = new TabbedResultsWidget;

      this.listenTo(this.searchboxWidget, 'searchbox:keyword', this.didPerformSearch);
    },

    didPerformSearch: function (searchCriteria) {
      this.tabbedResultsWidget.requestSearch(searchCriteria);
    },

    render: function () {
      $('.efc-searchbox-container').html(this.searchboxWidget.render().view.$el);
      $('.efc-results-container').html(this.tabbedResultsWidget.render().view.$el);

      return this;
    }
  });
});