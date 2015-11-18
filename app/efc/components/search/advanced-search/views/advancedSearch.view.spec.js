define(function(require) {
  var Backbone = require('backbone'),
    AdvancedSearchView = require('./advancedSearch.view');

  describe('Advanced Search View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(AdvancedSearchView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });
  });
});