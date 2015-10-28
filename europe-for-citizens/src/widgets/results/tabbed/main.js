define(function (require) {
  var Widget = require('app/core/widget'),
    TabSwitcherWidget = require('app/widgets/tab-switcher/main'),
    PaginatedResultsWidget = require('app/widgets/results/table/paginated/main'),
    MapResultsWidget = require('app/widgets/results/map/main'),
    TabbedResultsView = require('./views/tabbedResultsView'),
    tabbedResultsView = new TabbedResultsView;

  return Widget.extend({
    view: tabbedResultsView,

    initialize: function () {
      this.tabSwitcherWidget = new TabSwitcherWidget;
      this.mapResultsWidget = new MapResultsWidget;
      this.paginatedResultsWidget = new PaginatedResultsWidget;

      this.mapResultsWidget.hide();
      this.paginatedResultsWidget.hide();

      this.listenTo(this.tabSwitcherWidget, 'tab-switcher:selected', function (identifier) {
        if (identifier === 'list') {
          this.paginatedResultsWidget.show();
          this.mapResultsWidget.hide();
        } else if (identifier === 'map') {
          this.paginatedResultsWidget.hide();
          this.mapResultsWidget.show();
        }
      });

       this.listenTo(this.paginatedResultsWidget, 'results:actions:showmap', function (projectModel) {
         this.tabSwitcherWidget.selectTab('map');
         this.mapResultsWidget.showItem(projectModel);
       });

      this.tabSwitcherWidget.selectTab('list');
    },

    requestSearch: function (searchCriteria) {
      this.paginatedResultsWidget.requestSearch(searchCriteria);
    },

    render: function () {
      this.view.render();

      var tabSwitcherEl = this.tabSwitcherWidget.render().view.$el;
      var tableResultsEl = this.paginatedResultsWidget.render().view.$el;
      var mapResultsEl = this.mapResultsWidget.render().view.$el;

      this.view.$el.find('.efc-tabs-container').html(tabSwitcherEl);
      this.view.$el.find('.efc-results-data-container').append(tableResultsEl);
      this.view.$el.find('.efc-results-data-container').append(mapResultsEl);

      return this;
    }
  });
});