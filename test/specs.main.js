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
    'app/shared/components/paging/pager/main.component.spec',
    'app/shared/components/paging/pager/models/pager.model.spec',
    'app/shared/components/paging/pager/models/page.model.spec',
    'app/shared/components/paging/pager/collections/page.collection.spec',
    'app/shared/components/paging/pager/views/pager.view.spec',
    'app/shared/components/paging/pager/views/page.view.spec',

    // page stats component
    'app/shared/components/paging/page-stats/main.component.spec',
    'app/shared/components/paging/page-stats/models/pageStats.model.spec',
    'app/shared/components/paging/page-stats/views/pageStats.view.spec',

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

    // simple map component
    'app/shared/components/mapping/map/simple/main.component.spec',
    'app/shared/components/mapping/map/simple/views/map.view.spec',

    // extended map component
    'app/shared/components/mapping/map/extended/main.component.spec',
    'app/shared/components/mapping/map/extended/views/map.view.spec',

    // partners map component
    'app/shared/components/mapping/partners-map/main.component.spec',
    'app/shared/components/mapping/partners-map/views/partnersMap.view.spec',

    // popup component
    'app/shared/components/mapping/popup/main.component.spec',
    'app/shared/components/mapping/popup/views/popup.view.spec',

    // flags component
    'app/shared/components/flags/main.component.spec',
    'app/shared/components/flags/collections/flags.collection.spec',
    'app/shared/components/flags/views/flags.view.spec',

    // search box component
    'app/shared/components/searching/search-box/main.component.spec',
    'app/shared/components/searching/search-box/models/searchBox.model.spec',
    'app/shared/components/searching/search-box/views/searchBox.view.spec',

    //search component
    'app/shared/components/searching/search/main.component.spec',
    'app/shared/components/searching/search/views/search.view.spec',
    'app/shared/components/searching/search/components/dummyAdvancedSearch/main.component.spec',

    // efc util
    'app/efc/util/constants.spec',

    // efc landing page component
    'app/efc/components/landing-page/layout/main.component.spec',
    'app/efc/components/landing-page/layout/views/landingPage.view.spec',

    // advanced search component
    'app/efc/components/landing-page/searching/advanced-search/main.component.spec',
    'app/efc/components/landing-page/searching/advanced-search/views/advancedSearch.view.spec',
    'app/efc/components/landing-page/searching/advanced-search/services/advanced-search/advancedSearch.service.spec',

    // results list component
    'app/efc/components/landing-page/results/list/results-list/main.component.spec',
    'app/efc/components/landing-page/results/list/results-list/models/result.model.spec',
    'app/efc/components/landing-page/results/list/results-list/collections/results.collection.spec',
    'app/efc/components/landing-page/results/list/results-list/views/resultsList.view.spec',
    'app/efc/components/landing-page/results/list/results-list/views/resultItem.view.spec',

    // pageable results list component
    'app/efc/components/landing-page/results/list/pageable-results-list/main.component.spec',
    'app/efc/components/landing-page/results/list/pageable-results-list/views/pageableResultsList.view.spec',
    'app/efc/components/landing-page/results/list/pageable-results-list/services/search/searchInput.mapper.spec',
    'app/efc/components/landing-page/results/list/pageable-results-list/services/search/searchResult.mapper.spec',
    'app/efc/components/landing-page/results/list/pageable-results-list/services/search/search.service.spec',

    // efc results map component
    'app/efc/components/landing-page/results/map/results-map/main.component.spec',
    'app/efc/components/landing-page/results/map/results-map/views/resultsMap.view.spec',
    'app/efc/components/landing-page/results/map/results-map/services/search/searchInput.mapper.spec',
    'app/efc/components/landing-page/results/map/results-map/services/search/searchResult.mapper.spec',
    'app/efc/components/landing-page/results/map/results-map/services/search/search.service.spec',

    // efc project partners page component
    'app/efc/components/project-partners-page/partners-map/main.component.spec',
    'app/efc/components/project-partners-page/partners-map/views/partnersMap.view.spec',
    'app/efc/components/project-partners-page/partners-map/services/projectPartners.service.spec',
    'app/efc/components/project-partners-page/partners-map/services/projectPartnersInput.mapper.spec',
    'app/efc/components/project-partners-page/partners-map/services/projectPartnersResult.mapper.spec',

    // eplus-ce util
    'app/eplus-ce/util/constants.spec',

    // eplus-ce router
    'app/eplus-ce/routers/landing-page.router.spec',

    // eplus-ce project partners page component
    'app/eplus-ce/components/project-partners-page/partners-map/main.component.spec',

    // eplus-ce landing page component
    'app/eplus-ce/components/landing-page/layout/main.component.spec',
    'app/eplus-ce/components/landing-page/layout/views/landingPage.view.spec',
    'app/eplus-ce/components/landing-page/layout/util/searchCriteriaBuilder.spec',

    // eplus-ce results map component
    'app/eplus-ce/components/landing-page/results/map/results-map/main.component.spec',
    'app/eplus-ce/components/landing-page/results/map/results-map/views/resultsMap.view.spec',
    'app/eplus-ce/components/landing-page/results/map/results-map/services/search/search.service.spec',
    'app/eplus-ce/components/landing-page/results/map/results-map/services/search/searchInput.mapper.spec',
    'app/eplus-ce/components/landing-page/results/map/results-map/services/search/searchResult.mapper.spec'

  ], function() {
    window.onload();
  });
});