define(function(require) {

  var Component = require('app/core/component'),
    Module = require('app/core/module'),
    Backbone = require('backbone');

  describe('Component', function() {
    describe('type', function() {
      it('should be defined', function() {
        expect(Component).toEqual(jasmine.any(Function));
      });

      it('should extend from module', function() {
        expect(Component.prototype).toEqual(jasmine.any(Module));
      });
    });

    describe('properties', function() {
      describe('.view', function() {
        it('should be defined', function() {
          expect(Component.prototype.view).toBe(null);
        });
      });
    });

    describe('creation', function() {
      it('should be possible with new', function() {
        var TestComponent = Component.extend(),
          testComponent = new TestComponent;

        expect(testComponent).toEqual(jasmine.any(TestComponent));
      });
    });

    describe('api', function() {
      describe('.render()', function() {
        beforeEach(function() {
          var fakeView = jasmine.createSpyObj('view', ['render']),
            TestComponent = Component.extend({
              view: fakeView
            });

          this.testComponent = new TestComponent;
        });

        it('should be defined', function() {
          expect(Component.prototype.render).toEqual(jasmine.any(Function));
        });

        it('should return component itself', function() {
          expect(this.testComponent.render()).toBe(this.testComponent);
        });

        it('should call render on view property', function() {
          expect(this.testComponent.view.render).not.toHaveBeenCalled();
          this.testComponent.render();
          expect(this.testComponent.view.render).toHaveBeenCalled();
        });
      });

      describe('.hide()', function() {
        beforeEach(function() {
          var TestComponent = Component.extend({
            view: new Backbone.View
          });
          this.testComponent = new TestComponent;
        });

        it('should be defined', function() {
          expect(Component.prototype.hide).toEqual(jasmine.any(Function));
        });

        it('should return component itself', function() {
          expect(this.testComponent.hide()).toBe(this.testComponent);
        });

        it('should hide view element', function() {
          spyOn(this.testComponent.view.$el, 'hide');

          this.testComponent.hide();
          expect(this.testComponent.view.$el.hide).toHaveBeenCalled();
        });
      });

      describe('.show()', function() {
        beforeEach(function() {
          var TestComponent = Component.extend({
            view: new Backbone.View
          });
          this.testComponent = new TestComponent;
        });

        it('should be defined', function() {
          expect(Component.prototype.show).toEqual(jasmine.any(Function));
        });

        it('should return component itself', function() {
          expect(this.testComponent.show()).toBe(this.testComponent);
        });

        it('should show view element', function() {
          spyOn(this.testComponent.view.$el, 'show');

          this.testComponent.show();
          expect(this.testComponent.view.$el.show).toHaveBeenCalled();
        });
      });
    });
  });
});