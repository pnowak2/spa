define(function(require) {
  var TabModel = require('app/widgets/tab-switcher/models/tabModel'),
    Backbone = require('backbone');

  describe('Tab Model', function() {
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
          selected: false
        });
      });
    });

    describe('api', function() {
      beforeEach(function() {
        this.model = new TabModel
      });

      describe('.isSelected()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.isSelected).toEqual(jasmine.any(Function));
        });

        it('should return selected state', function() {
          this.model.set('selected', true);
          expect(this.model.isSelected()).toBe(true);

          this.model.set('selected', false);
          expect(this.model.isSelected()).toBe(false);
        });
      });

      describe('.select()', function() {
        it('should be defined', function() {
          expect(TabModel.prototype.select).toEqual(jasmine.any(Function));
        });

        it('should select tab', function() {
          spyOn(TabModel.prototype, 'set');

          this.model.select();

          expect(this.model.set).toHaveBeenCalledWith('selected', true);
        });

        it('should deselect tab', function() {
          spyOn(TabModel.prototype, 'set');

          this.model.deselect();

          expect(this.model.set).toHaveBeenCalledWith('selected', false);
        });
      });
    });
  });
});