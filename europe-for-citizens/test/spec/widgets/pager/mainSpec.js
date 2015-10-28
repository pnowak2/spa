define(function(require) {

  var Widget = require('app/core/widget'),
    PagerWidget = require('app/widgets/pager/main');

  describe('Pager Widget', function() {

    describe('type', function() {
      it('should be of widget', function() {
        expect(PagerWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });

    describe('api', function() {
      describe('.getState()', function() {
        it('should be defined', function() {
          expect(PagerWidget.prototype.getState).toEqual(jasmine.any(Function));
        });
      });

      describe('.refresh()', function() {
        it('should be defined', function() {
          expect(PagerWidget.prototype.refresh).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('creation', function() {
      describe('without options', function() {
        it('should have proper default state', function() {
          var widget = new PagerWidget;
          expect(widget.getState()).toEqual({
            total: 0,
            pages: 0,
            pageSize: 10,
            currentPage: 1
          });
        });
      });

      xdescribe('with options', function() {
        it('partially applied', function() {
          var widget = new PagerWidget({
            total: 125
          });

          expect(widget.getState()).toEqual({
            total: 125,
            pages: 0,
            pageSize: 10,
            currentPage: 1
          });
        });
      });
    });
  });
});