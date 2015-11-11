define(function(require) {
  var SearchBoxComponent = require('app/widgets/search/search-box/main.component'),
    SearchBoxView = require('app/widgets/search/search-box/views/searchBox.view'),
    Component = require('app/core/component');

  describe('SearchBox Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchBoxComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should be initialized with proper view', function() {
        var component = new SearchBoxComponent;
        expect(component.view).toEqual(jasmine.any(SearchBoxView));
      });
    });

    describe('events', function() {
      it('should trigger event on search', function(done) {
        var component = new SearchBoxComponent,
          fakeSearchCriteria = {};

        component.on('search:keyword', function(searchCriteria) {
          expect(searchCriteria).toBe(fakeSearchCriteria);
          done();
        });

        component.view.trigger('search:keyword', fakeSearchCriteria);
      });
    });
  });
});