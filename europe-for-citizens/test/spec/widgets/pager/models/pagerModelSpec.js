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
      it('should be defined with proper values', function() {
        expect(PagerModel.prototype.defaults).toEqual({
          total: 0,
          pageSize: 10,
          currentPage: 1
        });
      });

      it('can be passed to initialize method', function() {
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
        expect(function() {
          new PagerModel({
            pageSize: 0
          })
        }).toThrowError('page size cannot be zero');
      });

      it('should throw if current page is bigger than total pages', function() {
        expect(function() {
          new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 11
          })
        }).toThrowError('current page is beyond pages count');
      });

      it('should throw if current page is smaller than 0', function() {
        expect(function() {
          new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: -1
          })
        }).toThrowError('current page is beyond pages count');
      });
    });

    describe('validation', function() {
      it('should implement validate method', function() {
        expect(PagerModel.prototype.validate).toEqual(jasmine.any(Function));
      });

      it('should not exceed the total pages count', function() {
        var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 4
          }),
          validationSpy = jasmine.createSpy();

        model.on('invalid', validationSpy);

        expect(model.getCurrentPage()).toEqual(4);
        model.setCurrentPage(200);
        expect(model.getCurrentPage()).toEqual(4);

        expect(validationSpy).toHaveBeenCalled();
      });

      it('should not be lower than 1', function() {
        var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 1
          }),
          validationSpy = jasmine.createSpy();

        model.on('invalid', validationSpy);

        expect(model.getCurrentPage()).toEqual(1);
        model.setCurrentPage(-10);
        expect(model.getCurrentPage()).toEqual(1);

        expect(validationSpy).toHaveBeenCalled();
      });
    });

    describe('api', function() {
      describe('.getPagesCount()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPagesCount).toEqual(jasmine.any(Function));
        });

        it('should return correct value for 0 items', function() {
          var model = new PagerModel({
            total: 0,
            pageSize: 10
          });

          expect(model.getPagesCount()).toBe(0);
        });

        it('should return correct value for 1 item', function() {
          var model = new PagerModel({
            total: 1,
            pageSize: 10
          });

          expect(model.getPagesCount()).toBe(1);
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
            }),
            model5 = new PagerModel({
              total: 17,
              pageSize: 1
            });

          expect(model1.getPagesCount()).toBe(10);
          expect(model2.getPagesCount()).toBe(5);
          expect(model3.getPagesCount()).toBe(3);
          expect(model4.getPagesCount()).toBe(7);
          expect(model5.getPagesCount()).toBe(17);
        });
      });

      describe('.getTotalItems()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getTotalItems).toEqual(jasmine.any(Function));
        });

        it('returns total items number', function() {
          var model = new PagerModel({
            total: 50
          });

          expect(model.getTotalItems()).toEqual(50);
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
            total: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);
        });
      });

      describe('.setCurrentPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.setCurrentPage).toEqual(jasmine.any(Function));
        });

        it('sets the current page', function() {
          var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.setCurrentPage(2);

          expect(model.getCurrentPage()).toEqual(2);
        });
      });

      describe('.nextPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.nextPage).toEqual(jasmine.any(Function));
        });

        it('should increment current page by one', function() {
          var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.nextPage();

          expect(model.getCurrentPage()).toEqual(7);
        });


        it('should not exceed the total pages count', function() {
          var model = new PagerModel({
            total: 10,
            pageSize: 2,
            currentPage: 4
          });

          expect(model.getCurrentPage()).toEqual(4);

          model.nextPage();

          expect(model.getCurrentPage()).toEqual(5);

          model.nextPage();

          expect(model.getCurrentPage()).toEqual(5);
        });
      });

      describe('.previousPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.previousPage).toEqual(jasmine.any(Function));
        });

        it('should decrement current page by one', function() {
          var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.previousPage();

          expect(model.getCurrentPage()).toEqual(5);
        });

        it('should not get below one', function() {
          var model = new PagerModel({
            total: 10,
            pageSize: 2,
            currentPage: 2
          });

          expect(model.getCurrentPage()).toEqual(2);

          model.previousPage();

          expect(model.getCurrentPage()).toEqual(1);

          model.previousPage();

          expect(model.getCurrentPage()).toEqual(1);
        });
      });

      describe('.firstPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.firstPage).toEqual(jasmine.any(Function));
        });

        it('should set current page to first page', function() {
          var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.firstPage();

          expect(model.getCurrentPage()).toEqual(1);
        });
      });

      describe('.lastPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.lastPage).toEqual(jasmine.any(Function));
        });

        it('should set current page to last page number', function() {
          var model = new PagerModel({
            total: 100,
            pageSize: 10,
            currentPage: 1
          });

          expect(model.getCurrentPage()).toEqual(1);

          model.lastPage();

          expect(model.getCurrentPage()).toEqual(10);
        });
      });
    });

    describe('events', function() {

      beforeEach(function() {
        this.model = new PagerModel({
          total: 100,
          pageSize: 10,
          currentPage: 2
        });
      });

      it('.nextPage() should trigger change event', function(done) {
        this.model.on('change:currentPage', function(model) {
          expect(model.getCurrentPage()).toEqual(3);
          done();
        });

        this.model.nextPage();
      });

      it('.previousPage() should trigger change event', function(done) {
        this.model.on('change:currentPage', function(model) {
          expect(model.getCurrentPage()).toEqual(1);
          done();
        });

        this.model.previousPage();
      });

      it('.firstPage() should trigger change event', function(done) {
        this.model.on('change:currentPage', function(model) {
          expect(model.getCurrentPage()).toEqual(1);
          done();
        });

        this.model.firstPage();
      });

      it('.lastPage() should trigger change event', function(done) {
        this.model.on('change:currentPage', function(model) {
          expect(model.getCurrentPage()).toEqual(10);
          done();
        });

        this.model.lastPage();
      });
    });
  });
});