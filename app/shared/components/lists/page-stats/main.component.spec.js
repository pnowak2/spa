define(function(require) {
  var Component = require('app/core/component'),
    PageStatsView = require('./views/pageStats.view'),
    PageStatsComponent = require('./main.component');

  describe('Page Stats Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(PageStatsComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.component = new PageStatsComponent;
      });

      it('should be initialized with proper view', function() {
        expect(this.component.view).toEqual(jasmine.any(PageStatsView));
      });

      it('should pass options to view', function() {
        spyOn(PageStatsView.prototype, 'initialize');

        var fakeOptions = {},
          component = new PageStatsComponent(fakeOptions);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeOptions);
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(PageStatsComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(PageStatsView.prototype, 'update');

          var component = new PageStatsComponent,
            fakeOptions = {};

          component.update(fakeOptions);

          expect(component.view.update).toHaveBeenCalledWith(fakeOptions);
        });
      });
    });
  });
});