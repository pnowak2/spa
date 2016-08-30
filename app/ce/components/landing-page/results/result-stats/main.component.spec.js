define(function(require) {
  var Component = require('app/core/component'),
    ResultStatsComponent = require('./main.component'),
    ResultStatsView = require('./views/resultStats.view');

  describe('CE Result Stats Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ResultStatsComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new ResultStatsComponent();
        expect(component.view).toEqual(jasmine.any(ResultStatsView));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultStatsComponent.prototype.update).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});