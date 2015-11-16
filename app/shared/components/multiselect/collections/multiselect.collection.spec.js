define(function(require) {
  var Backbone = require('backbone'),
    MultiselectColleciton = require('./multiselect.collection'),
    MultiselectModel = require('../models/multiselect.model');

  describe('Multiselect Collection', function() {
    describe('type', function() {
      it('should be of collection', function() {
        expect(MultiselectColleciton.prototype).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('creation', function() {
      it('should have model defined', function() {
        expect(MultiselectColleciton.prototype.model).toEqual(MultiselectModel)
      });
    });
  });
});