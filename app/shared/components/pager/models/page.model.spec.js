define(function(require) {
  var PageModel = require('./page.model'),
    Backbone = require('backbone');

  describe('Page Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(PageModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(PageModel.prototype.defaults).toEqual({
          page: null,
          selected: false
        });
      });
    });

    describe('api', function() {
      describe('.select()', function() {
        beforeEach(function() {
          this.model = new PageModel
        });

        it('should be defined', function() {
          expect(PageModel.prototype.select).toEqual(jasmine.any(Function));
        });

        it('should set selected property to true', function() {
          spyOn(PageModel.prototype, 'set');

          this.model.select();

          expect(this.model.set).toHaveBeenCalledWith('selected', true);
        });

      });

      describe('.deselect()', function() {
        beforeEach(function() {
          this.model = new PageModel
        });

        it('should be defined', function() {
          expect(PageModel.prototype.deselect).toEqual(jasmine.any(Function));
        });

        it('should set selected property to false', function() {
          spyOn(PageModel.prototype, 'set');

          this.model.deselect();

          expect(this.model.set).toHaveBeenCalledWith('selected', false);
        });
      });
    });
  });
});