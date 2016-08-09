define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    LandingPageView = require('./landingPage.view'),
    AdvancedSearchComponent = require('app/ce/components/landing-page/searching/advanced-search/main.component'),
    SearchComponent = require('app/shared/components/searching/search/main.component');

  describe('CE Landing Page View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(LandingPageView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(LandingPageView.prototype, 'render');
        spyOn(SearchComponent.prototype, 'initialize');

        this.view = new LandingPageView;
      });

      it('should have search component defined ', function() {
        expect(this.view.search).toEqual(jasmine.any(SearchComponent));
      });

      it('should initialize search component with correct advanced search component in options', function() {
        var passedOptions = SearchComponent.prototype.initialize.calls.mostRecent().args[0];
        expect(passedOptions.advancedSearchComponent).toEqual(jasmine.any(AdvancedSearchComponent));
      });

      it('should render the component', function() {
        expect(this.view.render).toHaveBeenCalled();
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          jasmine.getFixtures().fixturesPath = 'fixtures';
          loadFixtures('ce.landing-page.fixture.html');

          this.view = new LandingPageView;
          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render search component in appropriate container', function() {
          var markup = this.view.search.render().view.el;
          expect($('.ce-search-container')).toContainHtml(markup);
        });
      });
    });
  });
});