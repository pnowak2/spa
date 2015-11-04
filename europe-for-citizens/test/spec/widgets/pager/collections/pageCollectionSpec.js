define(function(require) {
  var PageCollection = require('app/widgets/pager/collections/pageCollection'),
    PageModel = require('app/widgets/pager/models/pageModel'),
    Backbone = require('backbone');

  describe('Page Collection', function() {
    describe('type', function() {
      it('should be of collection', function() {
        expect(PageCollection.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('creation', function() {
      it('should have proper model defined', function() {
        var collection = new PageCollection;
        expect(collection.model).toEqual(PageModel);
      });
    });

    describe('api', function() {
      describe('.create', function() {
        it('should be defined', function() {
          expect(PageCollection.create).toEqual(jasmine.any(Function));
        });

        it('should throw if pages argument not provided', function() {
          expect(function() {
            PageCollection.create();
          }).toThrowError('pages is not an array')
        });

        it('should return collection', function() {
          var collection = PageCollection.create([]);
          expect(collection).toEqual(jasmine.any(PageCollection));
        });

        it('should have size as pages count', function() {
          var pages = [1, 2, 3, 4, 5];
          var collection = PageCollection.create(pages);
          expect(collection.size()).toEqual(pages.length);
        });

        it('should contain page models with proper attributes', function() {
          var collection = PageCollection.create([1], 1);

          var modelPage = collection.at(0);
          expect(modelPage.get('page')).toBe(1);
          expect(modelPage.get('selected')).toBe(true);
        });

        it('should contain page models with proper attributes', function() {
          var collection = PageCollection.create([3, 4, 5, 6, 7], 5);

          var modelPage1 = collection.at(0);
          expect(modelPage1.get('page')).toBe(3);
          expect(modelPage1.get('selected')).toBe(false);

          var modelPage2 = collection.at(1);
          expect(modelPage2.get('page')).toEqual(4);
          expect(modelPage2.get('selected')).toBe(false);

          var modelPage3 = collection.at(2);
          expect(modelPage3.get('page')).toEqual(5);
          expect(modelPage3.get('selected')).toBe(true);

          var modelPage4 = collection.at(3);
          expect(modelPage4.get('page')).toEqual(6);
          expect(modelPage4.get('selected')).toBe(false);

          var modelPage5 = collection.at(4);
          expect(modelPage5.get('page')).toEqual(7);
          expect(modelPage5.get('selected')).toBe(false);
        });
      });
    });
  });
});