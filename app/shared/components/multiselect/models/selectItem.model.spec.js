define(function(require) {
  var Bakckbone = require('backbone'),
    SelectItemModel = require('./selectItem.model');

  describe('Multiselect Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(SelectItemModel.prototype).toEqual(jasmine.any(Bakckbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(SelectItemModel.prototype.defaults).toEqual({
          id: '',
          title: '',
          hint: '',
          selected: false,
          disabled: false
        })
      });
    });

    describe('api', function() {
      describe('.select()', function() {
        it('should be defined', function() {
          expect(SelectItemModel.prototype.select).toEqual(jasmine.any(Function));
        });

        it('should select model', function() {
          var model = new SelectItemModel({
            id: 'pl',
            selected: false
          });

          expect(model.isSelected()).toBe(false);

          model.select();

          expect(model.isSelected()).toBe(true);
        });
      });

      describe('.unselect()', function() {
        it('should be defined', function() {
          expect(SelectItemModel.prototype.unselect).toEqual(jasmine.any(Function));
        });

        it('should unselect model', function() {
          var model = new SelectItemModel({
            id: 'pl',
            selected: true
          });

          expect(model.isSelected()).toBe(true);

          model.unselect();

          expect(model.isSelected()).toBe(false);
        });
      });

      describe('.isSelected()', function() {
        it('should be defined', function() {
          expect(SelectItemModel.prototype.isSelected).toEqual(jasmine.any(Function));
        });

        it('should return true if model is selected', function() {
          var model = new SelectItemModel({
            id: 'pl',
            selected: false
          });

          expect(model.isSelected()).toBe(false);
          model.set('selected', true);
          expect(model.isSelected()).toBe(true);
        });
      });
    });
  });
});