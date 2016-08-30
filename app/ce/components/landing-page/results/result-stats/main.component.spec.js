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

    describe('events', function() {
      it('should trigger event on export xls', function(done) {
        var component = new ResultStatsComponent();

        component.on('export:xls', function() {
          expect(true).toBe(true);
          done();
        });

        component.view.trigger('export:xls');
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultStatsComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(ResultStatsView.prototype, 'update');

          var component = new ResultStatsComponent(),
            fakeData = {};

          component.update(fakeData);

          expect(component.view.update).toHaveBeenCalledWith(fakeData);
        });
      });
    });
  });
});