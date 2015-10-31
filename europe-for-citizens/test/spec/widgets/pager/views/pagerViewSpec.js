define(function(require) {
  var Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PageModel = require('app/widgets/pager/models/pageModel'),
    PagerView = require('app/widgets/pager/views/pagerView'),
    PageCollection = require('app/widgets/pager/collections/pageCollection');

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

      describe('.didSelectPage()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.didSelectPage).toEqual(jasmine.any(Function));
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
          spyOn(PageCollection, 'createCollection').and.callThrough();

          var view = new PagerView({
            model: new PagerModel({
              totalItems: 100,
              pageSize: 10,
              currentPage: 3,
              pageWindowSize: 5
            })
          });

          expect(PageCollection.createCollection).not.toHaveBeenCalled();
          view.render();
          expect(PageCollection.createCollection).toHaveBeenCalledWith(
            view.model.getPagedWindow(),
            view.model.getCurrentPage()
          );
        });
      });
    });
  });
});