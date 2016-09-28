define(function(require) {
  var Component = require('app/core/component'),
    TabSwitcherComponent = require('./main.component'),
    TabSwitcherView = require('./views/tabSwitcher.view');

  describe('Tab Switcher Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(TabSwitcherComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized without options', function() {
        expect(function() {
          new TabSwitcherComponent();
        }).not.toThrow();
      });

      it('should have view defined', function() {
        var component = new TabSwitcherComponent();
        expect(component.view).toEqual(jasmine.any(TabSwitcherView));
      });

      it('should pass tab descriptor array to its view', function() {
        spyOn(TabSwitcherView.prototype, 'initialize');

        var fakeOptions = {
            tabDescriptors: []
          },
          component = new TabSwitcherComponent(fakeOptions),
          lastCall = component.view.initialize.calls.mostRecent();

        expect(lastCall.args[0]).toBe(fakeOptions.tabDescriptors);
      });
    });

    describe('api', function() {
      describe('.selectTab()', function() {
        it('should be defined', function() {
          expect(TabSwitcherComponent.prototype.selectTab).toEqual(jasmine.any(Function));
        });

        it('should select given tab', function() {
          spyOn(TabSwitcherView.prototype, 'selectTab');

          var component = new TabSwitcherComponent();
          component.selectTab('tab-id');

          expect(component.view.selectTab).toHaveBeenCalledWith('tab-id');
        });
      });

      describe('.update()', function() {
        it('should be defined', function() {
          expect(TabSwitcherComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(TabSwitcherView.prototype, 'update');
          var component = new TabSwitcherComponent(),
            fakeData = {};

          component.update(fakeData);

          expect(component.view.update).toHaveBeenCalledWith(fakeData);
        });
      });
    });

    describe('events', function() {
      it('should trigger event on tab selection', function(done) {
        var component = new TabSwitcherComponent(),
          fakeTabIdentifier = 'fake-tab-id';

        component.on('tab-switcher:tab:selected', function(identifier) {
          expect(identifier).toBe(fakeTabIdentifier);
          done();
        });

        component.view.trigger('tab-switcher:tab:selected', fakeTabIdentifier);
      });
    });
  });
});