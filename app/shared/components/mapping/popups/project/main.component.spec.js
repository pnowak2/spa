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
  });
});