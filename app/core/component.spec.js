define(function(require) {
  var Component = require('./component'),
    Module = require('./module'),
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
          expect(Component.prototype.view).toEqual(jasmine.any(Backbone.View));
        });
      });
    });

    describe('creation', function() {
      it('should be possible with new', function() {
        var TestComponent = Component.extend(),
          testComponent = new TestComponent();

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

          this.testComponent = new TestComponent();
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
            view: new Backbone.View()
          });
          this.testComponent = new TestComponent();
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

        it('should not throw if view is not defined', function() {
          var component = new(Component.extend())();
          expect(function() {
            component.hide();
          }).not.toThrow();
        });
      });

      describe('.show()', function() {
        beforeEach(function() {
          var TestComponent = Component.extend({
            view: new Backbone.View()
          });
          this.testComponent = new TestComponent();
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

      describe('.toggle()', function() {
        beforeEach(function() {
          var TestComponent = Component.extend({
            view: new Backbone.View()
          });
          this.testComponent = new TestComponent();
        });

        it('should be defined', function() {
          expect(Component.prototype.toggle).toEqual(jasmine.any(Function));
        });

        it('should return component itself', function() {
          expect(this.testComponent.toggle()).toBe(this.testComponent);
        });

        it('should toggle view element', function() {
          spyOn(this.testComponent.view.$el, 'toggle');

          this.testComponent.toggle();
          expect(this.testComponent.view.$el.toggle).toHaveBeenCalled();
        });

        it('should pass boolean param to view element', function() {
          spyOn(this.testComponent.view.$el, 'toggle');
          this.testComponent.toggle(true);

          expect(this.testComponent.view.$el.toggle).toHaveBeenCalledWith(true);
        });
      });
    });
  });
});