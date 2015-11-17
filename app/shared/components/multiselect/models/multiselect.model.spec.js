define(function(require) {
  var Bakckbone = require('backbone'),
    MultiselectModel = require('./multiselect.model');

  describe('Multiselect Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(MultiselectModel.prototype).toEqual(jasmine.any(Bakckbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(MultiselectModel.prototype.defaults).toEqual({
          id: '',
          title: '',
          selected: false
        })
      });
    });
  });
});