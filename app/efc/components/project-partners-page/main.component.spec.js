define(function(require) {
  var Component = require('app/core/component'),
    ProjectPartnersView = require('./views/projectPartnersPage.view'),
    ProjectPartnersComponent = require('./main.component');

  describe('EfC Project Partners Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(ProjectPartnersComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new ProjectPartnersComponent;
        expect(component.view).toEqual(jasmine.any(ProjectPartnersView));
      });
    });
  });
});