define(function(require) {
  var TabView = require('app/widgets/tab-switcher/views/tabView'),
    TabModel = require('app/widgets/tab-switcher/models/tabModel');

  describe('Tab Switcher Tab View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(TabView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });
  });
});