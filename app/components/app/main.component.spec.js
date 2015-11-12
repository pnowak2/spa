define(function(require) {
  var Component = require('app/core/component'),
    AppComponent = require('./main.component'),
    AppView = require('./views/app.view'),
    TabSwitcherComponent = require('../tab-switcher/main.component'),
    SearchComponent = require('../search/search-box/main.component'),
    ResultsListComponent = require('../results/results-list/main.component'),
    PagerComponent = require('../pager/main.component');

  describe('App Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(AppComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(AppComponent.prototype, 'render');
        this.appComponent = new AppComponent;
      });

      it('should have view defined', function() {
        expect(this.appComponent.view).toEqual(jasmine.any(AppView));
      });

      it('should have search component defined', function() {
        expect(this.appComponent.searchComponent).toEqual(jasmine.any(SearchComponent));
      });

      it('should have tab switcher component defined', function() {
        expect(this.appComponent.tabSwitcherComponent).toEqual(jasmine.any(TabSwitcherComponent));
      });

      it('should have results list component defined', function() {
        expect(this.appComponent.listComponent).toEqual(jasmine.any(ResultsListComponent));
      });

      it('should have pager component defined', function() {
        expect(this.appComponent.pagerComponent).toEqual(jasmine.any(PagerComponent));
      });

      it('should render on initialization', function() {
        expect(this.appComponent.render.calls.count()).toBe(1);
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should be redefined', function() {
          var appComponent = new AppComponent;
          expect(AppComponent.prototype.hasOwnProperty('render')).toBeTruthy();
        });
      });
    });
  });
});