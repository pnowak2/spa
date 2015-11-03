define(function(require) {
  var Backbone = require('backbone'),
    SearchBoxModel = require('app/widgets/search/search-box/models/searchBoxModel');

  describe('SearchBox Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(SearchBoxModel.prototype).toEqual(jasmine.any(Backbone.Model));
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