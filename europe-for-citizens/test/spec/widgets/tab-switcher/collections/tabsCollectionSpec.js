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

      it('should be possible to create with array of objects with tab properties', function() {
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

    describe('api', function() {
      describe('.selectedTabs()', function() {
        it('should be defined', function() {
          expect(TabsCollection.prototype.selectedTabs).toEqual(jasmine.any(Function));
        });

        it('should return only selected tab models', function() {
          var collection = new TabsCollection([{
            identifier: 'first',
            selected: false,
          }, {
            identifier: 'second',
            selected: true,
          }, {
            identifier: 'third',
            selected: false,
          }]);

          var selected = collection.selectedTabs();

          expect(selected.length).toBe(1);
          expect(selected[0].toJSON()).toEqual(jasmine.objectContaining({
            identifier: 'second',
            selected: true
          }));
        });

        it('should return empty array if noting is selected', function() {
          var collection = new TabsCollection([{
            identifier: 'first',
            selected: false,
          }, {
            identifier: 'second',
            selected: false,
          }, {
            identifier: 'third',
            selected: false,
          }]);

          var selected = collection.selectedTabs();

          expect(selected.length).toBe(0);
        });
      });

      describe('.findTab()', function() {
        beforeEach(function() {
          this.collection = new TabsCollection([{
            identifier: 'first',
            selected: false,
          }, {
            identifier: 'second',
            selected: true,
          }, {
            identifier: 'third',
            selected: false,
          }]);
        });

        it('should be defined', function() {
          expect(TabsCollection.prototype.findTab).toEqual(jasmine.any(Function));
        });

        it('should return tab model for given identifier', function() {
          var tab = this.collection.findTab('second');

          expect(tab.toJSON()).toEqual(jasmine.objectContaining({
            identifier: 'second',
            selected: true,
          }));
        });

        it('should return undefined if not found', function() {
          var tab = this.collection.findTab('other');
          expect(tab).toBeUndefined();
        });
      });

      describe('.selectTab()', function() {
        beforeEach(function() {
          this.collection = new TabsCollection([{
            identifier: 'first',
            selected: false,
          }, {
            identifier: 'second',
            selected: true,
          }, {
            identifier: 'third',
            selected: false,
          }]);
        });

        it('should be defined', function() {
          expect(TabsCollection.prototype.selectTab).toEqual(jasmine.any(Function));
        });

        it('should select tab model by model identifier', function() {
          expect(this.collection.selectedTabs()[0].get('identifier')).toEqual('second');

          this.collection.selectTab('third');

          expect(this.collection.selectedTabs()[0].get('identifier')).toEqual('third');
        });

        it('should not select non existing tab', function() {
          expect(this.collection.selectedTabs()[0].get('identifier')).toEqual('second');

          this.collection.selectTab('nonexisting');

          expect(this.collection.selectedTabs()[0].get('identifier')).toEqual('second');
        });
      });
    });
  });
});