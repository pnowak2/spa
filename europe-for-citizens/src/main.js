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
  var Backbone = require('backbone'),
    app = require('app/app');

  Backbone.history.start();
});