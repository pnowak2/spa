define(function(require) {
  var Backbone = require('backbone'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component'),
    advancedSearchService = require('../services/advanced-search/advancedSearch.service'),
    constants = require('app/ce/util/constants'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/advancedSearch.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-advanced-search',

    events: {
      'click a.vlr-advanced-search__clear': 'didClickClearFilters'
    },

    initialize: function() {
      this.options = new MultiselectComponent(advancedSearchService.allOptions(), {
        placeholder: 'All Options',
        multiple: true
      });
      this.programmes = new MultiselectComponent(advancedSearchService.allProgrammes(), {
        placeholder: 'All Programmes',
        multiple: false,
        allowClear: true
      });
      this.subprogrammes = new MultiselectComponent([], {
        placeholder: 'All Subprogrammes / All Funding Schemes',
        multiple: false,
        allowClear: true
      });
      this.actions = new MultiselectComponent([], {
        placeholder: 'All Actions',
        multiple: false,
        allowClear: true
      });
      this.activities = new MultiselectComponent([], {
        placeholder: 'All Activities',
        multiple: true
      });
      this.activityYears = new MultiselectComponent(advancedSearchService.allActivityYears(), {
        placeholder: 'All Activity Years',
        multiple: true
      });
      this.fundingYears = new MultiselectComponent(advancedSearchService.allFundingYears(), {
        placeholder: 'All Funding Years',
        multiple: true
      });
      this.countries = new MultiselectComponent(advancedSearchService.allCountries(), {
        placeholder: 'All Countries',
        multiple: true
      });
      this.regions = new MultiselectComponent([], {
        placeholder: 'All Regions',
        multiple: true
      });
      this.organisationTypes = new MultiselectComponent(advancedSearchService.allOrganisationTypes(), {
        placeholder: 'All Organisation Types',
        multiple: true
      });

      this.listenTo(this.programmes, 'multiselect:change', this.didProgrammeChange);
      this.listenTo(this.subprogrammes, 'multiselect:change', this.didSubprogrammeChange);
      this.listenTo(this.countries, 'multiselect:change', this.didCountryChange);
    },

    initCriteriaStatus: function() {
      this.toggleMatchAllCountriesSelection(false);
      this.toggleMatchAllCountriesVisibility(false);
      this.subprogrammes.hide();
      this.actions.hide();
      this.activities.hide();
      this.fundingYears.hide();
      this.regions.hide();
    },

    getCriteria: function() {

    },

    isDirty: function() {
      return this.options.isDirty() ||
        this.programmes.isDirty() ||
        this.subprogrammes.isDirty() ||
        this.actions.isDirty() ||
        this.activities.isDirty() ||
        this.activityYears.isDirty() ||
        this.fundingYears.isDirty() ||
        this.countries.isDirty() ||
        this.regions.isDirty() ||
        this.organisationTypes.isDirty() ||
        this.isMatchAllCountriesSelected()
    },

    isCeProgrammeSelected: function() {
      if (this.programmes.hasOneSelection()) {
        return this.programmes.firstSelectedItem().id === constants.ccm.CE
      } else {
        return false;
      }
    },

    didClickClearFilters: function(e) {
      e.preventDefault();

      this.initCriteriaStatus();

      this.options.update(advancedSearchService.allOptions());
      this.programmes.update(advancedSearchService.allProgrammes());
      this.subprogrammes.update([]);
      this.actions.update([]);
      this.activities.update([]);
      this.activityYears.update(advancedSearchService.allActivityYears());
      this.fundingYears.update(advancedSearchService.allFundingYears());
      this.countries.update(advancedSearchService.allCountries());
      this.regions.update([]);
      this.organisationTypes.update(advancedSearchService.allOrganisationTypes());
    },

    didProgrammeChange: function() {
      var selectedProgramme;

      if (this.programmes.hasOneSelection()) {
        selectedProgramme = this.programmes.firstSelectedItem()

        this.subprogrammes.update(
          advancedSearchService.subprogrammesByProgramme(selectedProgramme.id)
        );
        this.activities.update(
          advancedSearchService.activitiesByProgramme(selectedProgramme.id)
        );

        if (this.isCeProgrammeSelected()) {
          this.fundingYears.show();
          if (this.countries.hasOneSelection()) {
            this.regions.show();
          }
        } else {
          this.actions.hide();
          this.fundingYears.hide();
          this.regions.hide();
        }

        this.subprogrammes.show();
        this.activities.show();
      } else {
        this.subprogrammes.hide();
        this.subprogrammes.clear();
        this.activities.hide();
        this.activities.clear();
        this.actions.hide();
        this.actions.clear();
        this.fundingYears.hide();
        this.regions.hide();
      }
    },

    didSubprogrammeChange: function() {
      var selectedSubprogramme;

      if (this.subprogrammes.hasOneSelection()) {
        if (this.isCeProgrammeSelected()) {
          selectedSubprogramme = this.subprogrammes.firstSelectedItem()
          this.actions.update(
            advancedSearchService.actionsBySubprogramme(selectedSubprogramme.id)
          );
          this.actions.show();
        }
      } else {
        this.actions.hide();
        this.actions.clear();
      }
    },

    didCountryChange: function() {
      var selectedItem;

      if (this.countries.selectedItems().length > 1) {
        this.toggleMatchAllCountriesVisibility(true);
      } else {
        this.toggleMatchAllCountriesVisibility(false);
      }

      if (this.countries.hasOneSelection()) {
        selectedItem = this.countries.firstSelectedItem();

        this.regions.update(
          advancedSearchService.regionsByCountry(selectedItem.id)
        );

        if (this.isCeProgrammeSelected()) {
          this.regions.show();
        }
      } else {
        this.regions.hide();
        this.regions.clear();
      }
    },

    update: function(criteria) {
      this.options.selectItems(criteria.options);
      this.programmes.selectItem(criteria.programme);
      this.subprogrammes.selectItem(criteria.subprogramme);
      this.actions.selectItem(criteria.action);
      this.activities.selectItems(criteria.activities);
      this.activityYears.selectItems(criteria.activityYears);
      this.fundingYears.selectItems(criteria.fundingYears);
      this.countries.selectItems(criteria.countries);
      this.regions.selectItems(criteria.regions);
      this.organisationTypes.selectItems(criteria.organisationTypes);
      this.toggleMatchAllCountriesSelection(criteria.matchAllCountries);
    },

    isMatchAllCountriesSelected: function() {
      return this.getMatchAllCountriesElement().is(':checked');
    },

    getMatchAllCountriesContainerElement: function() {
      return this.$el.find('.vlr-advanced-search__match-all-countries-container');
    },

    getMatchAllCountriesElement: function() {
      return this.$el.find('.vlr-advanced-search__match-all-countries-input');
    },

    toggleMatchAllCountriesSelection: function(isChecked) {
      this.getMatchAllCountriesElement().prop('checked', isChecked);
    },

    toggleMatchAllCountriesVisibility: function(isVisible) {
      this.getMatchAllCountriesContainerElement().toggle(isVisible);
    },

    render: function() {
      var html = Mustache.render(tpl);

      this.$el.html(html);

      this.$el.find('.vlr-advanced-search__section-options').append(this.options.render().view.el);
      this.$el.find('.vlr-advanced-search__section-programmes').append(this.programmes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-subprogrammes').append(this.subprogrammes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-actions').append(this.actions.render().view.el);
      this.$el.find('.vlr-advanced-search__section-activities').append(this.activities.render().view.el);
      this.$el.find('.vlr-advanced-search__section-activity-years').append(this.activityYears.render().view.el);
      this.$el.find('.vlr-advanced-search__section-funding-years').append(this.fundingYears.render().view.el);
      this.$el.find('.vlr-advanced-search__section-countries').append(this.countries.render().view.el);
      this.$el.find('.vlr-advanced-search__section-regions').append(this.regions.render().view.el);
      this.$el.find('.vlr-advanced-search__section-organisation-types').append(this.organisationTypes.render().view.el);

      this.initCriteriaStatus();

      return this;
    }
  });
});