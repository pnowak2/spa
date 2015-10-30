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
          pageSize: 10,
          currentPage: 1,
          pageWindowSize: 5
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
          totalItems: 462,
          pageSize: 16,
          currentPage: 6
        });

        expect(model.toJSON()).toEqual(jasmine.objectContaining({
          totalItems: 462,
          pageSize: 16,
          currentPage: 6,
          pagesCount: 29
        }));
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

      it('should be possible to create with page window size bigger than pages count', function() {
        var model = new PagerModel({
          totalItems: 100,
          pageSize: 10,
          currentPage: 5,
          pageWindowSize: 20
        });

        expect(model.getPageWindowSize()).toEqual(10);
        expect(model.get('pageWindowSize')).toEqual(10);
      });

      it('should throw for not numerical values', function() {
        expect(function() {
          new PagerModel({
            totalItems: 'a'
          });
        }).toThrowError('attribute should be numerical');

        expect(function() {
          new PagerModel({
            pageSize: 'a'
          });
        }).toThrowError('attribute should be numerical');

        expect(function() {
          new PagerModel({
            currentPage: 'a'
          });
        }).toThrowError('attribute should be numerical');

        expect(function() {
          new PagerModel({
            pageWindowSize: 'a'
          });
        }).toThrowError('attribute should be numerical');

        expect(function() {
          new PagerModel({
            totalItems: undefined,
            pageSize: undefined,
            currentPage: undefined,
            pageWindowSize: undefined
          });
        }).toThrowError('attribute should be numerical');
      });

      it('should throw for negative totalItems', function() {
        expect(function() {
          new PagerModel({
            totalItems: -22
          });
        }).toThrowError('total items cannot be negative');
      });

      it('should throw for zero or negative page size', function() {
        expect(function() {
          new PagerModel({
            pageSize: 0
          });
        }).toThrowError('page size cannot be zero or negative');

        expect(function() {
          new PagerModel({
            pageSize: -20
          });
        }).toThrowError('page size cannot be zero or negative');
      });

      it('should throw for zero or negative page window size', function() {
        expect(function() {
          new PagerModel({
            pageWindowSize: 0
          });
        }).toThrowError('page window size cannot be zero or negative');

        expect(function() {
          new PagerModel({
            pageWindowSize: -2
          });
        }).toThrowError('page window size cannot be zero or negative');
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

        it('should not accept non numerical values and use first page instead', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 5
          });

          model.setCurrentPage('a');
          expect(model.getCurrentPage()).toEqual(1);
        });
      });

      describe('.getFirstPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getFirstPage).toEqual(jasmine.any(Function));
        });

        it('should give the number of first page', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 5
          });

          expect(model.getFirstPage()).toEqual(1);
        });
      });

      describe('.getLastPage()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getLastPage).toEqual(jasmine.any(Function));
        });

        it('should give the number of last page', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 5
          });

          expect(model.getLastPage()).toEqual(10);
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

      describe('.getPageWindowSize()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPageWindowSize).toEqual(jasmine.any(Function));
        });

        it('should return page window size', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pageWindowSize: 3
          });

          expect(model.getPageWindowSize()).toEqual(3);
        });
      });

      describe('.setPageWindowSize()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.setPageWindowSize).toEqual(jasmine.any(Function));
        });

        it('should set the page window size', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pageWindowSize: 5
          });

          expect(model.getPageWindowSize()).toEqual(5);

          model.setPageWindowSize(2);

          expect(model.getPageWindowSize()).toEqual(2);
        });

        it('should not accept non numerical values and use pages count instead', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 2,
            pageWindowSize: 5
          });

          model.setPageWindowSize('a');
          expect(model.getPageWindowSize()).toEqual(10);
        });
      });

      describe('.getPagedWindow()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPagedWindow).toEqual(jasmine.any(Function));
        });

        describe('odd page window size', function() {
          it('should return array of pages at the beginning of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);
          });

          it('should return array of pages close to middle of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);
          });

          it('should return array of pages in the middle of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 6,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([4, 5, 6, 7, 8]);
          });

          it('should return array of pages close to end of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 9,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([6, 7, 8, 9, 10]);
          });

          it('should return array of pages at the end of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 10,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([6, 7, 8, 9, 10]);
          });
        });

        describe('even page window size', function() {
          it('should return array of pages at the beginning of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5, 6]);
          });

          it('should return array of pages close to middle of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5, 6]);
          });

          it('should return array of pages in the middle of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 4,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([2, 3, 4, 5, 6, 7]);
          });

          it('should return array of pages close to end of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 9,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([5, 6, 7, 8, 9, 10]);
          });

          it('should return array of pages at the end of paging', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 10,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([5, 6, 7, 8, 9, 10]);
          });
        });

        describe('other page window combinations', function() {
          it('should behave properly for page window size set to one', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 5,
              pageWindowSize: 1
            });

            expect(model.getPagedWindow()).toEqual([5]);
          });

          it('should behave properly for page window size set to pages count', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 5,
              pageWindowSize: 10
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          });

          it('should behave properly for page window size set to more than pages count', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 5,
              pageWindowSize: 15
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          });

          it('should behave properly for page window size set to more than pages count', function() {
            var model = new PagerModel({
              totalItems: 80,
              pageSize: 10,
              currentPage: 1,
              pageWindowSize: 5
            });

            expect(model.isFirstPageSelected()).toBe(true);
            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([2, 3, 4, 5, 6]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([3, 4, 5, 6, 7]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([4, 5, 6, 7, 8]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([4, 5, 6, 7, 8]);

            model.nextPage();
            expect(model.getPagedWindow()).toEqual([4, 5, 6, 7, 8]);
            expect(model.isLastPageSelected()).toBe(true);
          });
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
            currentPage: 1,
            pageWindowSize: 3
          });

          expect(model1.toJSON()).toEqual({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pageWindowSize: 3,
            pagesCount: 10,
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