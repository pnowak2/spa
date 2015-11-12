requirejs.config({
  waitSeconds: 10,
  paths: {
    app: './app',
    jquery: 'lib/jquery/dist/jquery.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text',
    rsvp: 'lib/rsvp/rsvp.min'
  }
});

define(function(require) {
  var Backbone = require('backbone'),
    app = require('app/app.module'),
    EFC = require('app/efc/components/app/main.component'),
    efc = new EFC;

  efc.render();

  Backbone.history.start();
});