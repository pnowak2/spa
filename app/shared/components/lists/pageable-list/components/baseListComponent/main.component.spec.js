define(function(require) {
  var Backbone = require('backbone'),
    Component = require('app/core/component'),
    BaseListComponent = require('./main.component');

  describe('Base List Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(BaseListComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new BaseListComponent;
        expect(component.view).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(BaseListComponent.prototype.update).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});