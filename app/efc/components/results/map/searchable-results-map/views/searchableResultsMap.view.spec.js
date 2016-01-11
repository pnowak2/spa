 define(function(require) {
   var Backbone = require('backbone'),
     SearchableResultsMapView = require('./searchableResultsMap.view'),
     MapComponent = require('app/efc/components/mapping/map/main.component');

   describe('Searchable Results Map View', function() {
     describe('type', function() {
       it('should be of view', function() {
         expect(SearchableResultsMapView.prototype).toEqual(jasmine.any(Backbone.View));
       });
     });

     describe('properties', function() {
       describe('.tagName', function() {
         it('should be div', function() {
           expect(SearchableResultsMapView.prototype.tagName).toEqual('div');
         });
       });

       describe('.className', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.className).toEqual('efc-searchable-results-map');
         });
       });
     });

     describe('creation', function() {
       beforeEach(function() {
         this.view = new SearchableResultsMapView;
       });

       it('should have results list component defined', function() {
         expect(this.view.mapComponent).toEqual(jasmine.any(MapComponent));
       });
     });

     describe('api', function() {
       describe('.onSearchRequest()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
         });
       });

       describe('.didSearchSucceed()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.didSearchSucceed).toEqual(jasmine.any(Function));
         });
       });

       describe('.didSearchFail()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.didSearchFail).toEqual(jasmine.any(Function));
         });
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

         it('should append results map component', function() {
           this.view.render();
           expect(this.view.$el).toContainHtml(this.view.mapComponent.render().view.$el.html());
         });
       });
     });
   });
 });