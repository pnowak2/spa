define(function(require) {
  var Component = require('app/core/component'),
    SearchComponent = require('./main.component'),
    SearchView = require('./views/search.view');

  describe('Search Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have view defined', function() {
        var component = new SearchComponent;
        expect(component.view).toEqual(jasmine.any(SearchView));
      });

      it('should pass data to view', function() {
        spyOn(SearchView.prototype, 'initialize');

        var fakeData = {},
          component = new SearchComponent(fakeData);

        expect(component.view.initialize).toHaveBeenCalledWith(fakeData);
      });
    });

    describe('events', function() {
      it('should trigger search event on searchbox search action', function(done) {
        var component = new SearchComponent,
          fakeCriteria = {};

        component.on('search:search', function(criteria) {
          expect(criteria).toBe(fakeCriteria);
          done();
        });

        component.view.trigger('search:search', fakeCriteria);
      });
    });
  });
});