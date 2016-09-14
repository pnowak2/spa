 define(function(require) {
   var Backbone = require('backbone'),
     $ = require('jquery'),
     ResultsMapView = require('./resultsMap.view'),
     PopupComponent = require('app/shared/components/mapping/popup/main.component'),
     MapComponent = require('app/shared/components/mapping/map/simple/main.component'),
     searchService = require('../services/search/search.service'),
     RSVP = require('rsvp'),
     app = require('app/shared/modules/app.module'),
     _ = require('underscore');

   describe('CE Results Map View', function() {
     describe('type', function() {
       it('should be of view', function() {
         expect(ResultsMapView.prototype).toEqual(jasmine.any(Backbone.View));
       });
     });

     describe('properties', function() {
       describe('.tagName', function() {
         it('should be div', function() {
           expect(ResultsMapView.prototype.tagName).toEqual('div');
         });
       });

       describe('.className', function() {
         it('should be defined', function() {
           expect(ResultsMapView.prototype.className).toEqual('efc-results-map');
         });
       });
     });

     describe('creation', function() {
       beforeEach(function() {
         spyOn(_, 'bindAll').and.callThrough();
         this.view = new ResultsMapView();
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
           expect(ResultsMapView.prototype.initMap).toEqual(jasmine.any(Function));
         });

         it('should delegate to map component', function() {
           var view = new ResultsMapView();
           spyOn(view.mapComponent, 'initMap');

           view.initMap();

           expect(view.mapComponent.initMap).toHaveBeenCalled();
         });
       });

       describe('.onSearchRequest()', function() {
         beforeEach(function() {
           spyOn(ResultsMapView.prototype, 'didSearchSucceed');
           spyOn(ResultsMapView.prototype, 'didSearchFail');

           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.onSearchRequest).toEqual(jasmine.any(Function));
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
           };

           this.view.onSearchRequest({});
         });

         it('should call failure method after search failed', function(done) {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.reject('error'));

           this.view.didSearchFail = function(error) {
             expect(error).toEqual('error');
             done();
           };

           this.view.onSearchRequest({});
         });

         it('should toggle country explanation based on search criteria', function() {
           spyOn(ResultsMapView.prototype, 'toggleCountryExplanation');
           this.view.onSearchRequest(this.fakeSearchCriteria);

           expect(this.view.toggleCountryExplanation).toHaveBeenCalledWith(this.fakeSearchCriteria);
         });
       });

       describe('.didSearchSucceed()', function() {
         beforeEach(function() {
           this.fakePreparedMarkersData = {};
           this.view = new ResultsMapView();

           spyOn(ResultsMapView.prototype, 'prepareMarkersData').and.returnValue(this.fakePreparedMarkersData);
           spyOn(this.view.mapComponent, 'showMarkers');
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.didSearchSucceed).toEqual(jasmine.any(Function));
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
           expect(ResultsMapView.prototype.didSearchFail).toEqual(jasmine.any(Function));
         });

         it('should show error message', function() {
           spyOn(app, 'showError');

           var view = new ResultsMapView(),
             fakeError = {};

           view.didSearchFail(fakeError);

           expect(app.showError).toHaveBeenCalledWith(fakeError);
         });
       });

       describe('.prepareMarkersData()', function() {
         beforeEach(function() {
           this.data = {
             total: 2,
             markers: [
               [{ /* country data */ }],
               [{ /* country data */ }]
             ]
           };
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareMarkersData).toEqual(jasmine.any(Function));
         });

         it('should not throw if invoked without arguments', function() {
           var self = this;
           expect(function() {
             self.view.prepareMarkersData();
           }).not.toThrow();
         });

         it('should return object with total markers count', function() {
           var markersData = this.view.prepareMarkersData(this.data);
           expect(markersData.total).toEqual(2);
         });

         it('should return object with array of markers', function() {
           var markersData = this.view.prepareMarkersData(this.data);
           expect(markersData).toEqual(jasmine.any(Object));
           expect(markersData.markers).toEqual(jasmine.any(Array));
           expect(markersData.markers.length).toEqual(2);
         });

         it('should convert array of markers with factory method', function() {
           var fakePreparedMarkerData = {},
             markers,
             markersData;

           spyOn(ResultsMapView.prototype, 'prepareMarkersByCountryData').and.returnValue(fakePreparedMarkerData);

           markersData = this.view.prepareMarkersData(this.data);

           expect(markersData.markers[0]).toBe(fakePreparedMarkerData);
         });
       });

       describe('.prepareMarkersByCountryData()', function() {
         beforeEach(function() {
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareMarkersByCountryData).toEqual(jasmine.any(Function));
         });

         it('should not throw if invoked without arguments', function() {
           var self = this;
           expect(function() {
             self.view.prepareMarkersByCountryData();
           }).not.toThrow();
         });

         it('should convert country items to marker data items', function() {
           var countryItem1 = {
               id: '123',
               lat: 2,
               lng: 4,
               title: 'Project title 1',
               description: 'Project description 1',
               activity: 'Project activity 1',
               coordinator: 'Project coordinator 1'
             },
             countryItem2 = {
               id: '456',
               lat: 3,
               lng: 5,
               title: 'Project title 2',
               description: 'Project description 2',
               activity: 'Project activity 2',
               coordinator: 'Project coordinator 2'
             },
             countryItems = [countryItem1, countryItem2],
             markersByCountry = this.view.prepareMarkersByCountryData(countryItems),
             popupContent1 = new PopupComponent({
               type: 'efc-project',
               data: countryItem1
             }).render().view.el,
             popupContent2 = new PopupComponent({
               type: 'efc-project',
               data: countryItem2
             }).render().view.el;

           expect(markersByCountry.length).toBe(2);

           expect(markersByCountry[0].id).toEqual('123');
           expect(markersByCountry[0].lat).toEqual(2);
           expect(markersByCountry[0].lng).toEqual(4);
           expect(markersByCountry[0].popupContent.outerHTML).toEqual(popupContent1.outerHTML);

           expect(markersByCountry[1].id).toEqual('456');
           expect(markersByCountry[1].lat).toEqual(3);
           expect(markersByCountry[1].lng).toEqual(5);
           expect(markersByCountry[1].popupContent.outerHTML).toEqual(popupContent2.outerHTML);
         });
       });

       describe('.toggleCountryExplanation()', function() {
         beforeEach(function() {
           this.view = new ResultsMapView();
           this.view.render();

           spyOn($.prototype, 'toggle');
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.toggleCountryExplanation).toEqual(jasmine.any(Function));
         });

         it('should hide country explanation if not searching by country', function() {

           this.view.toggleCountryExplanation({
             countries: []
           });

           expect(this.view.getCountryExplanationContainer().toggle).toHaveBeenCalledWith(false);
         });

         it('should show country explanation if searching by country', function() {
           this.view.toggleCountryExplanation({
             countries: ['2014']
           });

           expect(this.view.getCountryExplanationContainer().toggle).toHaveBeenCalledWith(true);
         });
       });

       describe('.getMapContainer()', function() {
         it('should be defined', function() {
           expect(ResultsMapView.prototype.getMapContainer).toEqual(jasmine.any(Function));
         });

         it('should retrieve correct element', function() {
           spyOn($.prototype, 'find').and.callFake(function(selector) {
             if (selector === '.efc-results-map__map-container') {
               return 'fakeMapContainer';
             }
           });

           var view = new ResultsMapView();
           expect(view.getMapContainer()).toBe('fakeMapContainer');
         });
       });

       describe('.getCountryExplanationContainer()', function() {
         it('should be defined', function() {
           expect(ResultsMapView.prototype.getCountryExplanationContainer).toEqual(jasmine.any(Function));
         });

         it('should retrieve correct element', function() {
           spyOn($.prototype, 'find').and.callFake(function(selector) {
             if (selector === '.efc-results-map__map-country-search-explanation') {
               return 'fakeCountryExplanationContainer';
             }
           });

           var view = new ResultsMapView();
           expect(view.getCountryExplanationContainer()).toBe('fakeCountryExplanationContainer');
         });
       });
     });

     describe('rendering', function() {
       describe('.render()', function() {
         beforeEach(function() {
           this.view = new ResultsMapView();
         });

         it('should return view object', function() {
           expect(this.view.render()).toBe(this.view);
         });

         it('should render country search explanation', function() {
           this.view.render();
           expect(this.view.$el).toContainElement('.efc-results-map__map-country-search-explanation');
         });

         it('should render map container', function() {
           this.view.render();
           expect(this.view.$el).toContainElement('.efc-results-map__map-container');
         });

         it('should render results map component', function() {
           this.view.render();
           expect(this.view.$el.find('.efc-results-map__map-container')).toContainHtml(this.view.mapComponent.render().view.$el.html());
         });
       });
     });
   });
 });