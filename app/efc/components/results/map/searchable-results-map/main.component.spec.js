define(function(require) {
  var Component = require('app/core/component'),
    SearchableResultsMapComponent = require('./main.component');

  describe('Searchable Results Map Component', function() {
    describe('type', function() {
      it('should be of component', function() {
        expect(SearchableResultsMapComponent.prototype).toEqual(jasmine.any(Component));
      });
    });
  });
});