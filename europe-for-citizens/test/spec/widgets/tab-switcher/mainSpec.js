define(function(require) {
  var Widget = require('app/core/widget'),
    TabSwitcherWidget = require('app/widgets/tab-switcher/main');

  describe('Tab Switcher Widget', function() {
    describe('type', function() {
      it('should be of widget', function() {
        expect(TabSwitcherWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });
  });
});