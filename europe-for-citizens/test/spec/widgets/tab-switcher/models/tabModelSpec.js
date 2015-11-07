define(function(require) {
  var TabModel = require('app/widgets/tab-switcher/models/tabModel'),
    Backbone = require('backbone');

  describe('Tab Switcher Tab Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(TabModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });
  });
});