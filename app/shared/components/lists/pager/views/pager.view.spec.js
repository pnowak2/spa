define(function(require) {
  var Backbone = require('backbone'),
    PagerModel = require('../models/pager.model'),
    PageModel = require('../models/page.model'),
    PagerView = require('./pager.view'),
    PageView = require('./page.view'),
    PageCollection = require('../collections/page.collection');

  describe('Pager View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagerView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should have default model', function() {
        var view = new PagerView;
        expect(view.model).toEqual(jasmine.any(PagerModel));
      });

      it('should accept model in constructor', function() {
        var pagerModel = new PagerModel(),
          view = new PagerView({
            model: pagerModel
          });

        expect(view.model).toBe(pagerModel);
      });

      it('should not throw if created without model', function() {
        expect(function() {
          new PagerView
        }).not.toThrow();
      });

      it('should throw if model passed but is undefined', function() {
        expect(function() {
          new PagerView({
            model: undefined
          });
        }).toThrowError('model is not of correct type');
      });

      it('should throw if model passed but is null', function() {
        expect(function() {
          new PagerView({
            model: null
          });
        }).toThrowError('model is not of correct type');
      });

      it('should throw if passed model type is not correct', function() {
        expect(function() {
          new PagerView({
            model: {}
          });
        }).toThrowError('model is not of correct type');

        expect(function() {
          new PagerView({
            model: ''
          });
        }).toThrowError('model is not of correct type');
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(PagerView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(PagerView.prototype.className).toEqual('vlr-pager');
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to model', function() {
          var view = new PagerView({
              model: new PagerModel
            }),
            fakeData = {};

          spyOn(view.model, 'update');

          view.update(fakeData);

          expect(view.model.update.calls.count()).toBe(1);
          expect(view.model.update.calls.mostRecent().args[0]).toBe(fakeData);
        });
      });

      describe('.didChangeCurrentPage()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.didChangeCurrentPage).toEqual(jasmine.any(Function));
        });

        it('should trigger view event with pager details', function() {
          spyOn(PagerView.prototype, 'trigger');

          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3
            })
          });

          view.didChangeCurrentPage();

          expect(view.trigger).toHaveBeenCalledWith('pager:page:selected', view.model.toJSON());
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

      describe('page control buttons - first, previous, next, last', function() {
        beforeEach(function() {
          this.evt = jasmine.createSpyObj('e', ['preventDefault']);
          this.view = new PagerView;
        });

        describe('.didClickFirstPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickFirstPageButton).toEqual(jasmine.any(Function));
          });

          it('should request first page on model', function() {
            spyOn(PagerModel.prototype, 'firstPage');
            this.view.didClickFirstPageButton(this.evt);
            expect(this.view.model.firstPage).toHaveBeenCalled();
          });

          it('prevents default action', function() {
            this.view.didClickFirstPageButton(this.evt);
            expect(this.evt.preventDefault).toHaveBeenCalled();
          });
        });

        describe('.didClickPreviousPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickPreviousPageButton).toEqual(jasmine.any(Function));
          });

          it('should request previous page on model', function() {
            spyOn(PagerModel.prototype, 'previousPage');
            this.view.didClickPreviousPageButton(this.evt);
            expect(this.view.model.previousPage).toHaveBeenCalled();
          });

          it('prevents default action', function() {
            this.view.didClickPreviousPageButton(this.evt);
            expect(this.evt.preventDefault).toHaveBeenCalled();
          });
        });

        describe('.didClickNextPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickNextPageButton).toEqual(jasmine.any(Function));
          });

          it('should request next page on model', function() {
            spyOn(PagerModel.prototype, 'nextPage');
            this.view.didClickNextPageButton(this.evt);
            expect(this.view.model.nextPage).toHaveBeenCalled();
          });

          it('prevents default action', function() {
            this.view.didClickNextPageButton(this.evt);
            expect(this.evt.preventDefault).toHaveBeenCalled();
          });
        });

        describe('.didClickLastPageButton()', function() {
          it('should be defined', function() {
            expect(PagerView.prototype.didClickLastPageButton).toEqual(jasmine.any(Function));
          });

          it('should request last page on model', function() {
            spyOn(PagerModel.prototype, 'lastPage');
            this.view.didClickLastPageButton(this.evt);
            expect(this.view.model.lastPage).toHaveBeenCalled();
          });

          it('prevents default action', function() {
            this.view.didClickLastPageButton(this.evt);
            expect(this.evt.preventDefault).toHaveBeenCalled();
          });
        });
      });

      describe('.createPageCollection()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.createPageCollection).toEqual(jasmine.any(Function));
        });

        it('should return page collection delegating to page collection class', function() {
          var fakeCollection = {},
            view = new PagerView;

          spyOn(PageCollection, 'create').and.returnValue(fakeCollection);
          expect(view.createPageCollection()).toBe(fakeCollection);
        });
      });

      describe('.createPageViews()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.createPageViews).toEqual(jasmine.any(Function));
        });

        it('should return page views based on page view collection', function() {
          var model = new PageModel({
              title: 1,
              page: 1
            }),
            collection = new PageCollection([model]),
            views;

          spyOn(PagerView.prototype, 'createPageCollection').and.returnValue(collection);

          views = PagerView.prototype.createPageViews();

          expect(views.length).toBe(1);
          expect(views[0]).toEqual(jasmine.any(PageView));
          expect(views[0].model).toBe(model);
        });
      });

      describe('.getPagesContainer()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.getPagesContainer).toEqual(jasmine.any(Function));
        });

        it('should get dom container for pages', function() {
          var view = new PagerView,
            fakeContainer = {};

          spyOn(view.$el, 'find').and.returnValue(fakeContainer);

          var result = view.getPagesContainer();

          expect(result).toBe(fakeContainer);
          expect(view.$el.find).toHaveBeenCalledWith('.vlr-pager__pages');
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should call render on model change', function() {
          spyOn(PagerView.prototype, 'render');

          var view = new PagerView;

          expect(view.render).not.toHaveBeenCalled();

          view.model.trigger('change');

          expect(view.render).toHaveBeenCalled();
          expect(view.render.calls.count()).toBe(1);
        });

        it('should call view method on model change of current page', function() {
          spyOn(PagerView.prototype, 'didChangeCurrentPage');

          var view = new PagerView

          expect(view.didChangeCurrentPage).not.toHaveBeenCalled();

          view.model.trigger('change:currentPage', 8);

          expect(view.didChangeCurrentPage).toHaveBeenCalledWith(8);
        });

        it('should call view method on model selection request event', function() {
          spyOn(PagerView.prototype, 'didClickPageButton');

          var pagerView = new PagerView({
            model: new PagerModel({
              totalItems: 30,
              pageSize: 10
            })
          });

          pagerView.createPageCollection().each(function(model) {
            model.trigger('page:selection-request');
          });

          expect(pagerView.didClickPageButton.calls.count()).toBe(3);
        });
      });

      describe('dom', function() {
        describe('control buttons', function() {
          beforeEach(function() {
            spyOn(PagerView.prototype, 'didClickFirstPageButton');
            spyOn(PagerView.prototype, 'didClickPreviousPageButton');
            spyOn(PagerView.prototype, 'didClickNextPageButton');
            spyOn(PagerView.prototype, 'didClickLastPageButton');

            this.view = new PagerView;
          });

          it('should define click event on go to first page button', function() {
            this.view.render().$el.find('.vlr-pager__page--first').trigger('click');
            expect(this.view.didClickFirstPageButton).toHaveBeenCalled();
          });

          it('should define click event on go to previous page button', function() {
            this.view.render().$el.find('.vlr-pager__page--previous').trigger('click');
            expect(this.view.didClickPreviousPageButton).toHaveBeenCalled();
          });

          it('should define click event on go to next page button', function() {
            this.view.render().$el.find('.vlr-pager__page--next').trigger('click');
            expect(this.view.didClickNextPageButton).toHaveBeenCalled();
          });

          it('should define click event on go to last page button', function() {
            this.view.render().$el.find('.vlr-pager__page--last').trigger('click');
            expect(this.view.didClickLastPageButton).toHaveBeenCalled();
          });
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new PagerView;

          expect(view.render()).toBe(view);
        });

        it('should render page control buttons', function() {
          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3
            })
          });

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--first')).toContainText('First');
          expect(view.render().$el.find('a[href="#"].vlr-pager__page--previous')).toContainText('Previous');
          expect(view.render().$el.find('a[href="#"].vlr-pager__page--next')).toContainText('Next');
          expect(view.render().$el.find('a[href="#"].vlr-pager__page--last')).toContainText('Last');

          expect(view.render().$el.find('span.vlr-pager__pages')).toContainText('3');
        });

        it('should disable go to first button when first page is selected', function() {
          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1
            })
          });

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--first')).toHaveClass('vlr-pager__page--disabled');

          view.model.nextPage();

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--first')).not.toHaveClass('vlr-pager__page--disabled');
        });

        it('should disable go to previous button when first page is selected', function() {
          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 1
            })
          });

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--previous')).toHaveClass('vlr-pager__page--disabled');

          view.model.nextPage();

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--previous')).not.toHaveClass('vlr-pager__page--disabled');
        });

        it('should disable go to next button when last page is selected', function() {
          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 10
            })
          });

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--next')).toHaveClass('vlr-pager__page--disabled');

          view.model.previousPage();

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--next')).not.toHaveClass('vlr-pager__page--disabled');
        });

        it('should disable go to last button when last page is selected', function() {
          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 10
            })
          });

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--last')).toHaveClass('vlr-pager__page--disabled');

          view.model.previousPage();

          expect(view.render().$el.find('a[href="#"].vlr-pager__page--last')).not.toHaveClass('vlr-pager__page--disabled');
        });

        it('should be hidden if just one page is available', function() {
          var view1 = new PagerView({
              model: new PagerModel({
                totalItems: 10,
                pageSize: 10
              })
            }),
            view2 = new PagerView({
              model: new PagerModel({
                totalItems: 0,
                pageSize: 10
              })
            }),
            view3 = new PagerView({
              model: new PagerModel({
                totalItems: 11,
                pageSize: 10
              })
            });

          view1.render();
          view2.render();
          view3.render();

          expect(view1.$el.css('display')).toEqual('none')
          expect(view2.$el.css('display')).toEqual('none')
          expect(view3.$el.css('display')).toEqual('block')
        });

        it('should not be hidden if has items', function() {
          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100
            })
          });

          view.render();

          expect(view.$el.css('display')).toEqual('block')
        });

        it('should render pages elements', function() {
          var pagerView = new PagerView,
            fakePagesContainer = jasmine.createSpyObj('container', ['append']),
            fakePageView = new PageView({
              model: new PageModel
            });

          spyOn(fakePageView, 'render').and.callThrough();
          spyOn(PagerView.prototype, 'getPagesContainer').and.returnValue(fakePagesContainer);
          spyOn(PagerView.prototype, 'createPageViews').and.returnValue([fakePageView]);

          pagerView.render();

          expect(fakePageView.render).toHaveBeenCalled();
          expect(fakePagesContainer.append).toHaveBeenCalledWith(fakePageView.el);
        });
      });
    });
  });
});