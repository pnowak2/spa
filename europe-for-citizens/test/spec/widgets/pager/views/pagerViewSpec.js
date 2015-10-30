define(function(require) {
  var Backbone = require('backbone'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PagerView = require('app/widgets/pager/views/pagerView'),
    PageCollection = require('app/widgets/pager/collections/pageCollection');

  describe('Pager View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PagerView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      describe('using new', function() {
        beforeEach(function() {
          this.view = new PagerView({
            model: new PagerModel
          })
        });

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

        it('should view element be a div', function() {
          expect(this.view.tagName).toEqual('div');
        });

        it('should view element have a proper css class', function() {
          expect(this.view.className).toEqual('efc-pager');
        });
      });

      describe('.initialize()', function() {
        beforeEach(function() {
          this.view = new PagerView({
            model: new PagerModel
          })
        });

        it('should create page collection', function() {
          expect(this.view.collection).toEqual(jasmine.any(PageCollection));
        });
      });
    });

    describe('api', function() {

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
          })

          expect(view.modelDidChange).not.toHaveBeenCalled();
          view.model.trigger('change');
          expect(view.modelDidChange).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('rerender on model changes', function() {
        it('should rerender on model change', function() {
          spyOn(PagerView.prototype, 'render');

          var view = new PagerView({
            model: new PagerModel
          })

          expect(view.render).not.toHaveBeenCalled();
          view.model.trigger('change');
          expect(view.render).toHaveBeenCalled();
        });
      });

      describe('.render()', function() {

        it('should return view object', function() {
          var view = new PagerView({
            model: new PagerModel
          });

          expect(view.render()).toBe(view);
        });
      });
    });
  });
});