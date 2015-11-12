define(function(require) {
  var Component = require('app/core/component'),
    ResultsListComponent = require('./main.component'),
    ResultsListView = require('./views/resultsList.view');

  describe('Results List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ResultsListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new ResultsListComponent;
        expect(component.view).toEqual(jasmine.any(ResultsListView));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListComponent.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should update view with passed data', function() {
          var component = new ResultsListComponent,
            fakeData = {};
          spyOn(component.view, 'update');

          component.update(fakeData);

          expect(component.view.update).toHaveBeenCalled();
          expect(component.view.update.calls.mostRecent().args[0]).toBe(fakeData);
        });
      });
    });
  });
});