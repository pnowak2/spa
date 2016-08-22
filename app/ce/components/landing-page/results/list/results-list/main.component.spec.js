define(function(require) {
  var Component = require('app/core/component'),
    ResultsListComponent = require('./main.component');

  describe('CE Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {

    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListComponent.prototype.update).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});