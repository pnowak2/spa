requirejs.config({
  baseUrl: '../../',
  paths: {
    spec: 'europe-for-citizens/test/spec',
    app: 'europe-for-citizens/src',
    templates: 'europe-for-citizens/src/templates',
    jquery: 'lib/jquery/dist/jquery.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text',
    jasmine: ['lib/jasmine/lib/jasmine-core/jasmine'],
    'jasmine-html': ['lib/jasmine/lib/jasmine-core/jasmine-html'],
    'jasmine-boot': ['lib/jasmine/lib/jasmine-core/boot'],
    'jasmine-jquery': ['lib/jasmine-jquery/lib/jasmine-jquery'],
    'jasmine-ajax': ['lib/jasmine-ajax/lib/mock-ajax']
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
    // core
    'spec/core/eventBusSpec',
    'spec/core/moduleSpec',
    'spec/core/widgetSpec',
    'spec/core/utilsSpec',
    'spec/core/constantsSpec',
    // pager
    'spec/widgets/pager/mainSpec',
    'spec/widgets/pager/models/pagerModelSpec',
    'spec/widgets/pager/models/pageModelSpec',
    'spec/widgets/pager/collections/pageCollectionSpec',
    'spec/widgets/pager/views/pagerViewSpec',
    'spec/widgets/pager/views/pageViewSpec',
    'spec/widgets/pager/events/eventBusSpec',
    // search
    'spec/widgets/search/search-box/mainSpec',
    'spec/widgets/search/search-box/events/eventBusSpec',
    'spec/widgets/search/search-box/models/searchBoxModelSpec',
    'spec/widgets/search/search-box/views/searchBoxViewSpec',
    // tab switcher
    'spec/widgets/tab-switcher/models/tabModelSpec',
    'spec/widgets/tab-switcher/collections/tabsCollectionSpec',
    'spec/widgets/tab-switcher/events/eventBusSpec',
    'spec/widgets/tab-switcher/views/tabSwitcherViewSpec',
    'spec/widgets/tab-switcher/views/tabViewSpec'

  ], function() {
    window.onload();
  });
});