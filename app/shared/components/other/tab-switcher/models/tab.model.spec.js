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
    });
  });
});