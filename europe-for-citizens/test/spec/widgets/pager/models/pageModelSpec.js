define(function(require) {
  var PageModel = require('app/widgets/pager/models/pageModel'),
    Backbone = require('backbone');

  describe('Page Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(PageModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });
  });
});