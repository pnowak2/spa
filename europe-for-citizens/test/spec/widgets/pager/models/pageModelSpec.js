define(function(require) {
  var PageModel = require('app/widgets/pager/models/pageModel'),
    Backbone = require('backbone');

  describe('Page Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(PageModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(PageModel.prototype.defaults).toEqual({
          page: null,
          selected: false
        });
      });
    });
  });
});