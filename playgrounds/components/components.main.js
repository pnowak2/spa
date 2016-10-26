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
  // Shared Components
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
  './shared/extended-map/extendedMap.demo',
  './shared/partners-map/partnersMap.demo',
  './shared/marker-popup/markerPopup.demo',

  // EfC Components
  './efc/advanced-search/advancedSearch.demo',
  './efc/results-list/resultsList.demo',
  './efc/searchable-results-list/searchableResultsList.demo',
  './efc/results-map/resultsMap.demo',
  './efc/partners-map/partnersMap.demo',
  './efc/landing-page-layout/landingPageLayout.demo',

  // CE Components
  './ce/advanced-search/advancedSearch.demo',
  './ce/results-list/resultsList.demo', 
  './ce/result-stats/resultStats.demo', 
  './ce/searchable-results-list/searchableResultsList.demo',
  './ce/results-map/resultsMap.demo',
  './ce/landing-page-layout/landingPageLayout.demo',  

  // Eplus Components
  './eplus/advanced-search/advancedSearch.demo',
  // './eplus/results-list/resultsList.demo', 
  // './eplus/searchable-results-list/searchableResultsList.demo',
  './eplus/results-map/resultsMap.demo',
  './eplus/landing-page-layout/landingPageLayout.demo', 
], function(Backbone, modernizr, applicationModule) {
  Backbone.history.start();
});