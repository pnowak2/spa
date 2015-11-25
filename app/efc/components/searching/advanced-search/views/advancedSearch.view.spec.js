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
          placeholder: 'All'
        });
      });

      it('should have activities properly defined', function() {
        expect(this.view.activities).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.activities.initialize).toHaveBeenCalledWith(this.fakeData.activities, {
          placeholder: 'All'
        });
      });

      it('should have subactivities properly defined', function() {
        expect(this.view.subactivities).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.subactivities.initialize).toHaveBeenCalledWith(this.fakeData.subactivities, {
          placeholder: 'All'
        });
      });

      it('should have organisationTypes properly defined', function() {
        expect(this.view.organisationTypes).toEqual(jasmine.any(MultiselectComponent));
        expect(this.view.organisationTypes.initialize).toHaveBeenCalledWith(this.fakeData.organisationTypes, {
          placeholder: 'All'
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
      describe('.getCriteria()', function() {
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
          expect(AdvancedSearchView.prototype.getCriteria).toEqual(jasmine.any(Function));
        });

        it('should return array with country keys', function() {
          expect(this.view.getCriteria().countries).toEqual(['pl', 'be']);
        });

        it('should return array with activities keys', function() {
          expect(this.view.getCriteria().activities).toEqual(['act2', 'act3']);
        });

        it('should return array with subactivities keys', function() {
          expect(this.view.getCriteria().subactivities).toEqual(['sub1', 'sub2']);
        });

        it('should return array with organisation types keys', function() {
          expect(this.view.getCriteria().organisationTypes).toEqual(['org2']);
        });
      });

      describe('.didClickClearFilters()', function() {
        beforeEach(function() {
          this.view = new AdvancedSearchView;
          spyOn(this.view.countries, 'unselectAll');
          spyOn(this.view.activities, 'unselectAll');
          spyOn(this.view.subactivities, 'unselectAll');
          spyOn(this.view.organisationTypes, 'unselectAll');

          this.fakeEvent = jasmine.createSpyObj('evt', ['preventDefault']);
          this.view.didClickClearFilters(this.fakeEvent);
        });

        it('should be defined', function() {
          expect(AdvancedSearchView.prototype.didClickClearFilters).toEqual(jasmine.any(Function));
        });

        it('should prevent default action', function() {
          expect(this.fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('should clear countries component', function() {
          expect(this.view.countries.unselectAll).toHaveBeenCalled();
        });

        it('should clear activities component', function() {
          expect(this.view.activities.unselectAll).toHaveBeenCalled();
        });

        it('should clear subactivities component', function() {
          expect(this.view.subactivities.unselectAll).toHaveBeenCalled();
        });

        it('should clear organisation types component', function() {
          expect(this.view.organisationTypes.unselectAll).toHaveBeenCalled();
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should have be properly defined', function() {
          expect(AdvancedSearchView.prototype.events).toEqual({
            'click a.efc-search-clear': 'didClickClearFilters'
          });
        });
      });
    });

    describe('rendering', function() {
      beforeEach(function() {
        this.view = new AdvancedSearchView({
          countries: [{
            id: 'pl'
          }],
          activities: [{
            id: 'act'
          }],
          subactivities: [{
            id: 'sub'
          }],
          organisationTypes: [{
            id: 'org'
          }]
        });
        this.$el = this.view.render().$el;
      });

      describe('.render()', function() {
        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render header', function() {
          expect(this.$el).toContainElement('header');
        });

        it('should render header text', function() {
          expect(this.$el.find('header > h3')).toContainText('Advanced Search');
        });

        it('should render clear filters link', function() {
          expect(this.$el.find('header')).toContainElement('a[href="#"].efc-search-clear');
          expect(this.$el.find('header > a.efc-search-clear')).toContainText('Clear filters');
        });

        it('should render four sections', function() {
          expect(this.$el.find('section')).toHaveLength(4);
        });

        it('should render country section', function() {
          expect(this.$el).toContainElement('section#efc-country.efc-search-section');
          expect(this.$el.find('#efc-country > label')).toContainText('Country');
        });

        it('should render countries', function() {
          var $subview = this.view.countries.render().view.$el;
          expect(this.$el.find('#efc-country')).toContainHtml($subview);
        });

        it('should render activity section', function() {
          expect(this.$el).toContainElement('section#efc-activity.efc-search-section');
          expect(this.$el.find('#efc-activity > label')).toContainText('Activity');
        });

        it('should render activities', function() {
          var $subview = this.view.activities.render().view.$el;
          expect(this.$el.find('#efc-activity')).toContainHtml($subview);
        });

        it('should render subactivity section', function() {
          expect(this.$el).toContainElement('section#efc-subactivity.efc-search-section');
          expect(this.$el.find('#efc-subactivity > label')).toContainText('Sub-Activity');
        });

        it('should render subactivities', function() {
          var $subview = this.view.subactivities.render().view.$el;
          expect(this.$el.find('#efc-subactivity')).toContainHtml($subview);
        });

        it('should render organisation type section', function() {
          expect(this.$el).toContainElement('section#efc-organisation-type.efc-search-section');
          expect(this.$el.find('#efc-organisation-type > label')).toContainText('Type of Organisation');
        });

        it('should render organisation types', function() {
          var $subview = this.view.organisationTypes.render().view.$el;
          expect(this.$el.find('#efc-organisation-type')).toContainHtml($subview);
        });
      });
    });
  });
});