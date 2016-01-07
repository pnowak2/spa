define(function(require) {
  var Component = require('app/core/component'),
    ProjectMarkerComponent = require('./main.component'),
    ProjectMarkerView = require('./views/projectMarker.view'),
    ProjectMarkerModel = require('./models/projectMarker.model');

  describe('Project Marker Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ProjectMarkerComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new ProjectMarkerComponent;
        expect(component.view).toEqual(jasmine.any(ProjectMarkerView));
      });

      it('should pass markers data to view', function() {
        spyOn(ProjectMarkerView.prototype, 'initialize');

        var fakeMarkerData = {},
          component = new ProjectMarkerComponent({
            markerData: fakeMarkerData
          });

        expect(component.view.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
          markerData: fakeMarkerData
        }));

      });
    });

    describe('api', function() {
      describe('.getState()', function() {
        it('should be defined', function() {
          expect(ProjectMarkerComponent.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should delegate to models JSON', function() {
          var fakeMarkerModelJSON = {},
            component = new ProjectMarkerComponent;

          spyOn(component.view.model, 'toJSON').and.returnValue(fakeMarkerModelJSON);

          expect(component.getState()).toBe(fakeMarkerModelJSON);

        });
      });
    });
  });
});