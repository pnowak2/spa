define(function(require) {
  var Backbone = require('backbone'),
    MultiselectCollection = require('./multiselect.collection'),
    MultiselectModel = require('../models/multiselect.model');

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
      describe('.selected()', function() {
        it('should be defined', function() {
          expect(MultiselectCollection.prototype.selected).toEqual(jasmine.any(Function));
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
            });

          var collection = new MultiselectCollection([
            country1, country2, country3
          ]);

          expect(collection.selected()).toEqual([
            country1, country3
          ])
        });
      });
    });
  });
});