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
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PagerView = require('app/widgets/pager/views/pagerView'),
    pagerView = new PagerView({
      model: new PagerModel({
        totalItems: 100,
        pageSize: 10,
        currentPage: 1
      })
    }),

    pagerView2 = new PagerView({
      model: new PagerModel({
        totalItems: 1000,
        pageSize: 4,
        currentPage: 6,
        pageWindowSize: 3
      })
    });

  $('body').prepend(pagerView2.render().el);
  $('body').prepend(pagerView.render().el);
});