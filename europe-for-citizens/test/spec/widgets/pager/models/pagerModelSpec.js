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
          totalItems: 0,
          pageSize: 15,
          currentPage: 1
        });
      });

      it('can be passed to initialize method', function() {
        spyOn(PagerModel.prototype, 'initialize');

        var model = new PagerModel({
          totalItems: 5
        });

        expect(model.initialize).toHaveBeenCalledWith({
          totalItems: 5
        });
      });

      it('can be overriden', function() {
        var model = new PagerModel({
          totalItems: 50,
          pageSize: 10,
          currentPage: 1
        });

        expect(model.toJSON()).toEqual({
          totalItems: 50,
          pageSize: 10,
          currentPage: 1,
          pagesCount: 5
        });
      });
    });

    describe('creation', function() {
      it('should be possible to create without arguments', function() {
        var model = new PagerModel;

        expect(model.getCurrentPage()).toEqual(PagerModel.prototype.defaults.currentPage);
        expect(model.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
        expect(model.getTotalItems()).toEqual(PagerModel.prototype.defaults.totalItems);
        expect(model.getPagesCount()).toEqual(1);
      });

      it('should be possible to create with empty argument object', function() {
        var model = new PagerModel({});

        expect(model.getCurrentPage()).toEqual(PagerModel.prototype.defaults.currentPage);
        expect(model.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
        expect(model.getTotalItems()).toEqual(PagerModel.prototype.defaults.totalItems);
        expect(model.getPagesCount()).toEqual(1);
      });

      it('should be possible to create with partial options', function() {
        var model1 = new PagerModel({
            totalItems: 0,
          }),
          model2 = new PagerModel({
            pageSize: 5,
          }),
          model3 = new PagerModel({
            currentPage: 3,
          });

        expect(model1.getCurrentPage()).toEqual(PagerModel.prototype.defaults.currentPage);
        expect(model1.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
        expect(model1.getTotalItems()).toEqual(0);
        expect(model1.getPagesCount()).toEqual(1);

        expect(model2.getCurrentPage()).toEqual(PagerModel.prototype.defaults.currentPage);
        expect(model2.getPageSize()).toEqual(5);
        expect(model2.getTotalItems()).toEqual(PagerModel.prototype.defaults.totalItems);
        expect(model2.getPagesCount()).toEqual(1);

        expect(model3.getCurrentPage()).toEqual(1);
        expect(model3.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
        expect(model3.getTotalItems()).toEqual(PagerModel.prototype.defaults.totalItems);
        expect(model3.getPagesCount()).toEqual(1);
      });

      it('should be possible to have totalItems zero', function() {
        expect(function() {
          new PagerModel({
            totalItems: 0,
            pageSize: 10,
            currentPage: 1
          });
        }).not.toThrow();
      });

      it('should be possible to create with current page bigger than pages count', function() {
        var model = new PagerModel({
          totalItems: 100,
          pageSize: 10,
          currentPage: 25
        });

        expect(model.getCurrentPage()).toEqual(10);
        expect(model.getPageSize()).toEqual(10);
        expect(model.getTotalItems()).toEqual(100);
      });

      it('should be possible to create with current page lower than pages count', function() {
        var model = new PagerModel({
          totalItems: 100,
          pageSize: 10,
          currentPage: -6
        });

        expect(model.getCurrentPage()).toEqual(1);
        expect(model.getPageSize()).toEqual(10);
        expect(model.getTotalItems()).toEqual(100);
      });

      it('should be possible to create with current page set to zero', function() {
        var model = new PagerModel({
          totalItems: 10,
          pageSize: 10,
          currentPage: 0
        });

        expect(model.getCurrentPage()).toEqual(1);
        expect(model.getPageSize()).toEqual(10);
        expect(model.getTotalItems()).toEqual(10);
      });

      it('should be possible to create with zero items and current page bigger than one', function() {
        var model = new PagerModel({
          totalItems: 0,
          pageSize: 10,
          currentPage: 5
        });

        expect(model.getCurrentPage()).toEqual(1);
        expect(model.getPageSize()).toEqual(10);
        expect(model.getTotalItems()).toEqual(0);
      });

      it('should throw for negative totalItems', function() {
        expect(function() {
          new PagerModel({
            totalItems: -22
          });
        }).toThrowError('total items cannot be negative');
      });

      it('should throw for zero page size', function() {
        expect(function() {
          new PagerModel({
            pageSize: 0
          });
        }).toThrowError('page size cannot be zero or negative');
      });

      it('should throw for negative page size', function() {
        expect(function() {
          new PagerModel({
            pageSize: -20
          });
        }).toThrowError('page size cannot be zero or negative');
      });
    });

    describe('api', function() {
      describe('.getPagesCount()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPagesCount).toEqual(jasmine.any(Function));
        });

        it('should return correct value for 0 items', function() {
          var model = new PagerModel({
            totalItems: 0,
            pageSize: 10
          });

          expect(model.getPagesCount()).toBe(1);
        });

        it('should return correct value for 1 item', function() {
          var model = new PagerModel({
            totalItems: 1,
            pageSize: 10
          });

          expect(model.getPagesCount()).toBe(1);
        });

        it('should return correct value for many items', function() {
          var model1 = new PagerModel({
              totalItems: 100,
              pageSize: 10
            }),
            model2 = new PagerModel({
              totalItems: 100,
              pageSize: 20
            }),
            model3 = new PagerModel({
              totalItems: 29,
              pageSize: 10
            }),
            model4 = new PagerModel({
              totalItems: 20,
              pageSize: 3
            }),
            model5 = new PagerModel({
              totalItems: 17,
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

        it('should return total items number', function() {
          var model = new PagerModel({
            totalItems: 50
          });

          expect(model.getTotalItems()).toEqual(50);
        });
      });

      describe('.getPageSize()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPageSize).toEqual(jasmine.any(Function));
        });

        it('should return size of the page', function() {
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

        it('should return number of current page', function() {
          var model = new PagerModel({
            totalItems: 100,
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

        it('should set the current page', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.setCurrentPage(2);

          expect(model.getCurrentPage()).toEqual(2);
        });

        it('should not exceed the total pages count', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 4
          });

          expect(model.getCurrentPage()).toEqual(4);
          model.setCurrentPage(200);
          expect(model.getCurrentPage()).toEqual(10);
        });

        it('should not be lower than 1', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1
          })

          expect(model.getCurrentPage()).toEqual(1);
          model.setCurrentPage(-10);
          expect(model.getCurrentPage()).toEqual(1);
        });
      });

      describe('.nextPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.nextPage).toEqual(jasmine.any(Function));
        });

        it('should increment current page by one', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.nextPage();

          expect(model.getCurrentPage()).toEqual(7);
        });


        it('should not exceed the total pages count', function() {
          var model = new PagerModel({
            totalItems: 10,
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
            totalItems: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getCurrentPage()).toEqual(6);

          model.previousPage();

          expect(model.getCurrentPage()).toEqual(5);
        });

        it('should not get below one', function() {
          var model = new PagerModel({
            totalItems: 10,
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
            totalItems: 100,
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
            totalItems: 100,
            pageSize: 10,
            currentPage: 1
          });

          expect(model.getCurrentPage()).toEqual(1);

          model.lastPage();

          expect(model.getCurrentPage()).toEqual(10);
        });
      });

      describe('.isFirstPageSelected()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.isFirstPageSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if current page is also a first page', function() {
          var model1 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1
            }),
            model2 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3
            }),
            model3 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: -6
            }),
            model4 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 0
            });

          expect(model1.isFirstPageSelected()).toBe(true);
          expect(model2.isFirstPageSelected()).toBe(false);
          expect(model3.isFirstPageSelected()).toBe(true);
          expect(model4.isFirstPageSelected()).toBe(true);
        });
      });

      describe('.isLastPageSelected()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.isLastPageSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if current page is also a last page', function() {
          var model1 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 10
            }),
            model2 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3
            }),
            model3 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 22
            });

          expect(model1.isLastPageSelected()).toBe(true);
          expect(model2.isLastPageSelected()).toBe(false);
          expect(model3.isLastPageSelected()).toBe(true);
        });
      });

      describe('.toJSON()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.toJSON).toEqual(jasmine.any(Function));
        });

        it('should return attributes of model', function() {
          var model1 = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1
          });

          expect(model1.toJSON()).toEqual({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pagesCount: 10
          });
        });
      });
    });

    describe('events', function() {

      beforeEach(function() {
        this.model = new PagerModel({
          totalItems: 100,
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