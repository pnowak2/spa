/* globals jQuery: true */
requirejs.config({
  waitSeconds: 10,
  paths: {
    app: '../app',
    jquery: '../lib/jquery/jquery.min',
    blockUI: '../lib/jquery-blockUI/jquery.blockUI.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone-min',
    mustache: '../lib/mustache.js/mustache.min',
    text: '../lib/text/text',
    select2: '../lib/select2/js/select2.full.min',
    rsvp: '../lib/rsvp/rsvp.min',
    modernizr: '../lib/modernizr/modernizr-custom.min',
    leaflet: '../lib/leaflet/leaflet',
    leafletprunecluster: '../lib/leaflet.prunecluster/dist/PruneCluster',
    leafletfullscreen: '../lib/leaflet.fullscreen/dist/Leaflet.fullscreen',
    leafleteasybutton: '../lib/leaflet.easybutton/dist/easy-button',
    chance: '../lib/chance/chance.min'
  },
  shim: {
    modernizr: {},
    leafletprunecluster: {
      deps: ['leaflet']
    },
    leafletfullscreen: {
      deps: ['leaflet']
    },
    leafleteasybutton: {
      deps: ['leaflet']
    }
  }
});

// http://www.manuel-strehl.de/dev/load_jquery_before_requirejs.en.html
define('jquery', [], function() {
  return jQuery;
});

define(function(require) {
  var Backbone = require('backbone'),
    modernizr = require('modernizr'),
    applicationModule = require('app/shared/modules/app.module'),
    LandingPage = require('app/eplus/components/landing-page/layout/main.component'),
    landingPage = new LandingPage();

  Backbone.history.start();
});