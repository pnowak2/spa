define(function(require) {
  var ResultModel = require('./result.model');

  describe('EfC Result List Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(ResultModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be a function because of the countries array - http://backbonejs.org/#Model-defaults', function() {
        expect(ResultModel.prototype.defaults).toEqual(jasmine.any(Function));
      });

      it('should be defined with proper values', function() {
        expect(ResultModel.prototype.defaults()).toEqual({
          id: '',
          title: '',
          description: '',
          callYear: '',
          countries: []
        });
      });
    });
  });
});