define(function (require) {
  var $ = require('jquery');
  var ResultsListComponent = require('app/ce/components/landing-page/results/list/results-list/main.component');
  var SearchableListComponent = require('app/shared/components/lists/searchable-list/main.component');
  var searchService = require('./mock-search.service');

  var component = new SearchableListComponent({
        listComponent: new ResultsListComponent(),
        searchService: searchService,
        pagerConfig: {
          pageWindowSize: 3
        },
        pageStatsConfig: {
          visible: true
        }
  });

  component.onSearchRequest({});

  $('.demo__searchable-list').append(component.render().view.el);
});