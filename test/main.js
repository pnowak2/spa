requirejs.config({
  paths: {
    app: '../app',
    jquery: '../lib/jquery/dist/jquery.min',
    blockUI: '../lib/jquery-blockUI/jquery.blockUI.min',
    underscore: '../lib/underscore/underscore-min',
    backbone: '../lib/backbone/backbone-min',
    mustache: '../lib/mustache.js/mustache.min',
    text: '../lib/text/text',
    select2: '../lib/select2/js/select2.full.min',
    rsvp: '../lib/rsvp/rsvp.min',
    jasmine: ['../lib/jasmine/lib/jasmine-core/jasmine'],
    'jasmine-html': ['../lib/jasmine/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['../lib/jasmine/lib/jasmine-core/boot'],
    'jasmine-jquery': ['../lib/jasmine-jquery/lib/jasmine-jquery'],
    'jasmine-ajax': ['../lib/jasmine-ajax/lib/mock-ajax']
  },
  shim: {
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
    'app/app.module.spec',

    // util
    'app/shared/util/constants.spec',
    // pager component
    'app/shared/components/pager/main.component.spec',
    'app/shared/components/pager/models/pager.model.spec',
    'app/shared/components/pager/models/page.model.spec',
    'app/shared/components/pager/collections/page.collection.spec',
    'app/shared/components/pager/views/pager.view.spec',
    'app/shared/components/pager/views/page.view.spec',
    // tab switcher component
    'app/shared/components/tab-switcher/main.component.spec',
    'app/shared/components/tab-switcher/models/tab.model.spec',
    'app/shared/components/tab-switcher/collections/tabs.collection.spec',
    'app/shared/components/tab-switcher/views/tabSwitcher.view.spec',
    'app/shared/components/tab-switcher/views/tab.view.spec',

    // util
    'app/efc/util/constants.spec',
    'app/efc/routers/efc.router.spec',
    // services
    'app/efc/services/search/search.mapper.spec',
    'app/efc/services/search/search.service.spec',
    // search component
    'app/efc/components/search/search-box/main.component.spec',
    'app/efc/components/search/search-box/models/searchBox.model.spec',
    'app/efc/components/search/search-box/views/searchBox.view.spec',
    // results list component
    'app/efc/components/results/list/results-list/main.component.spec',
    'app/efc/components/results/list/results-list/models/result.model.spec',
    'app/efc/components/results/list/results-list/collections/results.collection.spec',
    'app/efc/components/results/list/results-list/views/resultsList.view.spec',
    'app/efc/components/results/list/results-list/views/resultItem.view.spec',
    // paged results list component
    'app/efc/components/results/list/paged-results-list/main.component.spec',
    'app/efc/components/results/list/paged-results-list/views/pagedResultsList.view.spec'

  ], function() {
    window.onload();
  });
});