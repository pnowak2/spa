requirejs.config({
  waitSeconds: 10,
  paths: {
    app: '.',
    jquery: '../../lib/jquery/dist/jquery.min',
    underscore: '../../lib/underscore/underscore-min',
    backbone: '../../lib/backbone/backbone-min',
    mustache: '../../lib/mustache.js/mustache.min',
    text: '../../lib/text/text',
    rsvp: '../../lib/rsvp/rsvp.min'
  }
});

define(function(require) {
  var $ = require('jquery'),
    PagerWidget = require('app/widgets/pager/main'),
    SearchWidget = require('app/widgets/search/search-box/main'),
    TabSwitcherWidget = require('app/widgets/tab-switcher/main'),
    ResultsListWidget = require('app/widgets/results/results-list/main'),

    pagerWidget = new PagerWidget,
    searchWidget = new SearchWidget,
    tabSwitcherWidget = new TabSwitcherWidget({
      tabDescriptors: [{
        title: 'List',
        identifier: 'list',
        targetSelector: '.efc-searchbox'
      }, {
        title: 'Map',
        identifier: 'map',
        targetSelector: '.efc-pager'
      }, {
        title: 'ffsd',
        identifier: 'mafsp',
        targetSelector: '.efc-pagerfsd'
      }]
    }),
    resultsListWidget = new ResultsListWidget;

  pagerWidget.on('pager:page:selected', function(pagerStatus) {
    console.log(pagerStatus)
  });

  searchWidget.on('search:keyword', function(searchCriteria) {
    pagerWidget.updateState({
      totalItems: parseInt(searchCriteria.keyword, 10)
    });

    resultsListWidget.update([{
      id: '52',
      title: searchCriteria.keyword,
      description: 'Mapping platform',
      startYear: '2015',
      countries: ['pl', 'lu']
    }, {
      id: '64',
      title: 'Maping platform',
      description: 'To be implemented',
      startYear: '2016',
      countries: ['pl']
    }])
  });

  $('body').prepend(resultsListWidget.render().view.el);
  $('body').prepend(pagerWidget.render().view.el);
  $('body').prepend(searchWidget.render().view.el);
  $('body').prepend(tabSwitcherWidget.render().view.el);
});