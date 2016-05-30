 define(function(require) {
   var Backbone = require('backbone'),
     $ = require('jquery'),
     _ = require('underscore'),
     SearchableResultsMapView = require('./searchableResultsMap.view');

   describe('Eplus/CE Searchable Results Map View', function() {
     describe('type', function() {
       it('should be of view', function() {
         expect(SearchableResultsMapView.prototype).toEqual(jasmine.any(Backbone.View));
       });
     });

     describe('rendering', function() {
       describe('.render()', function() {
         beforeEach(function() {
           this.view = new SearchableResultsMapView;
         });

         it('should return view object', function() {
           expect(this.view.render()).toBe(this.view);
         });
       });
     });
   });
 });