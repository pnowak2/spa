define(function(require) {
  var Component = require('app/core/component'),
    TabSwitcherComponent = require('app/widgets/tab-switcher/main.component'),
    TabSwitcherView = require('app/widgets/tab-switcher/views/tabSwitcher.view');

  describe('Tab Switcher Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(TabSwitcherComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized without options', function() {
        expect(function() {
          new TabSwitcherComponent;
        }).not.toThrow();
      });

      it('should have view defined', function() {
        var component = new TabSwitcherComponent;
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
      describe('.update()', function() {
        it('should be defined', function() {
          expect(TabSwitcherComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(TabSwitcherView.prototype, 'update');
          var component = new TabSwitcherComponent,
            fakeData = {};

          component.update(fakeData);

          expect(component.view.update).toHaveBeenCalledWith(fakeData);
        });
      });
    });
  });
});