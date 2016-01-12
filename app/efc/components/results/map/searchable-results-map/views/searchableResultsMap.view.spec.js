 define(function(require) {
   var Backbone = require('backbone'),
     SearchableResultsMapView = require('./searchableResultsMap.view'),
     ProjectPopupComponent = require('app/efc/components/mapping/popups/project/main.component'),
     MapComponent = require('app/efc/components/mapping/map/main.component'),
     searchService = require('../services/search/search.service'),
     RSVP = require('rsvp'),
     app = require('app/app.module'),
     _ = require('underscore');

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
           spyOn(SearchableResultsMapView.prototype, 'didSearchSucceed');
           spyOn(SearchableResultsMapView.prototype, 'didSearchFail');

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

         it('should call search service with argument provided', function() {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.resolve());

           var fakeSearchCriteria = {
             keyword: 'bar'
           };

           this.view.onSearchRequest(fakeSearchCriteria);

           expect(searchService.search).toHaveBeenCalledWith(fakeSearchCriteria);
         });

         it('should call success method after search done', function(done) {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.resolve('success'));

           this.view.didSearchSucceed = function(data) {
             expect(data).toEqual('success');
             done();
           }

           this.view.onSearchRequest({});
         });

         it('should call failure method after search failed', function(done) {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.reject('error'));

           this.view.didSearchFail = function(error) {
             expect(error).toEqual('error');
             done();
           }

           this.view.onSearchRequest({});
         });
       });

       describe('.didSearchSucceed()', function() {
         beforeEach(function() {
           this.fakePreparedMarkersData = {},
           this.view = new SearchableResultsMapView;

           spyOn(SearchableResultsMapView.prototype, 'prepareMarkersData').and.returnValue(this.fakePreparedMarkersData)
           spyOn(this.view.mapComponent, 'showMarkers');
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

         it('should update map component with prepared markers data', function() {
           var fakeData = {};

           this.view.didSearchSucceed(fakeData);
           expect(this.view.prepareMarkersData).toHaveBeenCalledWith(fakeData);
           expect(this.view.mapComponent.showMarkers).toHaveBeenCalledWith(this.fakePreparedMarkersData);
         });
       });

       describe('.didSearchFail()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.didSearchFail).toEqual(jasmine.any(Function));
         });

         it('should show error message', function() {
           spyOn(app, 'showError');

           var view = new SearchableResultsMapView,
             fakeError = {};

           view.didSearchFail(fakeError);

           expect(app.showError).toHaveBeenCalledWith(fakeError);
         });
       });

       describe('.prepareMarkerData()', function() {
         beforeEach(function() {
           this.view = new SearchableResultsMapView;
         });

         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.prepareMarkerData).toEqual(jasmine.any(Function));
         });

         it('should not throw if invoked without arguments', function() {
           var self = this;
           expect(function() {
             self.view.prepareMarkerData();
           }).not.toThrow();
         });

         it('convert data item to marker data', function() {
           var dataItem = {
               id: '1',
               lat: 2,
               lng: 4,
               title: 'Project title',
               description: 'Project description',
               activity: 'Project activity',
               coordinator: 'Project coordinator'
             },
             marker = this.view.prepareMarkerData(dataItem),
             popupContent = new ProjectPopupComponent({
               popupData: dataItem
             }).render().view.el;

           expect(marker.lat).toEqual(2);
           expect(marker.lng).toEqual(4);
           expect(marker.popupContent.outerHTML).toEqual(popupContent.outerHTML);
         });
       });

       describe('.prepareMarkersData()', function() {
         beforeEach(function() {
           this.data = {
             total: 1,
             items: [{}]
           }
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

         it('should return array of markers', function() {
           var markers = this.view.prepareMarkersData(this.data);
           expect(markers).toEqual(jasmine.any(Array));
           expect(markers.length).toEqual(1);
         });

         it('should convert array of markers with factory method', function() {
           var fakePreparedMarkerData = {},
             markers;

           spyOn(SearchableResultsMapView.prototype, 'prepareMarkerData').and.returnValue(fakePreparedMarkerData);

           markers = this.view.prepareMarkersData(this.data);

           expect(markers[0]).toBe(fakePreparedMarkerData);
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