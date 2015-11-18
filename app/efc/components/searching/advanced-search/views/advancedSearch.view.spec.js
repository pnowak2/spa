define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    AdvancedSearchView = require('./advancedSearch.view'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component');

  describe('Advanced Search View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(AdvancedSearchView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      beforeEach(function() {
        spyOn(MultiselectComponent.prototype, 'initialize');

        this.fakeData = {
          countries: 'countries',
          activities: 'activities',
          subactivities: 'subactivities',
          organisationTypes: 'organisationTypes',
        };

        this.view = new AdvancedSearchView(this.fakeData);
      });

      it('should not throw if created without arguments', function() {
        expect(function() {
          new AdvancedSearchView;
        }).not.toThrow();
      });

      it('should have countries properly defined', function() {
        expect(this.view.countries).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.countries.initialize).toHaveBeenCalledWith(this.fakeData.countries, {
          placeholder: 'All Countries'
        });
      });

      it('should have activities properly defined', function() {
        expect(this.view.activities).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.activities.initialize).toHaveBeenCalledWith(this.fakeData.activities, {
          placeholder: 'All Activities'
        });
      });

      it('should have subactivities properly defined', function() {
        expect(this.view.subactivities).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.subactivities.initialize).toHaveBeenCalledWith(this.fakeData.subactivities, {
          placeholder: 'All Subactivities'
        });
      });

      it('should have organisationTypes properly defined', function() {
        expect(this.view.organisationTypes).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.organisationTypes.initialize).toHaveBeenCalledWith(this.fakeData.organisationTypes, {
          placeholder: 'All Organisation Types'
        });
      });
    });

    describe('properties', function() {
      it('.tagName should be div', function() {
        expect(AdvancedSearchView.prototype.tagName).toEqual('div');
      });

      it('.className should be defined', function() {
        expect(AdvancedSearchView.prototype.className).toEqual('efc-advanced-search');
      });
    });

    describe('api', function() {
      describe('.getState()', function() {
        beforeEach(function() {
          this.fakeData = {
            countries: [{
              id: 'pl',
              selected: true
            }, {
              id: 'de',
              selected: false
            }, {
              id: 'be',
              selected: true
            }],
            activities: [{
              id: 'act1',
              selected: false
            }, {
              id: 'act2',
              selected: true
            }, {
              id: 'act3',
              selected: true
            }],
            subactivities: [{
              id: 'sub1',
              selected: true
            }, {
              id: 'sub2',
              selected: true
            }, {
              id: 'sub3',
              selected: false
            }],
            organisationTypes: [{
              id: 'org1',
              selected: false
            }, {
              id: 'org2',
              selected: true
            }, {
              id: 'org3',
              selected: false
            }]
          },
          this.view = new AdvancedSearchView(this.fakeData);
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.getState).toEqual(jasmine.any(Function));
        });

        it('should return array with country keys', function() {
          expect(this.view.getState().countries).toEqual(['pl', 'be']);
        });

        it('should return array with activities keys', function() {
          expect(this.view.getState().activities).toEqual(['act2', 'act3']);
        });

        it('should return array with subactivities keys', function() {
          expect(this.view.getState().subactivities).toEqual(['sub1', 'sub2']);
        });

        it('should return array with organisation types keys', function() {
          expect(this.view.getState().organisationTypes).toEqual(['org2']);
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view itself', function() {
          var view = new AdvancedSearchView;
          expect(view.render()).toBe(view);
        });
      });
    });
  });
});