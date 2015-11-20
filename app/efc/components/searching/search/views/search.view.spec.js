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

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(SearchView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(SearchView.prototype.className).toEqual('efc-search');
      });
    });

    describe('api', function() {
      describe('.didRequestSearch()', function() {
        it('should be defined', function() {
          expect(SearchView.prototype.didRequestSearch).toEqual(jasmine.any(Function));
        });
      });

      describe('.didRequestMore()', function() {
        it('should be defined', function() {
          expect(SearchView.prototype.didRequestMore).toEqual(jasmine.any(Function));
        });
      });
    });

    describe('events', function() {
      beforeEach(function() {
        spyOn(SearchView.prototype, 'didRequestSearch');
        spyOn(SearchView.prototype, 'didRequestMore');

        this.view = new SearchView;
      });

      it('should call method on search box search event', function() {
        var fakeCriteria = {};
        this.view.searchBox.trigger('search-box:search', fakeCriteria)

        expect(this.view.didRequestSearch).toHaveBeenCalledWith(fakeCriteria);
      });

      it('should call method on search box more event', function() {
        this.view.searchBox.trigger('search-box:more')
        expect(this.view.didRequestMore).toHaveBeenCalled();
      });
    });
  });
});