define(function(require) {
  var $ = require('jquery'),
    Component = require('app/core/component'),
    SearchComponent = require('app/efc/components/search/search-box/main.component'),
    PagedResultsListComponent = require('app/efc/components/results/paged-results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    AppView = require('./views/app.view');

  return Component.extend({
    initialize: function() {
      this.searchComponent = new SearchComponent;
      this.pagedResultsListComponent = new PagedResultsListComponent;
      this.tabSwitcherComponent = new TabSwitcherComponent;

      this.view = new AppView({
        tabSwitcherComponent: this.tabSwitcherComponent,
        pagedResultsListComponent: this.pagedResultsListComponent,
        searchComponent: this.searchComponent
      });
    }
  });
});