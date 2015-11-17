define(function(require) {
  var Backbone = require('backbone'),
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
        expect(MultiselectCollection.prototype.model).toEqual(MultiselectModel)
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
          ])
        });
      });

      describe('.selectItem()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.selectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if id is not defined', function() {
          var collection = new MultiselectCollection;
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

      describe('.unselectItem()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.unselectItem).toEqual(jasmine.any(Function));
        });

        it('should not throw if id is not defined', function() {
          var collection = new MultiselectCollection;
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