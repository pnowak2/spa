define(function(require) {
  var Backbone = require('backbone'),
    FlagsCollection = require('./flags.collection'),
    fourItems = [{
      code: 'pl'
    }, {
      code: 'de'
    }, {
      code: 'be'
    }, {
      code: 'fr'
    }],
    eightItems = [{
      code: 'pl'
    }, {
      code: 'de'
    }, {
      code: 'be'
    }, {
      code: 'fr'
    }, {
      code: 'lu'
    }, {
      code: 'ch'
    }, {
      code: 'gr'
    }, {
      code: 'cr'
    }];

  describe('Flags Collection', function() {
    describe('type', function() {
      it('should be type of collection', function() {
        expect(FlagsCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('creation', function() {
      it('should have default model defined', function() {
        expect(FlagsCollection.prototype.model).toBe(Backbone.Model);
      });
    });

    describe('api', function() {
      describe('.allItems()', function() {
        it('should be defined', function() {
          expect(FlagsCollection.prototype.allItems).toEqual(jasmine.any(Function));
        });

        it('should return array of items', function() {
          var collection = new FlagsCollection;
          expect(collection.allItems()).toEqual(jasmine.any(Array));
          expect(collection.allItems().length).toBe(0);
        });

        it('should return 8 items in collection of 8 items', function() {
          var collection = new FlagsCollection(eightItems);
          expect(collection.allItems().length).toBe(8);
          expect(collection.allItems()).toEqual([{
            code: 'pl'
          }, {
            code: 'de'
          }, {
            code: 'be'
          }, {
            code: 'fr'
          }, {
            code: 'lu'
          }, {
            code: 'ch'
          }, {
            code: 'gr'
          }, {
            code: 'cr'
          }]);
        });
      });

      describe('.initialItems()', function() {
        it('should be defined', function() {
          expect(FlagsCollection.prototype.initialItems).toEqual(jasmine.any(Function));
        });

        it('should return array of items', function() {
          var collection = new FlagsCollection;
          expect(collection.initialItems()).toEqual(jasmine.any(Array));
          expect(collection.initialItems().length).toBe(0);
        });

        it('should return four items in collection of 4 items', function() {
          var collection = new FlagsCollection(fourItems);
          expect(collection.initialItems().length).toBe(4);
          expect(collection.initialItems()).toEqual([{
            code: 'pl'
          }, {
            code: 'de'
          }, {
            code: 'be'
          }, {
            code: 'fr'
          }]);
        });

        it('should return first six items in collection of 8 items', function() {
          var collection = new FlagsCollection(eightItems);
          expect(collection.initialItems().length).toBe(6);
          expect(collection.initialItems()).toEqual([{
            code: 'pl'
          }, {
            code: 'de'
          }, {
            code: 'be'
          }, {
            code: 'fr'
          }, {
            code: 'lu'
          }, {
            code: 'ch'
          }]);
        });
      });

      describe('.restItems()', function() {
        it('should be defined', function() {
          expect(FlagsCollection.prototype.restItems).toEqual(jasmine.any(Function));
        });

        it('should return array of items', function() {
          var collection = new FlagsCollection;
          expect(collection.restItems()).toEqual(jasmine.any(Array));
          expect(collection.restItems().length).toBe(0);
        });

        it('should return zero items in collection of 4 items', function() {
          var collection = new FlagsCollection(fourItems);
          expect(collection.restItems().length).toBe(0);
        });

        it('should return last two items in collection of 8 items', function() {
          var collection = new FlagsCollection(eightItems);
          expect(collection.restItems().length).toBe(2);
          expect(collection.restItems()).toEqual([{
            code: 'gr'
          }, {
            code: 'cr'
          }]);
        });
      });

      describe('.itemsData()', function() {
        it('should be defined', function() {
          expect(FlagsCollection.prototype.itemsData).toEqual(jasmine.any(Function));
        });

        it('should return object with all items data', function() {
          var collection = new FlagsCollection(eightItems),
            fakeAllItems = [],
            fakeInitialItems = [],
            fakeRestItems = [];

          spyOn(FlagsCollection.prototype, 'allItems').and.returnValue(fakeAllItems);
          spyOn(FlagsCollection.prototype, 'initialItems').and.returnValue(fakeAllItems);
          spyOn(FlagsCollection.prototype, 'restItems').and.returnValue(fakeAllItems);

          expect(collection.itemsData()).toEqual({
            allItems: fakeAllItems,
            initialItems: fakeInitialItems,
            restItems: fakeRestItems
          });
        });
      });
    });
  });
});