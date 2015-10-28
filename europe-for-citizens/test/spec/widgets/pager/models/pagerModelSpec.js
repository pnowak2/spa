define(function(require) {

  var Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel');

  describe('Pager Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(PagerModel.prototype).toEqual(jasmine.any(Backbone.Model));
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

      it('can be overriden and passed to initialize method', function() {
        spyOn(PagerModel.prototype, 'initialize');

        var model = new PagerModel({
          total: 5
        });

        expect(model.initialize).toHaveBeenCalledWith({
          total: 5
        });
      });

      it('can be overriden', function() {
        var model = new PagerModel({
          total: 50
        });

        expect(model.toJSON()).toEqual({
          total: 50,
          pageSize: 10,
          currentPage: 1
        });
      });
    });

    describe('creation', function() {
      it('should throw for zero page size', function() {
        var createZeroPageModel = function() {
          new PagerModel({
            pageSize: 0
          })
        }

        expect(createZeroPageModel).toThrowError('page size cannot be zero');
      });
    });

    describe('api', function() {

      describe('.getTotal()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getTotal).toEqual(jasmine.any(Function));
        });

        it('returns total items number', function() {
          var model = new PagerModel({
            total: 50
          });

          expect(model.getTotal()).toEqual(50);
        });
      });

      describe('.getPageSize()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPageSize).toEqual(jasmine.any(Function));
        });

        it('returns size of the page', function() {
          var model = new PagerModel({
            pageSize: 12
          });

          expect(model.getPageSize()).toEqual(12);
        });
      });

      describe('.getCurrentPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getCurrentPage).toEqual(jasmine.any(Function));
        });

        it('returns number of current page', function() {
          var model = new PagerModel({
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);
        });
      });

      describe('.nextPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.nextPage).toEqual(jasmine.any(Function));
        });

        xit('should increment current page by one and return that number', function() {
          var model = new PagerModel({
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          var nextPage = model.nextPage();

          expect(nextPage).toEqual(7);
          expect(model.getCurrentPage()).toEqual(7);
        });
      });

      describe('.getPages()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPages).toEqual(jasmine.any(Function));
        });

        it('should return correct value for 0 items', function() {
          var model = new PagerModel({
            total: 0,
            pageSize: 10
          });

          expect(model.getPages()).toBe(0);
        });

        it('should return correct value for 1 item', function() {
          var model = new PagerModel({
            total: 1,
            pageSize: 10
          });

          expect(model.getPages()).toBe(1);
        });

        it('should return correct value for many items', function() {
          var model1 = new PagerModel({
              total: 100,
              pageSize: 10
            }),
            model2 = new PagerModel({
              total: 100,
              pageSize: 20
            }),
            model3 = new PagerModel({
              total: 29,
              pageSize: 10
            }),
            model4 = new PagerModel({
              total: 20,
              pageSize: 3
            });

          expect(model1.getPages()).toBe(10);
          expect(model2.getPages()).toBe(5);
          expect(model3.getPages()).toBe(3);
          expect(model4.getPages()).toBe(7);
        });
      });
    });
  });
});