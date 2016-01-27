requirejs.config({
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
    jasmine: ['../lib/jasmine/lib/jasmine-core/jasmine'],
    'jasmine-html': ['../lib/jasmine/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['../lib/jasmine/lib/jasmine-core/boot'],
    'jasmine-jquery': ['../lib/jasmine-jquery/lib/jasmine-jquery'],
    'jasmine-ajax': ['../lib/jasmine-ajax/lib/mock-ajax']
  },
  shim: {
    'modernizr': {},
    'leafletprunecluster': {
      deps: ['leaflet']
    },
    'leafletfullscreen': {
      deps: ['leaflet']
    },
    'leafleteasybutton': {
      deps: ['leaflet']
    },
    'jasmine-html': {
      deps: ['jasmine']
    },
    'jasmine-boot': {
      deps: ['jasmine', 'jasmine-html']
    },
    'jasmine-jquery': {
      deps: ['jasmine', 'jasmine-html', 'jasmine-boot', 'jquery']
    },
    'jasmine-ajax': {
      deps: ['jasmine', 'jasmine-html', 'jasmine-boot']
    }
  }
});

require(['jasmine-boot', 'jasmine-jquery', 'jasmine-ajax'], function() {
  require([
    // app/core
    'app/core/event.spec',
    'app/core/module.spec',
    'app/core/component.spec',
    'app/core/utils.spec',

    // app
    'app/shared/modules/app.module.spec',

    // util
    'app/shared/util/constants.spec',

    // pager component
    'app/shared/components/pager/main.component.spec',
    'app/shared/components/pager/models/pager.model.spec',
    'app/shared/components/pager/models/page.model.spec',
    'app/shared/components/pager/collections/page.collection.spec',
    'app/shared/components/pager/views/pager.view.spec',
    'app/shared/components/pager/views/page.view.spec',

    // page stats component
    'app/shared/components/page-stats/main.component.spec',
    'app/shared/components/page-stats/models/pageStats.model.spec',
    'app/shared/components/page-stats/views/pageStats.view.spec',

    // tab switcher component
    'app/shared/components/tab-switcher/main.component.spec',
    'app/shared/components/tab-switcher/models/tab.model.spec',
    'app/shared/components/tab-switcher/collections/tabs.collection.spec',
    'app/shared/components/tab-switcher/views/tabSwitcher.view.spec',
    'app/shared/components/tab-switcher/views/tab.view.spec',

    // multiselect component
    'app/shared/components/multiselect/main.component.spec',
    'app/shared/components/multiselect/views/multiselect.view.spec',
    'app/shared/components/multiselect/models/selectItem.model.spec',
    'app/shared/components/multiselect/collections/multiselect.collection.spec',

    // map component
    'app/shared/components/mapping/map/main.component.spec',
    'app/shared/components/mapping/map/views/map.view.spec',

    // project popup component
    'app/shared/components/mapping/popups/project/main.component.spec',
    'app/shared/components/mapping/popups/project/models/projectPopup.model.spec',
    'app/shared/components/mapping/popups/project/views/projectPopup.view.spec',

    // util
    'app/efc/util/constants.spec',

    // efc app component
    'app/efc/components/landing-page/main.component.spec',
    'app/efc/components/landing-page/views/app.view.spec',

    //search
    'app/efc/components/searching/search/main.component.spec',
    'app/efc/components/searching/search/views/search.view.spec',

    // search box component
    'app/efc/components/searching/search-box/main.component.spec',
    'app/efc/components/searching/search-box/models/searchBox.model.spec',
    'app/efc/components/searching/search-box/views/searchBox.view.spec',

    // advanced search component
    'app/efc/components/searching/advanced-search/main.component.spec',
    'app/efc/components/searching/advanced-search/views/advancedSearch.view.spec',
    'app/efc/components/searching/advanced-search/services/advanced-search/advancedSearch.service.spec',

    // results list component
    'app/efc/components/results/list/results-list/main.component.spec',
    'app/efc/components/results/list/results-list/models/result.model.spec',
    'app/efc/components/results/list/results-list/collections/results.collection.spec',
    'app/efc/components/results/list/results-list/views/resultsList.view.spec',
    'app/efc/components/results/list/results-list/views/resultItem.view.spec',

    // searchable results list component
    'app/efc/components/results/list/searchable-results-list/main.component.spec',
    'app/efc/components/results/list/searchable-results-list/views/searchableResultsList.view.spec',
    'app/efc/components/results/list/searchable-results-list/services/search/searchInput.mapper.spec',
    'app/efc/components/results/list/searchable-results-list/services/search/searchResult.mapper.spec',
    'app/efc/components/results/list/searchable-results-list/services/search/search.service.spec',

    // searchable results map component
    'app/efc/components/results/map/searchable-results-map/main.component.spec',
    'app/efc/components/results/map/searchable-results-map/views/searchableResultsMap.view.spec',
    'app/efc/components/results/map/searchable-results-map/services/search/searchInput.mapper.spec',
    'app/efc/components/results/map/searchable-results-map/services/search/searchResult.mapper.spec',
    'app/efc/components/results/map/searchable-results-map/services/search/search.service.spec'

  ], function() {
    window.onload();
  });
});