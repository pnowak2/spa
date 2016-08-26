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
    chance: '../lib/chance/chance.min',
    jasmine: ['../lib/jasmine/jasmine'],
    'jasmine-html': ['../lib/jasmine/jasmine-html'],
    'jasmine-boot': ['../lib/jasmine/boot'],
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

    // searchable list component
    'app/shared/components/lists/searchable-list/main.component.spec',
    'app/shared/components/lists/searchable-list/components/baseListComponent/main.component.spec',
    'app/shared/components/lists/searchable-list/services/dummySearch.service.spec',
    'app/shared/components/lists/searchable-list/views/searchableList.view.spec',

    // pager component
    'app/shared/components/lists/pager/main.component.spec',
    'app/shared/components/lists/pager/models/pager.model.spec',
    'app/shared/components/lists/pager/models/page.model.spec',
    'app/shared/components/lists/pager/collections/page.collection.spec',
    'app/shared/components/lists/pager/views/pager.view.spec',
    'app/shared/components/lists/pager/views/page.view.spec',

    // page stats component
    'app/shared/components/lists/page-stats/main.component.spec',
    'app/shared/components/lists/page-stats/models/pageStats.model.spec',
    'app/shared/components/lists/page-stats/views/pageStats.view.spec',

    // tab switcher component
    'app/shared/components/other/tab-switcher/main.component.spec',
    'app/shared/components/other/tab-switcher/models/tab.model.spec',
    'app/shared/components/other/tab-switcher/collections/tabs.collection.spec',
    'app/shared/components/other/tab-switcher/views/tabSwitcher.view.spec',
    'app/shared/components/other/tab-switcher/views/tab.view.spec',

    // multiselect component
    'app/shared/components/other/multiselect/main.component.spec',
    'app/shared/components/other/multiselect/views/multiselect.view.spec',
    'app/shared/components/other/multiselect/models/selectItem.model.spec',
    'app/shared/components/other/multiselect/collections/multiselect.collection.spec',

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
    'app/shared/components/other/flags/main.component.spec',
    'app/shared/components/other/flags/collections/flags.collection.spec',
    'app/shared/components/other/flags/views/flags.view.spec',

    // search box component
    'app/shared/components/searching/search-box/main.component.spec',
    'app/shared/components/searching/search-box/models/searchBox.model.spec',
    'app/shared/components/searching/search-box/views/searchBox.view.spec',

    //search component
    'app/shared/components/searching/search/main.component.spec',
    'app/shared/components/searching/search/views/search.view.spec',
    'app/shared/components/searching/search/components/dummyAdvancedSearch/main.component.spec',

    //project item component
    'app/shared/components/other/project-item/main.component.spec',
    'app/shared/components/other/project-item/views/projectItem.view.spec',

    // efc util
    'app/efc/util/constants.spec',

    // efc landing page component
    'app/efc/components/landing-page/layout/main.component.spec',
    'app/efc/components/landing-page/layout/views/landingPage.view.spec',

    // efc advanced search component
    'app/efc/components/landing-page/searching/advanced-search/main.component.spec',
    'app/efc/components/landing-page/searching/advanced-search/views/advancedSearch.view.spec',
    'app/efc/components/landing-page/searching/advanced-search/services/advanced-search/advancedSearch.service.spec',

    // efc results list component
    'app/efc/components/landing-page/results/list/results-list/main.component.spec',
    'app/efc/components/landing-page/results/list/results-list/models/result.model.spec',
    'app/efc/components/landing-page/results/list/results-list/collections/results.collection.spec',
    'app/efc/components/landing-page/results/list/results-list/views/resultsList.view.spec',
    'app/efc/components/landing-page/results/list/results-list/views/resultItem.view.spec',

    // efc searchable results list component
    'app/efc/components/landing-page/results/list/searchable-results-list/main.component.spec',
    'app/efc/components/landing-page/results/list/searchable-results-list/views/searchableResultsList.view.spec',
    'app/efc/components/landing-page/results/list/searchable-results-list/services/search/searchInput.mapper.spec',
    'app/efc/components/landing-page/results/list/searchable-results-list/services/search/searchResult.mapper.spec',
    'app/efc/components/landing-page/results/list/searchable-results-list/services/search/search.service.spec',

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

    // eplus util
    'app/eplus/util/constants.spec',

    // eplus router
    'app/eplus/routers/landing-page.router.spec',

    // eplus project partners page component
    'app/eplus/components/project-partners-page/partners-map/main.component.spec',

    // eplus landing page component
    'app/eplus/components/landing-page/layout/main.component.spec',
    'app/eplus/components/landing-page/layout/views/landingPage.view.spec',
    'app/eplus/components/landing-page/layout/util/searchCriteriaBuilder.spec',

    // eplus results map component
    'app/eplus/components/landing-page/results/map/results-map/main.component.spec',
    'app/eplus/components/landing-page/results/map/results-map/views/resultsMap.view.spec',
    'app/eplus/components/landing-page/results/map/results-map/services/search/search.service.spec',
    'app/eplus/components/landing-page/results/map/results-map/services/search/searchInput.mapper.spec',
    'app/eplus/components/landing-page/results/map/results-map/services/search/searchResult.mapper.spec',

    // ce util
    'app/ce/util/constants.spec',

    // ce landing page layout component
    'app/ce/components/landing-page/layout/main.component.spec',
    'app/ce/components/landing-page/layout/views/landingPage.view.spec',

    // ce landing page advanced search component
    'app/ce/components/landing-page/searching/advanced-search/main.component.spec',
    'app/ce/components/landing-page/searching/advanced-search/views/advancedSearch.view.spec',
    'app/ce/components/landing-page/searching/advanced-search/services/advanced-search/advancedSearch.service.spec',

    // ce results list component
    'app/ce/components/landing-page/results/list/results-list/main.component.spec',
    'app/ce/components/landing-page/results/list/results-list/views/resultsList.view.spec',

    // ce searchable results list component
    'app/ce/components/landing-page/results/list/searchable-results-list/main.component.spec',
    'app/ce/components/landing-page/results/list/searchable-results-list/views/searchableResultsList.view.spec',
    'app/ce/components/landing-page/results/list/searchable-results-list/services/search/searchInput.mapper.spec',
    'app/ce/components/landing-page/results/list/searchable-results-list/services/search/searchResult.mapper.spec',
    'app/ce/components/landing-page/results/list/searchable-results-list/services/search/search.service.spec'

  ], function() {
    window.onload();
  });
});