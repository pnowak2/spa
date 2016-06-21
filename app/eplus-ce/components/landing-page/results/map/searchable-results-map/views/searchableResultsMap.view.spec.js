 define(function(require) {
   var Backbone = require('backbone'),
     $ = require('jquery'),
     _ = require('underscore'),
     app = require('app/shared/modules/app.module'),
     RSVP = require('rsvp'),
     SearchableResultsMapView = require('./searchableResultsMap.view'),
     MapComponent = require('app/shared/components/mapping/map/extended/main.component'),
     searchService = require('../services/search/search.service');

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

       it('should have empty cached criteria defined', function() {
         expect(this.view.cachedCriteria).toEqual({});
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

       describe('.prepareSearchCriteria()', function() {
         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.prepareSearchCriteria).toEqual(jasmine.any(Function));
         });

         it('should extend search criteria with pager state', function() {
           var fakeCriteria = {
               keyword: 'foo'
             },
             fakeMapState = {
               currentZoom: 5
             },
             view = new SearchableResultsMapView;


           var preparedCriteria = view.prepareSearchCriteria(fakeCriteria, fakeMapState);

           expect(preparedCriteria).toEqual(jasmine.objectContaining({
             keyword: 'foo',
             currentZoom: 5
           }));
         });
       });

       describe('.onSearchRequest()', function() {
         beforeEach(function() {
           spyOn(SearchableResultsMapView.prototype, 'performSearch');
           spyOn(SearchableResultsMapView.prototype, 'didSearchSucceed');
           spyOn(SearchableResultsMapView.prototype, 'didSearchFail');

           this.fakeMapState = {
             currentZoom: 5
           };

           spyOn(MapComponent.prototype, 'getState').and.returnValue(this.fakeMapState);

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

         it('should prepare search criteria with criteria argument and map state', function() {
           var fakeCriteria = {
               keyword: 'foo'
             },
             fakeMapState = {
               currentZoom: 5
             };

           spyOn(SearchableResultsMapView.prototype, 'prepareSearchCriteria');

           this.view.onSearchRequest(fakeCriteria);

           expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeCriteria, fakeMapState);
         });

         it('should call perform search with prepared criteria', function() {
           var fakePreparedCriteria = {
             keyword: 'foo'
           };
           spyOn(SearchableResultsMapView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

           this.view.onSearchRequest({});

           expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
         });

         it('should update cached criteria for later use', function() {
           var fakePreparedCriteria = {
             keyword: 'foo'
           };

           spyOn(SearchableResultsMapView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

           expect(this.view.cachedCriteria).toEqual({});
           this.view.onSearchRequest({});
           expect(this.view.cachedCriteria).toBe(fakePreparedCriteria);
         });
       });

       describe('.onMapBoundsChanged()', function() {
         beforeEach(function() {
           spyOn(SearchableResultsMapView.prototype, 'performSearch');
           this.view = new SearchableResultsMapView;
         });

         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.onMapBoundsChanged).toEqual(jasmine.any(Function));
         });

         it('should prepare search criteria with cached criteria and map state', function() {
           var fakeCachedCriteria = {
               keyword: 'bar'
             },
             fakeMapState = {
               currentZoom: 6
             };

           spyOn(SearchableResultsMapView.prototype, 'prepareSearchCriteria');

           this.view.cachedCriteria = fakeCachedCriteria;
           this.view.onMapBoundsChanged(fakeMapState);

           expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeCachedCriteria, fakeMapState);
         });

         it('should call perform search with prepared search criteria', function() {
           var fakePreparedCriteria = {
             keyword: 'foo'
           };

           spyOn(SearchableResultsMapView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

           this.view.onMapBoundsChanged({});

           expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
         });
       });

       describe('.performSearch()', function() {
         beforeEach(function() {
           this.view = new SearchableResultsMapView;
         });

         it('should be defined', function() {
           expect(SearchableResultsMapView.prototype.performSearch).toEqual(jasmine.any(Function));
         });

         it('should call search service with argument provided', function() {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.resolve());

           var fakeCriteria = {
             keyword: 'bar'
           };

           this.view.performSearch(fakeCriteria);

           expect(searchService.search).toHaveBeenCalledWith(fakeCriteria);
         });

         it('should call success method after search done', function(done) {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.resolve('success'));

           this.view.didSearchSucceed = function(data) {
             expect(data).toEqual('success');
             done();
           }

           this.view.performSearch({});
         });

         it('should call failure method after search failed', function(done) {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.reject('error'));

           this.view.didSearchFail = function(error) {
             expect(error).toEqual('error');
             done();
           }

           this.view.performSearch({});
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

         it('should show error message', function() {
           spyOn(app, 'showError');

           var view = new SearchableResultsMapView,
             fakeError = {};

           view.didSearchFail(fakeError);

           expect(app.showError).toHaveBeenCalledWith(fakeError);
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

     describe('events', function() {
       it('should listen to map boundary change events', function() {
         spyOn(SearchableResultsMapView.prototype, 'onMapBoundsChanged');

         var view = new SearchableResultsMapView,
           fakeBoundsChangedEvent = {};

         view.mapComponent.trigger('map:bounds-changed', fakeBoundsChangedEvent);

         expect(view.onMapBoundsChanged).toHaveBeenCalledWith(fakeBoundsChangedEvent);
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