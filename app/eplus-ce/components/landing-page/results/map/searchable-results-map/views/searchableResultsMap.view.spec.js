 define(function(require) {
   var Backbone = require('backbone'),
     $ = require('jquery'),
     _ = require('underscore'),
     SearchableResultsMapView = require('./searchableResultsMap.view'),
     MapComponent = require('app/shared/components/mapping/map/extended/main.component');

   describe('Eplus/CE Searchable Results Map View', function() {
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
           expect(SearchableResultsMapView.prototype.className).toEqual('eplus-ce-searchable-results-map');
         });
       });
     });

     describe('creation', function() {
       beforeEach(function() {
         spyOn(_, 'bindAll').and.callThrough();
         this.view = new SearchableResultsMapView;
       });

       it('should have results map component defined', function() {
         expect(this.view.mapComponent).toEqual(jasmine.any(MapComponent));
       });

       it('should bind callback methods with view object', function() {
         expect(_.bindAll).toHaveBeenCalledWith(this.view, 'didSearchSucceed', 'didSearchFail');
       });
     });

     describe('api', function() {
       describe('.initMap()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.initMap).toEqual(jasmine.any(Function));
         });

         it('should delegate to map component', function() {
           var view = new SearchableResultsMapView;
           spyOn(view.mapComponent, 'initMap');

           view.initMap();

           expect(view.mapComponent.initMap).toHaveBeenCalled();
         });
       });

       describe('.onSearchRequest()', function() {
         beforeEach(function() {
           this.view = new SearchableResultsMapView;
         });

         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
         });

         it('should not throw if called without args', function() {
           var self = this;
           expect(function() {
             self.view.onSearchRequest();
           }).not.toThrow();
         });
       });

       describe('.didSearchSucceed()', function() {
         beforeEach(function() {
           this.view = new SearchableResultsMapView;
         });

         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.didSearchSucceed).toEqual(jasmine.any(Function));
         });

         it('should not throw if invoked without arguments', function() {
           var self = this;
           expect(function() {
             self.view.didSearchSucceed();
           }).not.toThrow();
         });
       });

       describe('.didSearchFail()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.didSearchFail).toEqual(jasmine.any(Function));
         });
       });

       describe('.prepareMarkersData()', function() {
         beforeEach(function() {
           this.view = new SearchableResultsMapView;
         });

         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.prepareMarkersData).toEqual(jasmine.any(Function));
         });

         it('should not throw if invoked without arguments', function() {
           var self = this;
           expect(function() {
             self.view.prepareMarkersData();
           }).not.toThrow();
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

         it('should render map component', function() {
           this.view.render();
           expect(this.view.$el).toContainHtml(this.view.mapComponent.render().view.$el.html());
         });
       });
     });
   });
 });