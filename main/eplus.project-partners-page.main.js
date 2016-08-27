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

define(function(require) {
  var Backbone = require('backbone'),
    modernizr = require('modernizr'),
    module = require('module'),
    applicationModule = require('app/shared/modules/app.module'),
    EplusProjectPartnersPage = require('app/eplus/components/project-partners-page/partners-map/main.component'),
    eplusProjectPartnersPage = new EplusProjectPartnersPage(module.config());

  Backbone.history.start();
});