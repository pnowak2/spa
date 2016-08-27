define(function(require) {
  var Backbone = require('backbone'),
    _ = require('underscore'),
    MultiselectCollection = require('./multiselect.collection'),
    MultiselectModel = require('../models/selectItem.model');

  describe('Multiselect Collection', function() {
    describe('type', function() {
      it('should be of collection', function() {
        expect(MultiselectCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('creation', function() {
      it('should have model defined', function() {
        expect(MultiselectCollection.prototype.model).toEqual(MultiselectModel);
      });
    });

    describe('api', function() {
      describe('.selectedItems()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.selectedItems).toEqual(jasmine.any(Function));
        });

        it('should return only selected items', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              title: 'Poland',
              selected: true
            }),
            country2 = new MultiselectModel({
              id: 'de',
              title: 'Germany',
              selected: false
            }),
            country3 = new MultiselectModel({
              id: 'be',
              title: 'Belgium',
              selected: true
            }),
            collection = new MultiselectCollection([
              country1, country2, country3
            ]);

          expect(collection.selectedItems()).toEqual([
            country1, country3
          ]);
        });
      });

      describe('.firstSelectedItem()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.firstSelectedItem).toEqual(jasmine.any(Function));
        });

        it('should return only first selected item', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              title: 'Poland',
              selected: true
            }),
            country2 = new MultiselectModel({
              id: 'de',
              title: 'Germany',
              selected: false
            }),
            country3 = new MultiselectModel({
              id: 'be',
              title: 'Belgium',
              selected: true
            }),
            collection = new MultiselectCollection([
              country1, country2, country3
            ]);

          expect(collection.firstSelectedItem()).toEqual(country1);
        });

        it('should return undefined if nothing is selected', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              title: 'Poland',
              selected: false
            }),
            collection = new MultiselectCollection([country1]);

          expect(collection.firstSelectedItem()).toEqual(void 0);
        });
      });

      describe('.hasSelection()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.hasSelection).toEqual(jasmine.any(Function));
        });

        it('should return true if at least one item is selected', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              selected: true
            }),
            country2 = new MultiselectModel({
              id: 'de',
              selected: false
            }),
            country3 = new MultiselectModel({
              id: 'be',
              selected: true
            }),
            collection = new MultiselectCollection([
              country1, country2, country3
            ]);

          expect(collection.hasSelection()).toBe(true);
        });

        it('should return false if nothing is selected', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              selected: false
            }),
            country2 = new MultiselectModel({
              id: 'de',
              selected: false
            }),
            country3 = new MultiselectModel({
              id: 'be',
              selected: false
            }),
            collection = new MultiselectCollection([
              country1, country2, country3
            ]);

          expect(collection.hasSelection()).toBe(false);
        });
      });

      describe('.hasOneSelection()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.hasOneSelection).toEqual(jasmine.any(Function));
        });

        it('should return true if one item is selected', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              selected: true
            }),
            country2 = new MultiselectModel({
              id: 'de',
              selected: false
            }),
            collection = new MultiselectCollection([
              country1, country2
            ]);

          expect(collection.hasOneSelection()).toBe(true);
        });

        it('should return false if more than one item is selected', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              selected: true
            }),
            country2 = new MultiselectModel({
              id: 'de',
              selected: true
            }),
            collection = new MultiselectCollection([
              country1, country2
            ]);

          expect(collection.hasOneSelection()).toBe(false);
        });

        it('should return false if nothing is selected', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              selected: false
            }),
            country2 = new MultiselectModel({
              id: 'de',
              selected: false
            }),
            collection = new MultiselectCollection([
              country1, country2
            ]);

          expect(collection.hasOneSelection()).toBe(false);
        });
      });

      describe('.isDirty()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.isDirty).toEqual(jasmine.any(Function));
        });

        it('should return false if collection was not changed after initialization', function() {
          var collection = new MultiselectCollection([{
            id: 'pl',
            selected: true
          }, {
            id: 'de',
            selected: false
          }]);

          expect(collection.isDirty()).toBe(false);
        });

        it('should return false if collection was changed after initialization but has the same content as at the beginning', function() {
          var collection = new MultiselectCollection([{
            id: 'pl',
            selected: true
          }, {
            id: 'de',
            selected: false
          }]);

          collection.selectItem('de');
          collection.unselectItem('de');

          expect(collection.isDirty()).toBe(false);
        });

        it('should return true if collection was changed after initialization and has other content than at the beginning', function() {
          var collection = new MultiselectCollection([{
            id: 'pl',
            selected: true
          }, {
            id: 'de',
            selected: false
          }]);

          collection.selectItem('de');

          expect(collection.isDirty()).toBe(true);
        });
      });

      describe('.selectItem()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.selectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if id is not defined', function() {
          var collection = new MultiselectCollection();
          expect(function() {
            collection.selectItem();
          }).not.toThrow();
        });

        it('should select item by item id', function() {
          var country1 = new MultiselectModel({
              id: 'de',
              title: 'Germany',
              selected: false
            }),
            collection = new MultiselectCollection([
              country1
            ]);

          expect(collection.get('de').get('selected')).toBe(false);

          collection.selectItem('de');

          expect(collection.get('de').get('selected')).toBe(true);
        });
      });

      describe('.selectItems()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.selectItems).toEqual(jasmine.any(Function));
        });

        it('should not throw if invoked without ids', function() {
          var collection = new MultiselectCollection();

          expect(function() {
            collection.selectItems();
          }).not.toThrow();
        });

        it('should not throw if invoked with bad ids', function() {
          var collection = new MultiselectCollection();

          expect(function() {
            collection.selectItems('garbage', 'data');
          }).not.toThrow();
        });

        it('should deselect all items first', function() {
          spyOn(MultiselectCollection.prototype, 'unselectAll');

          var collection = new MultiselectCollection();

          collection.selectItems();

          expect(collection.unselectAll).toHaveBeenCalled();
        });

        it('should select given items', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              selected: false
            }),
            country2 = new MultiselectModel({
              id: 'be',
              selected: false
            }),
            country3 = new MultiselectModel({
              id: 'de',
              selected: false
            }),
            collection = new MultiselectCollection([
              country1, country2, country3
            ]);

          collection.selectItems(['be', 'de']);

          expect(_.pluck(collection.selectedItems(), 'id')).toEqual(['be', 'de']);
        });
      });

      describe('.unselectItem()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.unselectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if id is not defined', function() {
          var collection = new MultiselectCollection();
          expect(function() {
            collection.unselectItem();
          }).not.toThrow();
        });

        it('should unselect item by item id', function() {
          var country1 = new MultiselectModel({
              id: 'de',
              title: 'Germany',
              selected: true
            }),
            collection = new MultiselectCollection([
              country1
            ]);

          expect(collection.get('de').get('selected')).toBe(true);

          collection.unselectItem('de');

          expect(collection.get('de').get('selected')).toBe(false);
        });
      });

      describe('.unselectAll()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.unselectAll).toEqual(jasmine.any(Function));
        });

        it('should unselect all items', function() {
          var country1 = new MultiselectModel({
              id: 'pl',
              title: 'Poland',
              selected: true
            }),
            country2 = new MultiselectModel({
              id: 'be',
              title: 'Belgium',
              selected: true
            }),
            collection = new MultiselectCollection([
              country1, country2
            ]);

          expect(collection.selectedItems().length).toBe(2);

          collection.unselectAll();

          expect(collection.selectedItems().length).toBe(0);
        });
      });
    });
  });
});