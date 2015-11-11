define(function(require) {
  var Widget = require('app/core/widget'),
    TabSwitcherWidget = require('app/widgets/tab-switcher/main'),
    TabSwitcherView = require('app/widgets/tab-switcher/views/tabSwitcher.view');

  describe('Tab Switcher Widget', function() {
    describe('type', function() {
      it('should be of widget', function() {
        expect(TabSwitcherWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });

    describe('creation', function() {
      it('should be initialized without options', function() {
        expect(function() {
          new TabSwitcherWidget;
        }).not.toThrow();
      });

      it('should have view defined', function() {
        var widget = new TabSwitcherWidget;
        expect(widget.view).toEqual(jasmine.any(TabSwitcherView));
      });

      it('should pass tab descriptor array to its view', function() {
        spyOn(TabSwitcherView.prototype, 'initialize');

        var fakeOptions = {
            tabDescriptors: []
          },
          widget = new TabSwitcherWidget(fakeOptions),
          lastCall = widget.view.initialize.calls.mostRecent();

        expect(lastCall.args[0]).toBe(fakeOptions.tabDescriptors);
      });
    });
  });
});