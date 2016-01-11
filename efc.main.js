requirejs.config({
  waitSeconds: 10,
  paths: {
    app: './app',
    jquery: 'lib/jquery/jquery.min',
    blockUI: 'lib/jquery-blockUI/jquery.blockUI.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text',
    select2: 'lib/select2/js/select2.full.min',
    rsvp: 'lib/rsvp/rsvp.min',
    modernizr: 'lib/modernizr/modernizr-custom.min',
    leaflet: 'lib/leaflet/leaflet',
    leafletmarkercluster: 'lib/leaflet.markercluster/dist/leaflet.markercluster',
    leafletfullscreen: 'lib/leaflet.fullscreen/dist/leaflet.fullscreen'
  },
  shim: {
    modernizr: {},
    leafletmarkercluster: {
      deps: ['leaflet']
    },
    leafletfullscreen: {
      deps: ['leaflet']
    }
  }
});

define(function(require) {
  var Backbone = require('backbone'),
    modernizr = require('modernizr'),
    app = require('app/app.module'),
    EFCComponent = require('app/efc/components/app/main.component'),
    efcComponent = new EFCComponent;

  efcComponent.render();

  Backbone.history.start();
});