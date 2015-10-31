define(function(require) {
  var Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PageModel = require('app/widgets/pager/models/pageModel'),
    PagerView = require('app/widgets/pager/views/pagerView'),
    PageCollection = require('app/widgets/pager/collections/pageCollection'),
    eventBus = require('app/widgets/pager/events/eventBus');

  describe('Pager View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagerView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should throw if created without model', function() {
        expect(function() {
          new PagerView
        }).toThrowError('model is not of correct type')
      });

      it('should throw if model type is not correct', function() {
        expect(function() {
          new PagerView({
            model: {}
          })
        }).toThrowError('model is not of correct type')
      });
    });

    describe('properties', function() {
      beforeEach(function() {
        this.view = new PagerView({
          model: new PagerModel
        })
      });

      it('.tagName', function() {
        expect(this.view.tagName).toEqual('div');
      });

      it('.className', function() {
        expect(this.view.className).toEqual('efc-pager');
      });
    });

    describe('api', function() {
      describe('.modelDidChange()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.modelDidChange).toEqual(jasmine.any(Function));
        });

        it('should rerender on model change', function() {
          spyOn(PagerView.prototype, 'render');

          var view = new PagerView({
            model: new PagerModel
          })

          expect(view.render).not.toHaveBeenCalled();
          view.modelDidChange();
          expect(view.render).toHaveBeenCalled();
        });
      });

      describe('.didClickPageButton()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.didClickPageButton).toEqual(jasmine.any(Function));
        });

        it('should set the current page on model', function() {
          spyOn(PagerModel.prototype, 'setCurrentPage');

          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1
            })
          });

          view.model.setCurrentPage.calls.reset();

          view.didClickPageButton(9);

          expect(view.model.setCurrentPage).toHaveBeenCalledWith(9);
          expect(view.model.setCurrentPage.calls.count()).toBe(1);
        });
      });

      describe('control buttons', function() {
        beforeEach(function() {
          this.view = new PagerView({
            model: new PagerModel
          });
        });

        describe('.didClickFirstPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickFirstPageButton).toEqual(jasmine.any(Function));
          });

          it('should request first page on model', function() {
            spyOn(PagerModel.prototype, 'firstPage');
            this.view.didClickFirstPageButton();
            expect(this.view.model.firstPage).toHaveBeenCalled();
          });
        });

        describe('.didClickPreviousPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickPreviousPageButton).toEqual(jasmine.any(Function));
          });

          it('should request previous page on model', function() {
            spyOn(PagerModel.prototype, 'previousPage');
            this.view.didClickPreviousPageButton();
            expect(this.view.model.previousPage).toHaveBeenCalled();
          });
        });

        describe('.didClickNextPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickNextPageButton).toEqual(jasmine.any(Function));
          });

          it('should request next page on model', function() {
            spyOn(PagerModel.prototype, 'nextPage');
            this.view.didClickNextPageButton();
            expect(this.view.model.nextPage).toHaveBeenCalled();
          });
        });

        describe('.didClickLastPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickLastPageButton).toEqual(jasmine.any(Function));
          });

          it('should request last page on model', function() {
            spyOn(PagerModel.prototype, 'lastPage');
            this.view.didClickLastPageButton();
            expect(this.view.model.lastPage).toHaveBeenCalled();
          });
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should call method on model change', function() {
          spyOn(PagerView.prototype, 'modelDidChange');

          var view = new PagerView({
            model: new PagerModel
          });

          expect(view.modelDidChange).not.toHaveBeenCalled();
          view.model.trigger('change');
          expect(view.modelDidChange).toHaveBeenCalled();
          expect(view.modelDidChange.calls.count()).toBe(1);
        });

        it('should listen to event bus for page selection', function() {
          spyOn(PagerView.prototype, 'didClickPageButton');
          var view = new PagerView({
            model: new PagerModel
          });

          expect(view.didClickPageButton).not.toHaveBeenCalled();

          eventBus.trigger('pager:page:selected', 7);

          expect(view.didClickPageButton).toHaveBeenCalledWith(7);
          expect(view.didClickPageButton.calls.count()).toBe(1);
        });
      });

      describe('dom', function() {

      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new PagerView({
            model: new PagerModel
          });

          expect(view.render()).toBe(view);
        });

        it('should create collection to iterate through', function() {
          spyOn(PageCollection, 'create').and.callThrough();

          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3,
              pageWindowSize: 5
            })
          });

          expect(PageCollection.create).not.toHaveBeenCalled();
          view.render();
          expect(PageCollection.create).toHaveBeenCalledWith(
            view.model.getPagedWindow(),
            view.model.getCurrentPage()
          );
        });
      });
    });
  });
});