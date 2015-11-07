define(function(require) {
  var TabCollection = require('app/widgets/tab-switcher/collections/tabsCollection');
  Backbone = require('backbone');

  describe('Tab Switcher Tabs Collection', function() {
    describe('type', function() {
      it('should be of collection', function() {
        expect(TabCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });
  });
});