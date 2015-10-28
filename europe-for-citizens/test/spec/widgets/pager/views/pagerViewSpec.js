define(function (require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    PagerView = require('app/widgets/pager/views/pagerView');

  describe('Pager View', function () {
    describe('prototype', function () {
      it('should be a view', function () {
        expect(PagerView.prototype).toEqual(jasmine.any(Backbone.View));
      });

      it('should have correct css class', function () {
        expect(PagerView.prototype.className).toEqual('efc-pager');
      });
    });

    describe('render', function () {
      it('should be defined', function () {
        expect(PagerView.prototype.render).toEqual(jasmine.any(Function));
      });
    });
  });
});