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
      totalItems: 50,
      pageWindowSize: 3
    });

  pagerWidget.on('pager:page:selected', function(page) {
    console.log(page);
  });

  $('body').prepend(pagerWidget.render().view.el);
});