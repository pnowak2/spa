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
           expect(ResultsMapView.prototype.className).toEqual('ce-results-map');
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
          var fakePopupComponent = new PopupComponent({
            type: 'ce-project'
          });

          this.fakePopupComponentEl = {};
          spyOn(fakePopupComponent, 'render').and.returnValue({
            view: {
              el: this.fakePopupComponentEl
            }
          });

          spyOn(ResultsMapView.prototype, 'createPopupComponent').and.returnValue(fakePopupComponent);

          this.countryItem1 = {
           id: '123',
           lat: 2,
           lng: 4,
           title: 'Project title 1',
           description: 'Project description 1',
           action: 'Project action 1',
           coordinator: 'Project coordinator 1'
         };

         this.view = new ResultsMapView();
         this.markersByCountry = this.view.prepareMarkersByCountryData([this.countryItem1]);
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

         it('should map array of markers by country', function() {
           expect(this.markersByCountry.length).toBe(1);
         });

         it('should map country item id', function() {
           expect(this.markersByCountry[0].id).toEqual('123');
         });

         it('should map country item lat', function() {
           expect(this.markersByCountry[0].lat).toEqual(2);
         });

         it('should map country item lng', function() {
           expect(this.markersByCountry[0].lng).toEqual(4);
         });

         it('should map country item popup content', function() {
           expect(this.markersByCountry[0].popupContent).toEqual(this.fakePopupComponentEl);
         });

         it('should create popup content component passing country item', function() {
           expect(this.view.createPopupComponent).toHaveBeenCalledWith(this.countryItem1);
         });
       });

       describe('.createPopupComponent()', function() {
        beforeEach(function() {
          spyOn(PopupComponent.prototype, 'initialize');

          this.view = new ResultsMapView();
          this.popupComponent = this.view.createPopupComponent({
            id: 124,
            title: 'Popup Title',
            badges: 'Success Story',
            programme: 'Creative Europe',
            action: 'Programme Action',
            coordinator: 'Programme Coordinator',
            startDate: '2012',
            endDate: '2016'
          });
        });

         it('should be defined', function() {
           expect(ResultsMapView.prototype.createPopupComponent).toEqual(jasmine.any(Function));
         });

         it('should return popup component', function() {
           expect(this.popupComponent).toEqual(jasmine.any(PopupComponent));
         });

         it('should initialize popup component with proper type', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            type: 'ce-project'
           }));
         });

         it('should initialize popup component with data id', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              id: 124
            })
           }));
         });

         it('should initialize popup component with data title', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              title: 'Popup Title'
            })
           }));
         });

         it('should initialize popup component with data badges', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              badges: 'Success Story'
            })
           }));
         });

         it('should initialize popup component with data programme', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              programme: 'Creative Europe'
            })
           }));
         });

         it('should initialize popup component with data action', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              action: 'Programme Action'
            })
           }));
         });

         it('should initialize popup component with data coordinator', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              coordinator: 'Programme Coordinator'
            })
           }));
         });

         it('should initialize popup component with data start date', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              startDate: '2012'
            })
           }));
         });

         it('should initialize popup component with data end date', function() {
           expect(this.popupComponent.initialize).toHaveBeenCalledWith(jasmine.objectContaining({
            data: jasmine.objectContaining({
              endDate: '2016'
            })
           }));
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
             if (selector === '.ce-results-map__map-container') {
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
             if (selector === '.vlr-map__country-search-explanation') {
               return 'fakeCountryExplanationContainer';
             }
           });

           var view = new ResultsMapView();
           expect(view.getCountryExplanationContainer()).toBe('fakeCountryExplanationContainer');
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
       expect(this.view.$el).toContainElement('.vlr-map__country-search-explanation');
     });

     it('should render map container', function() {
       this.view.render();
       expect(this.view.$el).toContainElement('.ce-results-map__map-container');
     });

     it('should render results map component', function() {
       this.view.render();
       expect(this.view.$el.find('.ce-results-map__map-container')).toContainHtml(this.view.mapComponent.render().view.$el.html());
     });
   });
 });
});
});