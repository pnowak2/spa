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
    pagerWidget = new PagerWidget({
      totalItems: 1000000,
      pageSize: 10,
      currentPage: 250,
      pageWindowSize: 15
    });

  pagerWidget.on('pager:page:selected', function(page) {
    console.log(page);
  });

  $('body').prepend(pagerWidget.render().view.el);
});