requirejs.config({
  waitSeconds: 10,
  paths: {
    app: '.',
    jquery: '../../lib/jquery/dist/jquery.min',
    underscore: '../../lib/underscore/underscore-min',
    backbone: '../../lib/backbone/backbone-min',
    mustache: '../../lib/mustache.js/mustache.min',
    text: '../../lib/text/text'
  }
});

define(function(require) {
  var $ = require('jquery'),
    PagerWidget = require('app/widgets/pager/main'),
    SearchWidget = require('app/widgets/search/search-box/main'),
    pagerWidget = new PagerWidget,
    searchWidget = new SearchWidget;

  pagerWidget.updateState({
    totalItems: 15454,
    currentPage: 99
  });

  pagerWidget.on('pager:page:selected', function(page) {
    console.log(page);
  });

  searchWidget.on('search:keyword', function(searchCriteria) {
    console.log(searchCriteria);
  });

  $('body').prepend(pagerWidget.render().view.el);
  $('body').prepend(searchWidget.render().view.el);
});