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

      it('can be overriden using constructor', function() {
        spyOn(PagerModel.prototype, 'initialize');

        var model = new PagerModel({
          totalItems: 5
        });

        expect(model.initialize).toHaveBeenCalledWith({
          totalItems: 5
        });
      });

      it('can be overriden using constructor and preserve not overriden properties from defaults', function() {
        var model = new PagerModel({
          totalItems: 462,
          pageWindowSize: 3
        });

        expect(model.get('totalItems')).toEqual(462);
        expect(model.get('pageSize')).toEqual(10);
        expect(model.get('currentPage')).toEqual(1);
        expect(model.get('pageWindowSize')).toEqual(3);
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

        expect(model.getPageWindowSize()).toEqual(20);
        expect(model.get('pageWindowSize')).toEqual(20);
      });

      it('should throw for not numerical values in constructor', function() {
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
      describe('.update()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should fully update defaults', function() {
          var model = new PagerModel;

          model.update({
            totalItems: 250,
            pageSize: 11,
            currentPage: 3,
            pageWindowSize: 8
          });

          expect(model.getTotalItems()).toEqual(250);
          expect(model.getPageSize()).toEqual(11);
          expect(model.getCurrentPage()).toEqual(3);
          expect(model.getPageWindowSize()).toEqual(8);
        });

        it('should not touch defaults when empty options', function() {
          var model = new PagerModel;

          model.update();

          expect(model.getTotalItems()).toEqual(PagerModel.prototype.defaults.totalItems);
          expect(model.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
          expect(model.getCurrentPage()).toEqual(PagerModel.prototype.defaults.currentPage);
          expect(model.getPageWindowSize()).toEqual(PagerModel.prototype.defaults.pageWindowSize);
        });

        it('should update just totalItems and take rest from defaults', function() {
          var model = new PagerModel;

          model.update({
            totalItems: 3000
          });

          expect(model.getTotalItems()).toEqual(3000);
          expect(model.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
          expect(model.getCurrentPage()).toEqual(PagerModel.prototype.defaults.currentPage);
          expect(model.getPageWindowSize()).toEqual(PagerModel.prototype.defaults.pageWindowSize);
        });

        it('should update just currentPage and take rest from defaults', function() {
          var model = new PagerModel({
            totalItems: 10000
          });

          model.update({
            currentPage: 16
          });

          expect(model.getTotalItems()).toEqual(10000);
          expect(model.getPageSize()).toEqual(PagerModel.prototype.defaults.pageSize);
          expect(model.getCurrentPage()).toEqual(16);
          expect(model.getPageWindowSize()).toEqual(PagerModel.prototype.defaults.pageWindowSize);
        });

        it('should partially update model and take rest from defaults', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 2
          });

          model.update({
            totalItems: 200,
            pageSize: 3
          });

          expect(model.getTotalItems()).toEqual(200);
          expect(model.getPageSize()).toEqual(3);
          expect(model.getCurrentPage()).toEqual(2);
          expect(model.getPageWindowSize()).toEqual(PagerModel.prototype.defaults.pageWindowSize);
        });
      });

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

      describe('.setTotalItems()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.setTotalItems).toEqual(jasmine.any(Function));
        });

        it('should set the total items', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getTotalItems()).toEqual(100);

          model.setTotalItems(300);

          expect(model.getTotalItems()).toEqual(300);
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

      describe('.setPageSize()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.setPageSize).toEqual(jasmine.any(Function));
        });

        it('should set the page size', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 6
          });

          expect(model.getPageSize()).toEqual(10);

          model.setPageSize(3);

          expect(model.getPageSize()).toEqual(3);
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

      describe('.getStartFromItem()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getStartFromItem).toEqual(jasmine.any(Function));
        });

        it('should return starting position item number for paging', function() {
          var model1 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 2
            }),
            model2 = new PagerModel({
              totalItems: 100,
              pageSize: 5,
              currentPage: 3
            }),
            model3 = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 7
            });

          expect(model1.getStartFromItem()).toEqual(10);
          expect(model2.getStartFromItem()).toEqual(10);
          expect(model3.getStartFromItem()).toEqual(60);
        });

        it('should return proper value if current page bigger than pages available', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 20
          });

          expect(model.getStartFromItem()).toEqual(90);
        });

        it('should return proper value if total items is zero', function() {
          var model = new PagerModel({
            totalItems: 0,
            pageSize: 10,
            currentPage: 20
          });

          expect(model.getStartFromItem()).toEqual(0);
        });

        it('should return proper value if theres just one page', function() {
          var model = new PagerModel({
            totalItems: 10,
            pageSize: 10,
            currentPage: 1
          });

          expect(model.getStartFromItem()).toEqual(0);
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

        it('should decrement current page, but not get below one', function() {
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

      describe('.hasItems()', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.hasItems).toEqual(jasmine.any(Function));
        });

        it('should return false if number of items is zero', function() {
          var model = new PagerModel({
            totalItems: 0
          });

          expect(model.hasItems()).toBe(false);
        });

        it('should return true if number of items is greater than zero', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1
          });

          expect(model.hasItems()).toBe(true);
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

        it('should return size of the window - visible pages to choose', function() {
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

        it('should not accept negative page window size', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pageWindowSize: 5
          });

          expect(model.getPageWindowSize()).toEqual(5);

          model.setPageWindowSize(-2);

          expect(model.getPageWindowSize()).toEqual(1);
        });

        it('should not accept non numerical values and use smallest page window size', function() {
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 2,
            pageWindowSize: 5
          });

          model.setPageWindowSize('a');
          expect(model.getPageWindowSize()).toEqual(1);
        });
      });

      describe('.getPagedWindow() - Array of pages visible to select', function() {
        it('should be defined', function() {
          expect(PagerModel.prototype.getPagedWindow).toEqual(jasmine.any(Function));
        });

        describe('odd page window size', function() {
          it('should return array of pages at the beginning of paging - first page selected', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);
          });

          it('should return array of pages close to middle of paging - first page still visible in page window but not selected', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5]);
          });

          it('should return array of pages in the middle of paging - first page not visible in page window', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 6,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([4, 5, 6, 7, 8]);
          });

          it('should return array of pages close to end of paging - last page visible in window but not selected yet', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 9,
              pageWindowSize: 5
            });

            expect(model.getPagedWindow()).toEqual([6, 7, 8, 9, 10]);
          });

          it('should return array of pages at the end of paging - last page selected', function() {
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
          it('should return array of pages at the beginning of paging - first page selected', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5, 6]);
          });

          it('should return array of pages close to middle of paging - first page still visible in page window but not selected', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([1, 2, 3, 4, 5, 6]);
          });

          it('should return array of pages in the middle of paging - first page not visible in page window', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 4,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([2, 3, 4, 5, 6, 7]);
          });

          it('should return array of pages close to end of paging - last page visible in window but not selected yet', function() {
            var model = new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 9,
              pageWindowSize: 6
            });

            expect(model.getPagedWindow()).toEqual([5, 6, 7, 8, 9, 10]);
          });

          it('should return array of pages at the end of paging - last page selected', function() {
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
          it('should behave properly for total items set to one', function() {
            var model = new PagerModel({
              totalItems: 1,
              pageSize: 10,
              currentPage: 5,
              pageWindowSize: 1
            });

            expect(model.getPagedWindow()).toEqual([1]);
          });

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

          it('should behave properly for iterating through the pages one by one', function() {
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

            model.previousPage();
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
          var model = new PagerModel({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pageWindowSize: 3
          });

          expect(model.toJSON()).toEqual({
            totalItems: 100,
            pageSize: 10,
            currentPage: 1,
            pageWindowSize: 3,
            startFromItem: 0,
            pagesCount: 10,
            hasItems: true,
            isFirstPage: true,
            isLastPage: false
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

      it('model changes should trigger change event', function(done) {
        this.model.on('change', function(model) {
          expect(model.getPagesCount()).toEqual(20);
          done();
        }, this);

        this.model.set('totalItems', 200);
      });

      it('.setCurrentPage() should trigger change event', function(done) {
        this.model.on('change:currentPage', function(model) {
          expect(model.getCurrentPage()).toEqual(3);
          done();
        });

        this.model.setCurrentPage(3);
      });

      it('.setCurrentPage() should not trigger change event when setting page to the same currently set', function(done) {
        this.model.on('change:currentPage', function(model) {
          fail('should not trigger change event for the same page');
        });

        this.model.setCurrentPage(2);
        expect(this.model.getCurrentPage()).toEqual(2);
        done();
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