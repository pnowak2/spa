define(function(require) {
  var TabModel = require('./tab.model'),
    Backbone = require('backbone');

  describe('Tab Switcher Tab Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(TabModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(TabModel.prototype.defaults).toEqual({
          title: '',
          identifier: null,
          selected: false,
          visible: true,
          targetSelector: null
        });
      });
    });

    describe('api', function() {
      describe('.isSelected()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.isSelected).toEqual(jasmine.any(Function));
        });

        it('should return selected property of model', function() {
          var model = new TabModel({
            selected: true
          });

          expect(model.isSelected()).toBe(true);

          model.set('selected', false);

          expect(model.isSelected()).toBe(false);
        });
      });

      describe('.isVisible()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.isVisible).toEqual(jasmine.any(Function));
        });

        it('should return visible property of model', function() {
          var model = new TabModel({
            visible: true
          });

          expect(model.isVisible()).toBe(true);

          model.set('visible', false);

          expect(model.isVisible()).toBe(false);
        });
      });

      describe('.select()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.select).toEqual(jasmine.any(Function));
        });

        it('should set selected to true in model', function() {
          var model = new TabModel({
            selected: false
          });

          model.select();

          expect(model.isSelected()).toBe(true);
        });
      });

      describe('.deselect()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.deselect).toEqual(jasmine.any(Function));
        });

        it('should set selected to false in model', function() {
          var model = new TabModel({
            selected: true
          });

          model.deselect();

          expect(model.isSelected()).toBe(false);
        });
      });

      describe('.show()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.show).toEqual(jasmine.any(Function));
        });

        it('should set visible to true in model', function() {
          var model = new TabModel({
            visible: false
          });

          model.show();

          expect(model.isVisible()).toBe(true);
        });
      });

      describe('.hide()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.hide).toEqual(jasmine.any(Function));
        });

        it('should set visible to false in model', function() {
          var model = new TabModel({
            visible: true
          });

          model.hide();

          expect(model.isVisible()).toBe(false);
        });
      });

      describe('.getTargetSelector()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.getTargetSelector).toEqual(jasmine.any(Function));
        });

        it('should return jquery selector for target element', function() {
          var model = new TabModel({
            targetSelector: '.myElementClass'
          });

          expect(model.getTargetSelector()).toEqual('.myElementClass');
        });
      });

      describe('.getIdentifier()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.getIdentifier).toEqual(jasmine.any(Function));
        });

        it('should return identifier for tab', function() {
          var model = new TabModel({
            identifier: 'my-id'
          });

          expect(model.getIdentifier()).toEqual('my-id');
        });
      });
    });
  });
});