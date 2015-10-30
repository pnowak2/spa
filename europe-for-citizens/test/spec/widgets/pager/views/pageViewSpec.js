define(function(require) {
  var PageView = require('app/widgets/pager/views/pageView'),
    PageModel = require('app/widgets/pager/models/pageModel');

  describe('Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should throw if created without model', function() {
        expect(function() {
          new PageView
        }).toThrowError('model is not of correct type')
      });

      it('should throw if model type is incorrect', function() {
        expect(function() {
          new PageView({
            model: {}
          })
        }).toThrowError('model is not of correct type')
      });
    });

    describe('properties', function() {
      beforeEach(function() {
        this.view = new PageView({
          model: new PageModel
        })
      });

      it('.tagName', function() {
        expect(this.view.tagName).toEqual('a');
      });

      it('should have href set to #', function() {
        expect(this.view.attributes.href).toEqual('#');
      });
    });

    describe('api', function() {
      describe('.didClickPage', function() {
        it('should be defined', function() {
          expect(PageView.prototype.didClickPage).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should define click event on view itself', function() {
          spyOn(PageView.prototype, 'didClickPage');

          var view = new PageView({
            model: new PageModel
          });

          view.render().$el.trigger('click');

          expect(view.didClickPage).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new PageView({
            model: new PageModel
          });

          expect(view.render()).toBe(view);
        });
      });
    });
  });
});