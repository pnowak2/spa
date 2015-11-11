requirejs.config({
  baseUrl: '../../',
  paths: {
    spec: 'test/spec',
    app: 'src',
    jquery: 'lib/jquery/dist/jquery.min',
    underscore: 'lib/underscore/underscore-min',
    backbone: 'lib/backbone/backbone-min',
    mustache: 'lib/mustache.js/mustache.min',
    text: 'lib/text/text',
    rsvp: 'lib/rsvp/rsvp.min',
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
    'spec/core/event.spec',
    'spec/core/module.spec',
    'spec/core/component.spec',
    'spec/core/utils.spec',
    // util
    'spec/util/constants.spec',
    // app
    'spec/app.module.spec',
    'spec/app.router.spec',
    // service
    'spec/services/search/search.mapper.spec',
    'spec/services/search/search.service.spec',
    // pager
    'spec/widgets/pager/main.component.spec',
    'spec/widgets/pager/models/pager.model.spec',
    'spec/widgets/pager/models/page.model.spec',
    'spec/widgets/pager/collections/page.collection.spec',
    'spec/widgets/pager/views/pager.view.spec',
    'spec/widgets/pager/views/page.view.spec',
    // tab switcher
    'spec/widgets/tab-switcher/main.component.spec',
    'spec/widgets/tab-switcher/models/tab.model.spec',
    'spec/widgets/tab-switcher/collections/tabs.collection.spec',
    'spec/widgets/tab-switcher/views/tabSwitcher.view.spec',
    'spec/widgets/tab-switcher/views/tab.view.spec',
    // search
    'spec/widgets/search/search-box/main.component.spec',
    'spec/widgets/search/search-box/models/searchBox.model.spec',
    'spec/widgets/search/search-box/views/searchBox.view.spec',
    // results list
    'spec/widgets/results/results-list/main.component.spec',
    'spec/widgets/results/results-list/models/result.model.spec',
    'spec/widgets/results/results-list/collections/results.collection.spec',
    'spec/widgets/results/results-list/views/resultsList.view.spec',
    'spec/widgets/results/results-list/views/resultItem.view.spec'
  ], function() {
    window.onload();
  });
});