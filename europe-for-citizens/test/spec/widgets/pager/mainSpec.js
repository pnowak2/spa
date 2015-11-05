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

      it('should be initialized with proper view', function() {
        expect(this.pagerWidget.view).toEqual(jasmine.any(PagerView));
      });

      it('should pass options to pager model', function() {
        var fakeOptions = {
            fakeAttr: 'fakeValue'
          },
          pagerWidget = new PagerWidget(fakeOptions);

        expect(pagerWidget.view.model.toJSON()).toEqual(jasmine.objectContaining({
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

          spyOn(pagerWidget.view.model, 'toJSON').and.returnValue(fakePagerState);
          expect(pagerWidget.getState()).toBe(fakePagerState);
        });
      });

      describe('.updateState()', function() {
        it('should be defined', function() {
          expect(PagerWidget.prototype.updateState).toEqual(jasmine.any(Function));
        });

        it('should delegate to pager model', function() {
          var pagerWidget = new PagerWidget,
            fakeState = {};

          spyOn(pagerWidget.view.model, 'update');

          pagerWidget.updateState(fakeState);

          expect(pagerWidget.view.model.update).toHaveBeenCalledWith(fakeState);
        });
      });
    });

    describe('events', function() {
      it('should trigger event on page selection', function(done) {
        var pagerWidget = new PagerWidget;

        pagerWidget.on('pager:page:selected', function(page) {
          expect(page).toEqual(6);
          done();
        });

        pagerWidget.view.trigger('pager:page:selected', 6);
      });
    });
  });
});