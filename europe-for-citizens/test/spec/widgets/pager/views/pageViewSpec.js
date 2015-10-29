define(function(require) {
  var PageView = require('app/widgets/pager/views/pageView');

  describe('Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(PageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });
  });
});