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
    });
  });
});