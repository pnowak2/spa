 define(function(require) {
   var Backbone = require('backbone'),
     $ = require('jquery'),
     _ = require('underscore'),
     app = require('app/shared/modules/app.module'),
     RSVP = require('rsvp'),
     ResultsMapView = require('./resultsMap.view'),
     MapComponent = require('app/shared/components/mapping/map/extended/main.component'),
     PopupComponent = require('app/shared/components/mapping/popup/main.component'),
     searchService = require('../services/search/search.service');

   describe('Eplus Results Map View', function() {
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
           expect(ResultsMapView.prototype.className).toEqual('eplus-results-map');
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

       it('should have empty cached criteria defined', function() {
         expect(this.view.cachedCriteria).toEqual({});
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

       describe('.prepareSearchCriteria()', function() {
         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareSearchCriteria).toEqual(jasmine.any(Function));
         });

         it('should extend search criteria with pager state', function() {
           var fakeCriteria = {
               keyword: 'foo'
             },
             fakeMapState = {
               currentZoom: 5
             },
             view = new ResultsMapView();


           var preparedCriteria = view.prepareSearchCriteria(fakeCriteria, fakeMapState);

           expect(preparedCriteria).toEqual(jasmine.objectContaining({
             keyword: 'foo',
             currentZoom: 5
           }));
         });
       });

       describe('.onSearchRequest()', function() {
         beforeEach(function() {
           spyOn(ResultsMapView.prototype, 'performSearch');
           spyOn(ResultsMapView.prototype, 'didSearchSucceed');
           spyOn(ResultsMapView.prototype, 'didSearchFail');

           this.fakeMapState = {
             currentZoom: 5
           };

           spyOn(MapComponent.prototype, 'getState').and.returnValue(this.fakeMapState);

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

         it('should prepare search criteria with criteria argument and map state', function() {
           var fakeCriteria = {
               keyword: 'foo'
             },
             fakeMapState = {
               currentZoom: 5
             };

           spyOn(ResultsMapView.prototype, 'prepareSearchCriteria');

           this.view.onSearchRequest(fakeCriteria);

           expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeCriteria, fakeMapState);
         });

         it('should call perform search with prepared criteria', function() {
           var fakePreparedCriteria = {
             keyword: 'foo'
           };
           spyOn(ResultsMapView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

           this.view.onSearchRequest({});

           expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
         });

         it('should update cached criteria for later use', function() {
           var fakePreparedCriteria = {
             keyword: 'foo'
           };

           spyOn(ResultsMapView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

           expect(this.view.cachedCriteria).toEqual({});
           this.view.onSearchRequest({});
           expect(this.view.cachedCriteria).toBe(fakePreparedCriteria);
         });
       });

       describe('.onMapBoundsChanged()', function() {
         beforeEach(function() {
           spyOn(ResultsMapView.prototype, 'performSearch');
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.onMapBoundsChanged).toEqual(jasmine.any(Function));
         });

         it('should prepare search criteria with cached criteria and map state', function() {
           var fakeCachedCriteria = {
               keyword: 'bar'
             },
             fakeMapState = {
               currentZoom: 6
             };

           spyOn(ResultsMapView.prototype, 'prepareSearchCriteria');

           this.view.cachedCriteria = fakeCachedCriteria;
           this.view.onMapBoundsChanged(fakeMapState);

           expect(this.view.prepareSearchCriteria).toHaveBeenCalledWith(fakeCachedCriteria, fakeMapState);
         });

         it('should call perform search with prepared search criteria', function() {
           var fakePreparedCriteria = {
             keyword: 'foo'
           };

           spyOn(ResultsMapView.prototype, 'prepareSearchCriteria').and.returnValue(fakePreparedCriteria);

           this.view.onMapBoundsChanged({});

           expect(this.view.performSearch).toHaveBeenCalledWith(fakePreparedCriteria);
         });
       });

       describe('.performSearch()', function() {
         beforeEach(function() {
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.performSearch).toEqual(jasmine.any(Function));
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
           };

           this.view.performSearch({});
         });

         it('should call failure method after search failed', function(done) {
           spyOn(searchService, 'search').and.returnValue(RSVP.Promise.reject('error'));

           this.view.didSearchFail = function(error) {
             expect(error).toEqual('error');
             done();
           };

           this.view.performSearch({});
         });
       });

       describe('.didSearchSucceed()', function() {
         beforeEach(function() {
           this.fakePreparedMarkersData = {};
           spyOn(ResultsMapView.prototype, 'prepareMarkersData').and.returnValue(this.fakePreparedMarkersData);
           spyOn(MapComponent.prototype, 'showMarkers');

           this.view = new ResultsMapView();
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

         it('should prepare markers for display', function() {
           var fakeData = {};
           this.view.didSearchSucceed(fakeData);

           expect(this.view.prepareMarkersData).toHaveBeenCalledWith(fakeData);
         });

         it('should update map component with data', function() {
           this.view.didSearchSucceed();
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
             items: []
           };
           this.fakePreparedItems = [];

           spyOn(ResultsMapView.prototype, 'prepareItems').and.returnValue(this.fakePreparedItems);

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

         it('should return object with prepared items', function() {
           var markersData = this.view.prepareMarkersData(this.data);

           expect(this.view.prepareItems).toHaveBeenCalledWith(this.data.items);
           expect(markersData.items).toBe(this.fakePreparedItems);
         });
       });

       describe('.prepareItems()', function() {
         beforeEach(function() {
           this.items = [{
             type: 'cluster'
           }, {
             type: 'marker'
           }];
           this.fakePreparedClusterItem = {};
           this.fakePreparedMarkerItem = {};

           spyOn(ResultsMapView.prototype, 'prepareClusterItem').and.returnValue(this.fakePreparedClusterItem);
           spyOn(ResultsMapView.prototype, 'prepareMarkerItem').and.returnValue(this.fakePreparedMarkerItem);

           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareItems).toEqual(jasmine.any(Function));
         });

         it('should return prepared items', function() {
           var preparedItems = this.view.prepareItems(this.items);

           expect(preparedItems[0]).toBe(this.fakePreparedClusterItem);
           expect(preparedItems[1]).toBe(this.fakePreparedMarkerItem);
         });

         it('should handle empty items', function() {
           var preparedItems = this.view.prepareItems([]);

           expect(preparedItems).toEqual(jasmine.any(Array));
           expect(preparedItems.length).toBe(0);
         });
       });


       describe('.prepareClusterItem()', function() {
         beforeEach(function() {
           this.item = {
             type: 'cluster',
             lat: 52,
             lng: 22,
             itemsCount: 6
           };
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareClusterItem).toEqual(jasmine.any(Function));
         });

         it('should create proper cluster item', function() {
           var preparedItem = this.view.prepareClusterItem(this.item);

           expect(preparedItem).toEqual({
             type: 'cluster',
             lat: 52,
             lng: 22,
             itemsCount: 6
           });
         });
       });

       describe('.prepareMarkerItem()', function() {
         beforeEach(function() {

           spyOn(ResultsMapView.prototype, 'prepareMarkerBadges').and.returnValue('fake badges');
           spyOn(ResultsMapView.prototype, 'prepareMarkerCountries').and.returnValue('fake countries');
           spyOn(PopupComponent.prototype, 'initialize').and.callThrough();
           spyOn(PopupComponent.prototype, 'render').and.returnValue({
             view: {
               el: 'fake rendered popup'
             }
           });

           this.item = {
             type: 'marker',
             group: 'pl',
             lat: 54,
             lng: 24,
             notAccurate: true,
             id: 6,
             title: 'Project Title',
             goodPractice: true,
             successStory: true,
             programme: 'Project Programme',
             actionType: 'Project Action Type',
             coordinator: 'Project Coordinator',
             countries: ['pl', 'de', 'be']
           };
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareMarkerItem).toEqual(jasmine.any(Function));
         });

         it('should build marker badges text', function() {
           this.view.prepareMarkerItem(this.item);
           expect(this.view.prepareMarkerBadges).toHaveBeenCalledWith(this.item);
         });

         it('should build marker countries text', function() {
           this.view.prepareMarkerItem(this.item);
           expect(this.view.prepareMarkerCountries).toHaveBeenCalledWith(this.item);
         });

         it('should properly inintialize popup component', function() {
           var item = this.view.prepareMarkerItem(this.item);
           expect(PopupComponent.prototype.initialize).toHaveBeenCalledWith({
             type: 'eplus-project',
             data: {
               id: 6,
               title: 'Project Title',
               badges: 'fake badges',
               countries: 'fake countries',
               programme: 'Project Programme',
               actionType: 'Project Action Type',
               coordinator: 'Project Coordinator',
               notAccurate: true
             }
           });
         });

         it('should create proper marker item', function() {
           var preparedItem = this.view.prepareMarkerItem(this.item);

           expect(preparedItem).toEqual({
             type: 'marker',
             group: 'pl',
             id: 6,
             lat: 54,
             lng: 24,
             popupContent: 'fake rendered popup'
           });
         });
       });

       describe('.prepareMarkerBadges()', function() {
         beforeEach(function() {
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareMarkerBadges).toEqual(jasmine.any(Function));
         });

         it('should have good practice', function() {
           var item = {
             goodPractice: true
           };

           expect(this.view.prepareMarkerBadges(item)).toEqual('Good Practice');
         });

         it('should have success story', function() {
           var item = {
             successStory: true
           };

           expect(this.view.prepareMarkerBadges(item)).toEqual('Success Story');
         });

         it('should have good practice and success story', function() {
           var item = {
             goodPractice: true,
             successStory: true
           };

           expect(this.view.prepareMarkerBadges(item)).toEqual('Good Practice & Success Story');
         });

         it('should not have any badge', function() {
           var item = {
             goodPractice: false,
             successStory: false
           };

           expect(this.view.prepareMarkerBadges(item)).toEqual('');
         });
       });

       describe('.prepareMarkerCountries()', function() {
         beforeEach(function() {
           this.view = new ResultsMapView();
         });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.prepareMarkerCountries).toEqual(jasmine.any(Function));
         });

         it('should have comma separated countries if less than five', function() {
           var item = {
             countries: ['pl', 'de', 'be', 'es']
           };

           expect(this.view.prepareMarkerCountries(item)).toEqual('pl, de, be, es');
         });

         it('should have comma separated countries with dots if more than five', function() {
           var item = {
             countries: ['pl', 'de', 'be', 'es', 'fr', 'ro', 'cz']
           };

           expect(this.view.prepareMarkerCountries(item)).toEqual('pl, de, be, es, fr, ...');
         });

         it('should not have any countries', function() {
           var item = {
             countries: []
           };

           expect(this.view.prepareMarkerCountries(item)).toEqual('');
         });
       });

      describe('.invalidateSize()', function() {
        beforeEach(function() {
          spyOn(MapComponent.prototype, 'invalidateSize');

          this.view = new ResultsMapView();
        });

        it('should be defined', function() {
          expect(ResultsMapView.prototype.invalidateSize).toEqual(jasmine.any(Function));
        });

        it('should delegate to map component', function() {
          this.view.invalidateSize();
          expect(this.view.mapComponent.invalidateSize).toHaveBeenCalled();
        });
      });
     });

     describe('events', function() {
       it('should listen to map boundary change events', function() {
         spyOn(ResultsMapView.prototype, 'onMapBoundsChanged');

         var view = new ResultsMapView(),
           fakeBoundsChangedEvent = {};

         view.mapComponent.trigger('map:bounds-changed', fakeBoundsChangedEvent);

         expect(view.onMapBoundsChanged).toHaveBeenCalledWith(fakeBoundsChangedEvent);
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

         it('should render map component', function() {
           this.view.render();
           expect(this.view.$el).toContainHtml(this.view.mapComponent.render().view.$el.html());
         });
       });
     });
   });
 });