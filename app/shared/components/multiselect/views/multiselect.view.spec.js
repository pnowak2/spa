define(function(require) {
  var Backbone = require('backbone'),
    MultiselectView = require('./multiselect.view');

  describe('Multiselect View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(MultiselectView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });
  });
});