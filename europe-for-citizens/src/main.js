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

define(function (require) {
  var app = require('app/app'),
    Backbone = require('backbone'),
    Router = require('app/routers/router'),
    ApplicationWidget = require('app/widgets/application/main'),
    applicationWidget,
    router;

  applicationWidget = new ApplicationWidget().render();

  router = new Router()
  Backbone.history.start();
});