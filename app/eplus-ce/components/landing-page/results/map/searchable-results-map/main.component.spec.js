define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsMapView = require('./views/searchableResultsMap.view'),
    SearchableResultsMapComponent = require('./main.component');

  describe('Eplus/CE Searchable Results Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchableResultsMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });

    describe('creation', function() {
      it('should have proper view defined', function() {
        var component = new SearchableResultsMapComponent;
        expect(component.view).toEqual(jasmine.any(SearchableResultsMapView));
      });
    });
  });
});