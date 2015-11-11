define(function(require) {
  var $ = require('jquery'),
    Component = require('app/core/component'),
    TabSwitcherComponent = require('app/widgets/tab-switcher/main.component'),
    SearchComponent = require('app/widgets/search/search-box/main.component'),
    ResultsListComponent = require('app/widgets/results/results-list/main.component'),
    PagerComponent = require('app/widgets/pager/main.component'),
    AppView = require('./views/app.view');

  return Component.extend({
    initialize: function() {
      this.view = new AppView;
      this.tabSwitcherComponent = new TabSwitcherComponent;
      this.searchComponent = new SearchComponent;
      this.listComponent = new ResultsListComponent;
      this.pagerComponent = new PagerComponent;

      this.render();
    },

    render: function() {

    }
  });
});