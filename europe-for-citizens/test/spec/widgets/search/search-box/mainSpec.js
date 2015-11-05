define(function(require) {
  var SearchBoxWidget = require('app/widgets/search/search-box/main'),
    SearchBoxView = require('app/widgets/search/search-box/views/searchBoxView'),
    Widget = require('app/core/widget');

  describe('SearchBox Widget', function() {
    describe('type', function() {
      it('should be of widget', function() {
        expect(SearchBoxWidget.prototype).toEqual(jasmine.any(Widget));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var widget = new SearchBoxWidget;
        expect(widget.view).toEqual(jasmine.any(SearchBoxView));
      });
    });

    describe('events', function() {
      it('should trigger event on search', function(done) {
        var widget = new SearchBoxWidget,
          fakeSearchCriteria = {};

        widget.on('search:keyword', function(searchCriteria) {
          expect(searchCriteria).toBe(fakeSearchCriteria);
          done();
        });

        widget.view.trigger('search:keyword', fakeSearchCriteria);
      });
    });
  });
});