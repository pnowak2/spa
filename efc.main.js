requirejs.config({
  waitSeconds: 10,
  paths: {
    app: './app',
    jquery: 'lib/jquery/dist/jquery.min',
    blockUI: 'lib/jquery-blockUI/jquery.blockUI.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text',
    select2: 'lib/select2/js/select2.full.min',
    popover: 'lib/jquery-webui-popover/jquery.webui-popover.min',
    rsvp: 'lib/rsvp/rsvp.min'
  },
  shim: {
    'popover': {
      deps: ['jquery']
    }
  }
});

define(function(require) {
  var Backbone = require('backbone'),
    app = require('app/app.module'),
    EFCComponent = require('app/efc/components/app/main.component'),
    efcComponent = new EFCComponent;

  efcComponent.render();

  Backbone.history.start();
});