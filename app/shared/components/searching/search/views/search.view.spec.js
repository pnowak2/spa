define(function(require) {
  var Backbone = require('backbone'),
    SearchView = require('./search.view'),
    SearchBoxComponent = require('app/shared/components/searching/search-box/main.component'),
    DummyAdvancedSearchComponent = require('../components/dummyAdvancedSearch/main.component');

  describe('Search View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(SearchView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        this.view = new SearchView();
      });

      it('should have search box component defined', function() {
        expect(this.view.searchBox).toEqual(jasmine.any(SearchBoxComponent));
      });

      it('should have default dummy advanced search component defined if not provided', function() {
        expect(this.view.advancedSearch).toEqual(jasmine.any(DummyAdvancedSearchComponent));
      });

      it('should have passed advanced search component defined if provided', function() {
        var fakeASC = {},
          view = new SearchView({
            advancedSearchComponent: fakeASC
          });

        expect(view.advancedSearch).toBe(fakeASC);
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(SearchView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(SearchView.prototype.className).toEqual('vlr-search');
      });
    });

    describe('api', function() {
      describe('.didRequestSearch()', function() {
        beforeEach(function() {
          this.view = new SearchView();

          this.fakeSearchBoxCriteria = {
            keyword: 'foo'
          };
          this.fakeAdvancedSearchState = {
            countries: ['pl', 'lu'],
            activities: ['act1', 'act2']
          };

          spyOn(SearchView.prototype, 'trigger');
          spyOn(DummyAdvancedSearchComponent.prototype, 'getCriteria').and.returnValue(this.fakeAdvancedSearchState);
          spyOn(DummyAdvancedSearchComponent.prototype, 'isDirty').and.returnValue(true);
        });

        it('should be defined', function() {
          expect(SearchView.prototype.didRequestSearch).toEqual(jasmine.any(Function));
        });

        it('should trigger view event with merged search box and advanced search criteria', function() {
          this.view.didRequestSearch(this.fakeSearchBoxCriteria);

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
          var view = new SearchView();

          spyOn(view.advancedSearch, 'toggle');

          expect(view.advancedSearch.toggle).not.toHaveBeenCalled();
          view.didRequestMore();
          expect(view.advancedSearch.toggle).toHaveBeenCalled();
        });
      });

      describe('.didPressKeyInSearchbox()', function() {
        beforeEach(function() {
          this.view = new SearchView();

          spyOn(this.view.advancedSearch, 'show');
          spyOn(this.view.searchBox, 'toggleMoreButtonStateToOpened');
        });

        it('should be defined', function() {
          expect(SearchView.prototype.didPressKeyInSearchbox).toEqual(jasmine.any(Function));
        });

        it('should show advanced search and toggle more button to open if criteria is changed (dirty)', function() {
          spyOn(this.view.advancedSearch, 'isDirty').and.returnValue(true);

          this.view.didPressKeyInSearchbox();

          expect(this.view.advancedSearch.show).toHaveBeenCalled();
          expect(this.view.searchBox.toggleMoreButtonStateToOpened).toHaveBeenCalled();
        });

        it('should not show advanced search nor toggle more button to open if criteria is changed (dirty)', function() {
          spyOn(this.view.advancedSearch, 'isDirty').and.returnValue(false);

          this.view.didPressKeyInSearchbox();

          expect(this.view.advancedSearch.show).not.toHaveBeenCalled();
          expect(this.view.searchBox.toggleMoreButtonStateToOpened).not.toHaveBeenCalled();
        });
      });

      describe('.update()', function() {
        beforeEach(function() {
          this.view = new SearchView();
          this.fakeCriteria = {};

          spyOn(this.view.searchBox, 'update');
          spyOn(this.view.advancedSearch, 'update');

          this.view.update(this.fakeCriteria);
        });

        it('should be defined', function() {
          expect(SearchView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should update search box', function() {
          expect(this.view.searchBox.update).toHaveBeenCalledWith(this.fakeCriteria);
        });

        it('should update advanced search', function() {
          expect(this.view.advancedSearch.update).toHaveBeenCalledWith(this.fakeCriteria);
        });

        it('should not raise error if update method in advanced search is not defined', function() {
          var view = new SearchView();
          view.advancedSearch = {};

          expect(function() {
            view.update();
          }).not.toThrow();
        });

        it('should not pass falsy criteria to search box', function() {
          var view = new SearchView(),
            fakeCriteria = void 0;

          spyOn(view.searchBox, 'update');

          view.update(fakeCriteria);

          expect(view.searchBox.update).toHaveBeenCalledWith({});
        });

        it('should not pass falsy criteria to advanced search', function() {
          var view = new SearchView(),
            fakeCriteria = void 0;

          spyOn(view.advancedSearch, 'update');

          view.update(fakeCriteria);

          expect(view.advancedSearch.update).toHaveBeenCalledWith({});
        });
      });
    });

    describe('events', function() {
      beforeEach(function() {
        spyOn(SearchView.prototype, 'didRequestSearch');
        spyOn(SearchView.prototype, 'didRequestMore');
        spyOn(SearchView.prototype, 'didPressKeyInSearchbox');

        this.view = new SearchView();
      });

      it('should call method on search box search event', function() {
        var fakeCriteria = {};
        this.view.searchBox.trigger('search-box:search', fakeCriteria);

        expect(this.view.didRequestSearch).toHaveBeenCalledWith(fakeCriteria);
      });

      it('should call method on search box more event', function() {
        this.view.searchBox.trigger('search-box:more');
        expect(this.view.didRequestMore).toHaveBeenCalled();
      });

      it('should call method on search key down event', function() {
        this.view.searchBox.trigger('search-box:key-down');
        expect(this.view.didPressKeyInSearchbox).toHaveBeenCalled();
      });
    });

    describe('rendering', function() {
      beforeEach(function() {
        this.view = new SearchView();
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