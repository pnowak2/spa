define(function(require) {
  var $ = require('jquery'),
    Component = require('app/core/component'),
    AppView = require('./views/app.view'),
    SearchComponent = require('app/efc/components/search/search-box/main.component'),
    ResultsListComponent = require('app/efc/components/results/results-list/main.component'),
    TabSwitcherComponent = require('app/shared/components/tab-switcher/main.component'),
    PagerComponent = require('app/shared/components/pager/main.component');

  return Component.extend({
    initialize: function() {
      this.view = new AppView({
        tabSwitcherComponent: new TabSwitcherComponent,
        searchComponent: new SearchComponent,
        listComponent: new ResultsListComponent,
        pagerComponent: new PagerComponent
      });
    }
  });
});