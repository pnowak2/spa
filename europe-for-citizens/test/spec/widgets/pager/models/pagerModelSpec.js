define(function(require) {

  var Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel');

  describe('Pager Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(PagerModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('api', function() {
      describe('.pages()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.pages).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('defaults', function() {
      it('should be defined', function() {
        expect(PagerModel.prototype.defaults).toEqual({
          total: 0,
          pageSize: 10,
          currentPage: 1
        });
      });
    });
  });
});