define(function(require) {
  var Backbone = require('backbone'),
    Component = require('app/core/component'),
    DummyComponent = require('./main.component');

  describe('Dummy Advanced Search Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(DummyComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new DummyComponent;
        expect(component.view).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('api', function() {
      describe('.getCriteria()', function() {
        it('should be defined', function() {
          expect(DummyComponent.prototype.getCriteria).toEqual(jasmine.any(Function));
        });
      });

      describe('.isDirty()', function() {
        it('should be defined', function() {
          expect(DummyComponent.prototype.isDirty).toEqual(jasmine.any(Function));
        });
      });

      describe('.update()', function() {
        it('should be defined', function() {
          expect(DummyComponent.prototype.update).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});