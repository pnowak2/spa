define(function(require) {
  var $ = require('jquery'),
    Component = require('app/core/component'),
    SearchComponent = require('app/efc/components/search/search-box/main.component'),
    PagedResultsListComponent = require('app/efc/components/results/list/paged-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    AppView = require('./views/app.view');

  return Component.extend({
    initialize: function() {
      this.searchComponent = new SearchComponent;
      this.tabSwitcherComponent = new TabSwitcherComponent;
      this.pagedResultsListComponent = new PagedResultsListComponent({
        pageSize: 15,
        pageWindowSize: 9
      });

      this.view = new AppView({
        searchComponent: this.searchComponent,
        tabSwitcherComponent: this.tabSwitcherComponent,
        pagedResultsListComponent: this.pagedResultsListComponent
      });
    }
  });
});