define(function(require) {
  var Component = require('app/core/component'),
    ResultsListComponent = require('./main.component'),
    ResultsListView = require('./views/resultsList.view');

  describe('CE Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new ResultsListComponent();
        expect(component.view).toEqual(jasmine.any(ResultsListView));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should delegate to view', function() {
          spyOn(ResultsListView.prototype, 'update');

          var component = new ResultsListComponent(),
            fakeData = [];

          component.update(fakeData);

          expect(component.view.update).toHaveBeenCalledWith(fakeData);
        });
      });
    });
  });
});