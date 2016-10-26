requirejs.config({
  waitSeconds: 10,
  paths: {
    app: '../../app',
    jquery: '../../lib/jquery/jquery.min',
    blockUI: '../../lib/jquery-blockUI/jquery.blockUI.min',
    underscore: '../../lib/underscore/underscore-min',
    backbone: '../../lib/backbone/backbone-min',
    mustache: '../../lib/mustache.js/mustache.min',
    text: '../../lib/text/text',
    select2: '../../lib/select2/js/select2.full.min',
    rsvp: '../../lib/rsvp/rsvp.min',
    modernizr: '../../lib/modernizr/modernizr-custom.min',
    leaflet: '../../lib/leaflet/leaflet',
    leafletprunecluster: '../../lib/leaflet.prunecluster/dist/PruneCluster',
    leafletfullscreen: '../../lib/leaflet.fullscreen/dist/Leaflet.fullscreen',
    leafleteasybutton: '../../lib/leaflet.easybutton/dist/easy-button',
    qs: '../../lib/qs/qs',
    chance: '../../lib/chance/chance.min'
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

requirejs([
  'backbone',
  'modernizr',
  'app/shared/modules/app.module',
  './shared/multiselect/multiselect-multi.demo',
  './shared/multiselect/multiselect-multi-max-selection-length.demo',
  './shared/multiselect/multiselect-single.demo',
  './shared/project-item/projectItem.demo',
  './shared/tab-switcher/tabSwitcher.demo',
  './shared/actions-toolbar/actionsToolbar.demo',
  './shared/flags/flags.demo',
  './shared/search-box/searchBox.demo',
  './shared/search/search.demo',
  './shared/pager/pager.demo',
  './shared/page-stats/pageStats.demo',
  './shared/searchable-list/searchableList.demo',
  './shared/simple-map/simpleMap.demo',
], function(Backbone, modernizr, applicationModule) {
  Backbone.history.start();
});