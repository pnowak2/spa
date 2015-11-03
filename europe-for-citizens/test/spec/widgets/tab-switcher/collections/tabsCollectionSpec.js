define(function(require) {
  var TabCollection = require('app/widgets/tab-switcher/collections/tabsCollection'),
    TabModel = require('app/widgets/tab-switcher/models/tabModel'),
    Backbone = require('backbone');

  describe('Tabs Collection', function() {
    describe('type', function() {
      it('should be of collection', function() {
        expect(TabCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('creation', function() {
      it('should have proper model defined', function() {
        var collection = new TabCollection;
        expect(collection.model).toEqual(TabModel);
      });
    });
  });
});