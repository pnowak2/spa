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
        beforeEach(function() {
          this.view = new SearchView;
        });

        it('should be defined', function() {
          expect(SearchView.prototype.didRequestSearch).toEqual(jasmine.any(Function));
        });

        it('should trigger view event with merged search box and advanced search criteria', function() {
          var fakeSearchBoxCriteria = {
              keyword: 'foo'
            },
            fakeAdvancedSearchState = {
              countries: ['pl', 'lu'],
              activities: ['act1', 'act2']
            };

          spyOn(SearchView.prototype, 'trigger');
          spyOn(AdvancedSearchComponent.prototype, 'getCriteria').and.returnValue(fakeAdvancedSearchState);

          this.view.didRequestSearch(fakeSearchBoxCriteria);

          expect(this.view.trigger).toHaveBeenCalledWith('search:search', {
            keyword: 'foo',
            countries: ['pl', 'lu'],
            activities: ['act1', 'act2']
          });
        });

        it('should hide advanced search', function() {
          spyOn(this.view.advancedSearch, 'hide');

          this.view.didRequestSearch();

          expect(this.view.advancedSearch.hide).toHaveBeenCalled();
        });
      });

      describe('.didRequestMore()', function() {
        it('should be defined', function() {
          expect(SearchView.prototype.didRequestMore).toEqual(jasmine.any(Function));
        });

        it('should toggle the advanced search component', function() {
          var view = new SearchView;

          spyOn(view.advancedSearch, 'toggle');

          expect(view.advancedSearch.toggle).not.toHaveBeenCalled();
          view.didRequestMore();
          expect(view.advancedSearch.toggle).toHaveBeenCalled();
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

    describe('rendering', function() {
      beforeEach(function() {
        this.view = new SearchView;
        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render searchbox markup', function() {
          expect(this.$el).toContainHtml(this.view.searchBox.render().view.el);
        });

        it('should render advanced search markup', function() {
          expect(this.$el).toContainHtml(this.view.advancedSearch.render().view.el);
        });
      });
    });
  });
});