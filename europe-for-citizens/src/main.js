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
    pagerWidget = new PagerWidget,
    searchWidget = new SearchWidget,
    tabSwitcherWidget = new TabSwitcherWidget({
      configuration: [{
        title: 'List',
        identifier: 'list',
        targetSelector: '.efc-searchbox'
      }, {
        title: 'Map',
        identifier: 'map',
        targetSelector: '.efc-pager'
      }]
    });

  pagerWidget.on('pager:page:selected', function(page) {
    console.log(page);
  });

  searchWidget.on('search:keyword', function(searchCriteria) {
    pagerWidget.updateState({
      totalItems: parseInt(searchCriteria.keyword, 10)
    });
  });

  $('body').prepend(pagerWidget.render().view.el);
  $('body').prepend(searchWidget.render().view.el);
  $('body').prepend(tabSwitcherWidget.render().view.el);
});