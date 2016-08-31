define(function(require) {
  var Backbone = require('backbone'),
    SearchBoxModel = require('./searchBox.model');

  describe('SearchBox Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(SearchBoxModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('api', function() {
      describe('.isDirty()', function() {
        it('should be defined', function() {
          expect(SearchBoxModel.prototype.isDirty).toEqual(jasmine.any(Function));
        });

        it('should return true if keyword is not empty', function() {
          var model = new SearchBoxModel({
            keyword: 'bar'
          });

          expect(model.isDirty()).toBe(true);
        });
      });

      describe('.toJSON()', function() {
        beforeEach(function () {
          this.model = new SearchBoxModel({});
        });

        it('should be defined', function() {
          expect(SearchBoxModel.prototype.toJSON).toEqual(jasmine.any(Function));
        });

        it('should return attributes of model with dirty flag set to true', function() {
          spyOn(SearchBoxModel.prototype, 'isDirty').and.returnValue(true);

          expect(this.model.toJSON()).toEqual(jasmine.objectContaining({
            isSearchBoxDirty: true
          }));
        });

        it('should return attributes of model with dirty flag set to false', function() {
          spyOn(SearchBoxModel.prototype, 'isDirty').and.returnValue(false);

          expect(this.model.toJSON()).toEqual(jasmine.objectContaining({
            isSearchBoxDirty: false
          }));
        });
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(SearchBoxModel.prototype.defaults).toEqual({
          keyword: ''
        });
      });
    });
  });
});