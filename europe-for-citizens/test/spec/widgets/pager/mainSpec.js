define(function(require) {

  var Widget = require('app/core/widget'),
    PagerWidget = require('app/widgets/pager/main'),
    PagerModel = require('app/widgets/pager/models/pagerModel'),
    PagerView = require('app/widgets/pager/views/pagerView');

  describe('Pager Widget', function() {

    describe('type', function() {
      it('should be of widget', function() {
        expect(PagerWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.pagerWidget = new PagerWidget;
      });

      it('should be initialized with pager model', function() {
        expect(this.pagerWidget.model).toEqual(jasmine.any(PagerModel));
      });

      it('should be initialized with pager view', function() {
        expect(this.pagerWidget.view).toEqual(jasmine.any(PagerView));
      });

      it('should have view with pager model', function() {
        expect(this.pagerWidget.view.model).toBe(this.pagerWidget.model);
      });

      it('should pass options to pager model', function() {
        var fakeOptions = {
            fakeAttr: 'fakeValue'
          },
          pagerWidget = new PagerWidget(fakeOptions);

        expect(pagerWidget.model.toJSON()).toEqual(jasmine.objectContaining({
          fakeAttr: 'fakeValue'
        }));
      });
    });

    describe('api', function() {
      describe('.getState()', function() {
        it('should be defined', function() {
          expect(PagerWidget.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should delegate the state to pager model', function() {
          var pagerWidget = new PagerWidget,
            fakePagerState = {};

          spyOn(pagerWidget.model, 'toJSON').and.returnValue(fakePagerState);
          expect(pagerWidget.getState()).toBe(fakePagerState);
        });
      });

      describe('.refresh()', function() {
        it('should be defined', function() {
          expect(PagerWidget.prototype.refresh).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});