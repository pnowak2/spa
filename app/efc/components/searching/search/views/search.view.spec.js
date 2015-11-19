define(function(require) {
  var Backbone = require('backbone'),
    SearchView = require('./search.view'),
    SearchBoxComponent = require('app/efc/components/searching/search-box/main.component'),
    AdvancedSearchComponent = require('app/efc/components/searching/advanced-search/main.component');

  describe('Search View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(SearchView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.view = new SearchView;
      });

      it('should have search box component defined', function() {
        expect(this.view.searchBox).toEqual(jasmine.any(SearchBoxComponent));
      });

      it('should have advanced search component defined', function() {
        expect(this.view.advancedSearch).toEqual(jasmine.any(AdvancedSearchComponent));
      });

      it('should pass data to search box component', function() {
        spyOn(SearchBoxComponent.prototype, 'initialize');

        var fakeData = {},
          view = new SearchView(fakeData);

        expect(view.searchBox.initialize).toHaveBeenCalledWith(fakeData);
      });

      it('should pass data to advanced search component', function() {
        spyOn(AdvancedSearchComponent.prototype, 'initialize');

        var fakeData = {},
          view = new SearchView(fakeData);

        expect(view.advancedSearch.initialize).toHaveBeenCalledWith(fakeData);
      });
    });
  });
});