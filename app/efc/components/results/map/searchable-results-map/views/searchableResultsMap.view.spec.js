 define(function(require) {
   var Backbone = require('backbone'),
     SearchableResultsMapView = require('./searchableResultsMap.view');

   describe('Searchable Results Map View', function() {
     describe('type', function() {
       it('should be of view', function() {
         expect(SearchableResultsMapView.prototype).toEqual(jasmine.any(Backbone.View));
       });
     });
   });
 });