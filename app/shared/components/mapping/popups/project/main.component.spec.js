define(function(require) {
  var Component = require('app/core/component'),
    ProjectPopupComponent = require('./main.component'),
    ProjectPopupView = require('./views/projectPopup.view'),
    ProjectPopupModel = require('./models/projectPopup.model');

  describe('Project Marker Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ProjectPopupComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new ProjectPopupComponent;
        expect(component.view).toEqual(jasmine.any(ProjectPopupView));
      });

      it('should pass popup data to view', function() {
        spyOn(ProjectPopupView.prototype, 'initialize');

        var fakePopupData = {},
          component = new ProjectPopupComponent({
            popupData: fakePopupData
          });

        expect(component.view.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
          popupData: fakePopupData
        }));

      });
    });

    describe('api', function() {
      describe('.getState()', function() {
        it('should be defined', function() {
          expect(ProjectPopupComponent.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should delegate to models JSON', function() {
          var fakePopupModelJSON = {},
            component = new ProjectPopupComponent;

          spyOn(component.view.model, 'toJSON').and.returnValue(fakePopupModelJSON);

          expect(component.getState()).toBe(fakePopupModelJSON);

        });
      });
    });
  });
});