define(function(require) {
  var TabSwitcherView = require('app/widgets/tab-switcher/views/tabSwitcherView');

  describe('Tab Switcher View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(TabSwitcherView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });
  });
});