define(function(require) {

  var Widget = require('app/core/widget'),
    Module = require('app/core/module'),
    Backbone = require('backbone');

  describe('Widget', function() {
    describe('type', function() {
      it('should be defined', function() {
        expect(Widget).toEqual(jasmine.any(Function));
      });

      it('should extend from module', function() {
        expect(Widget.prototype).toEqual(jasmine.any(Module));
      });
    });

    describe('properties', function() {
      describe('.view', function() {
        it('should be defined', function() {
          expect(Widget.prototype.view).toBe(null);
        });
      });
    });

    describe('creation', function() {
      it('should be possible with new', function() {
        var TestWidget = Widget.extend(),
          testWidget = new TestWidget;

        expect(testWidget).toEqual(jasmine.any(TestWidget));
      });
    });

    describe('api', function() {
      describe('.render()', function() {
        beforeEach(function() {
          var fakeView = jasmine.createSpyObj('view', ['render']),
            TestWidget = Widget.extend({
              view: fakeView
            });

          this.testWidget = new TestWidget;
        });

        it('should be defined', function() {
          expect(Widget.prototype.render).toEqual(jasmine.any(Function));
        });

        it('should return widget itself', function() {
          expect(this.testWidget.render()).toBe(this.testWidget);
        });

        it('should call render on view property', function() {
          expect(this.testWidget.view.render).not.toHaveBeenCalled();
          this.testWidget.render();
          expect(this.testWidget.view.render).toHaveBeenCalled();
        });
      });

      describe('.hide()', function() {
        beforeEach(function() {
          var TestWidget = Widget.extend({
            view: new Backbone.View
          });
          this.testWidget = new TestWidget;
        });

        it('should be defined', function() {
          expect(Widget.prototype.hide).toEqual(jasmine.any(Function));
        });

        it('should return widget itself', function() {
          expect(this.testWidget.hide()).toBe(this.testWidget);
        });

        it('should hide view element', function() {
          spyOn(this.testWidget.view.$el, 'hide');

          this.testWidget.hide();
          expect(this.testWidget.view.$el.hide).toHaveBeenCalled();
        });
      });

      describe('.show()', function() {
        beforeEach(function() {
          var TestWidget = Widget.extend({
            view: new Backbone.View
          });
          this.testWidget = new TestWidget;
        });

        it('should be defined', function() {
          expect(Widget.prototype.show).toEqual(jasmine.any(Function));
        });

        it('should return widget itself', function() {
          expect(this.testWidget.show()).toBe(this.testWidget);
        });

        it('should show view element', function() {
          spyOn(this.testWidget.view.$el, 'show');

          this.testWidget.show();
          expect(this.testWidget.view.$el.show).toHaveBeenCalled();
        });
      });
    });
  });
});