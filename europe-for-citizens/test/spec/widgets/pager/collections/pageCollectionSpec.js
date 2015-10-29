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
      it('should have page model defined', function() {
        var collection = new PageCollection;
        expect(collection.model).toEqual(PageModel);
      });
    });
  });
});