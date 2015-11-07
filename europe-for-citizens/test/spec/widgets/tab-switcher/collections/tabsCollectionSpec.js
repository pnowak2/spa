define(function(require) {
  var TabsCollection = require('app/widgets/tab-switcher/collections/tabsCollection'),
    TabModel = require('app/widgets/tab-switcher/models/tabModel');
  Backbone = require('backbone');

  describe('Tab Switcher Tabs Collection', function() {
    describe('type', function() {
      it('should be of collection', function() {
        expect(TabsCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('creation', function() {
      it('should have proper model defined', function() {
        expect(TabsCollection.prototype.model).toEqual(TabModel);
      });

      it('should be possible to create with models', function() {
        expect(function() {
          new TabsCollection([{
            identifier: 'first',
            selected: false
          }, {
            identifier: 'second',
            selected: false
          }, {
            identifier: 'third',
            selected: true
          }]);
        }).not.toThrow();
      });

      it('should throw if more than one model is selected', function() {
        expect(function() {
          new TabsCollection([{
            identifier: 'first',
            selected: true
          }, {
            identifier: 'second',
            selected: false
          }, {
            identifier: 'third',
            selected: true
          }]);
        }).toThrowError('More than one model is selected');
      });
    });
  });
});