define(function(require) {
  var Component = require('app/core/component'),
    ProjectItemComponent = require('./main.component'),
    ProjectItemView = require('./views/projectItem.view');

  describe('Project Item Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ProjectItemComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new ProjectItemComponent;
        expect(component.view).toEqual(jasmine.any(ProjectItemView));
      });

      it('should pass options to view', function() {
        spyOn(ProjectItemView.prototype, 'initialize');

        var fakeOptions = {},
          component = new ProjectItemComponent(fakeOptions);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeOptions);
      });
    });
  });
});