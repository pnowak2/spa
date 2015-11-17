define(function(require) {
  var Backbone = require('backbone'),
    MultiselectView = require('./multiselect.view');

  describe('Multiselect View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(MultiselectView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(MultiselectView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(MultiselectView.prototype.className).toEqual('efc-multiselect');
      });
    });
  });
});