define(function(require) {

  var Component = require('app/core/component'),
    PagerComponent = require('./main.component'),
    PagerModel = require('./models/pager.model'),
    PagerView = require('./views/pager.view');

  describe('Pager Component', function() {

    describe('type', function() {
      it('should be of component', function() {
        expect(PagerComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.pagerComponent = new PagerComponent;
      });

      it('should be initialized with proper view', function() {
        expect(this.pagerComponent.view).toEqual(jasmine.any(PagerView));
      });

      it('should pass options to pager model', function() {
        var fakeOptions = {
            fakeAttr: 'fakeValue'
          },
          pagerComponent = new PagerComponent(fakeOptions);

        expect(pagerComponent.view.model.toJSON()).toEqual(jasmine.objectContaining({
          fakeAttr: 'fakeValue'
        }));
      });
    });

    describe('api', function() {
      describe('.getState()', function() {
        it('should be defined', function() {
          expect(PagerComponent.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should delegate the state to pager model', function() {
          var pagerComponent = new PagerComponent,
            fakePagerState = {};

          spyOn(pagerComponent.view.model, 'toJSON').and.returnValue(fakePagerState);
          expect(pagerComponent.getState()).toBe(fakePagerState);
        });
      });

      describe('.update()', function() {
        it('should be defined', function() {
          expect(PagerComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to pager view', function() {
          var pagerComponent = new PagerComponent,
            fakeState = {};

          spyOn(pagerComponent.view, 'update');

          pagerComponent.update(fakeState);

          expect(pagerComponent.view.update).toHaveBeenCalledWith(fakeState);
        });
      });
    });

    describe('events', function() {
      it('should trigger event on page selection', function(done) {
        var pagerComponent = new PagerComponent,
          fakePagerDetails = {}

        pagerComponent.on('pager:page:selected', function(pagerDetails) {
          expect(pagerDetails).toBe(fakePagerDetails);
          done();
        });

        pagerComponent.view.trigger('pager:page:selected', fakePagerDetails);
      });
    });
  });
});