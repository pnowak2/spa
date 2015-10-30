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
      describe('.createPageCollection()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.createPageCollection).toEqual(jasmine.any(Function));
        });

        it('should return collection', function() {
          var view = new PagerView({
              model: new PagerModel
            }),
            collection = view.createPageCollection();

          expect(collection).toEqual(jasmine.any(PageCollection));
        });

        it('should have size as page window size', function() {
          var view = new PagerView({
              model: new PagerModel({
                totalItems: 100,
                pageSize: 10,
                currentPage: 1,
                pageWindowSize: 5
              })
            }),
            collection = view.createPageCollection();

          expect(collection.size()).toEqual(view.model.getPageWindowSize());
        });

        it('should contain page models with proper attributes', function() {
          var view = new PagerView({
              /**
               * 1 2 3 4 5 6 7 8 9 10
               *     ----^----
               **/
              model: new PagerModel({
                totalItems: 100,
                pageSize: 10,
                currentPage: 5,
                pageWindowSize: 5
              })
            }),
            collection = view.createPageCollection();

          expect(collection.size()).toEqual(5);

          var modelPage1 = collection.at(0);
          expect(modelPage1.get('title')).toBe(3);
          expect(modelPage1.get('number')).toBe(3);
          expect(modelPage1.get('selected')).toBe(false);

          var modelPage2 = collection.at(1);
          expect(modelPage2.get('title')).toEqual(4);
          expect(modelPage2.get('number')).toBe(4);
          expect(modelPage2.get('selected')).toBe(false);

          var modelPage3 = collection.at(2);
          expect(modelPage3.get('title')).toEqual(5);
          expect(modelPage3.get('number')).toBe(5);
          expect(modelPage3.get('selected')).toBe(true);

          var modelPage4 = collection.at(3);
          expect(modelPage4.get('title')).toEqual(6);
          expect(modelPage4.get('number')).toBe(6);
          expect(modelPage4.get('selected')).toBe(false);

          var modelPage5 = collection.at(4);
          expect(modelPage5.get('title')).toEqual(7);
          expect(modelPage5.get('number')).toBe(7);
          expect(modelPage5.get('selected')).toBe(false);
        });
      });

      describe('.modelDidChange()', function() {
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
    });

    describe('events', function() {
      describe('.modelDidChange()', function() {
        it('should be defined', function() {
          expect(PagerView.prototype.modelDidChange).toEqual(jasmine.any(Function));
        });

        it('should be called on model change', function() {
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
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new PagerView({
            model: new PagerModel
          });

          expect(view.render()).toBe(view);
        });

        it('should call createPageCollection', function() {
          spyOn(PagerView.prototype, 'createPageCollection');

          var view = new PagerView({
            model: new PagerModel
          });

          expect(view.createPageCollection).not.toHaveBeenCalled();
          view.render();
          expect(view.createPageCollection).toHaveBeenCalled();
        });
      });
    });
  });
});