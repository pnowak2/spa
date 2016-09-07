define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    MultiselectComponent = require('app/shared/components/other/multiselect/main.component'),
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
        multiple: true,
        maximumSelectionLength: 1
      });
      this.subprogrammes = new MultiselectComponent([], {
        placeholder: 'All Subprogrammes / All Funding Schemes',
        multiple: true,
        maximumSelectionLength: 1
      });
      this.actions = new MultiselectComponent([], {
        placeholder: 'All Actions',
        multiple: true,
        maximumSelectionLength: 1
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

    initCriteriaVisibility: function() {
      this.toggleMatchAllCountriesSelection(false);
      this.toggleMatchAllCountriesVisibility(false);
      this.subprogrammes.hide();
      this.actions.hide();
      this.activities.hide();
      this.fundingYears.hide();
      this.regions.hide();
    },

    getCriteria: function() {
      var options = _.pluck(this.options.selectedItems(), 'id'),
        programmes = _.pluck(this.programmes.selectedItems(), 'id'),
        subprogrammes = _.pluck(this.subprogrammes.selectedItems(), 'id'),
        actions = _.pluck(this.actions.selectedItems(), 'id'),
        activities = _.pluck(this.activities.selectedItems(), 'id'),
        activityYears = _.pluck(this.activityYears.selectedItems(), 'id'),
        fundingYears = _.pluck(this.fundingYears.selectedItems(), 'id'),
        countries = _.pluck(this.countries.selectedItems(), 'id'),
        regions = _.pluck(this.regions.selectedItems(), 'id'),
        organisationTypes = _.pluck(this.organisationTypes.selectedItems(), 'id'),
        matchAllCountries = this.isMatchAllCountriesSelected()

      return {
        options: this.options.isVisible() ? options : [],
        programmes: this.programmes.isVisible() ? programmes : [],
        subprogrammes: this.subprogrammes.isVisible() ? subprogrammes : [],
        actions: this.actions.isVisible() ? actions : [],
        activities: this.activities.isVisible() ? activities : [],
        activityYears: this.activityYears.isVisible() ? activityYears : [],
        fundingYears: this.fundingYears.isVisible() ? fundingYears : [],
        countries: this.countries.isVisible() ? countries : [],
        regions: this.regions.isVisible() ? regions : [],
        organisationTypes: this.organisationTypes.isVisible() ? organisationTypes : [],
        matchAllCountries: this.isMatchAllCountriesVisible() ? matchAllCountries : false
      };
    },

    isDirty: function() {
      return this.options.isVisible() && this.options.isDirty() ||
        this.programmes.isVisible() && this.programmes.isDirty() ||
        this.subprogrammes.isVisible() && this.subprogrammes.isDirty() ||
        this.actions.isVisible() && this.actions.isDirty() ||
        this.activities.isVisible() && this.activities.isDirty() ||
        this.activityYears.isVisible() && this.activityYears.isDirty() ||
        this.fundingYears.isVisible() && this.fundingYears.isDirty() ||
        this.countries.isVisible() && this.countries.isDirty() ||
        this.regions.isVisible() && this.regions.isDirty() ||
        this.organisationTypes.isVisible() && this.organisationTypes.isDirty() ||
        this.isMatchAllCountriesVisible() && this.isMatchAllCountriesSelected();
    },

    didClickClearFilters: function(e) {
      e.preventDefault();

      this.initCriteriaVisibility();

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
        selectedProgramme = this.programmes.firstSelectedItem();

        this.subprogrammes.update(
          advancedSearchService.subprogrammesByProgramme(selectedProgramme.id)
        );
        this.activities.update(
          advancedSearchService.activitiesByProgramme(selectedProgramme.id)
        );
      }

      this.calculateCriteriaVisibility();
    },

    didSubprogrammeChange: function() {
      var selectedSubprogramme;

      if (this.subprogrammes.hasOneSelection()) {
        selectedSubprogramme = this.subprogrammes.firstSelectedItem();

        this.actions.update(
          advancedSearchService.actionsBySubprogramme(selectedSubprogramme.id)
        );
      }

      this.calculateCriteriaVisibility();
    },

    didCountryChange: function() {
      var selectedCountry;

      if (this.countries.hasOneSelection()) {
        selectedCountry = this.countries.firstSelectedItem();

        this.regions.update(
          advancedSearchService.regionsByCountry(selectedCountry.id)
        );
      }

      this.calculateCriteriaVisibility();
    },

    calculateCriteriaVisibility: function() {
      this.subprogrammes.toggle(this.shouldDisplaySubprogrammes());
      this.actions.toggle(this.shouldDisplayActions());
      this.activities.toggle(this.shouldDisplayActivities());
      this.fundingYears.toggle(this.shouldDisplayFundingYears());
      this.regions.toggle(this.shouldDisplayRegions());
      this.toggleMatchAllCountriesVisibility(this.shouldDisplayMatchAllCountries());
    },

    shouldDisplaySubprogrammes: function() {
      return this.programmes.hasOneSelection();
    },

    shouldDisplayActions: function() {
      return this.isCeProgrammeSelected() && this.subprogrammes.hasOneSelection();
    },

    shouldDisplayActivities: function() {
      return this.programmes.hasOneSelection();
    },

    shouldDisplayFundingYears: function() {
      return this.isCeProgrammeSelected();
    },

    shouldDisplayRegions: function() {
      return this.isCeProgrammeSelected() && this.countries.hasOneSelection();
    },

    shouldDisplayMatchAllCountries: function() {
      return this.countries.selectedItems().length > 1;
    },

    update: function(criteria) {
      this.options.selectItems(criteria.options);
      this.programmes.selectItems(criteria.programmes);
      this.subprogrammes.selectItems(criteria.subprogrammes);
      this.actions.selectItems(criteria.actions);
      this.activities.selectItems(criteria.activities);
      this.activityYears.selectItems(criteria.activityYears);
      this.fundingYears.selectItems(criteria.fundingYears);
      this.countries.selectItems(criteria.countries);
      this.regions.selectItems(criteria.regions);
      this.organisationTypes.selectItems(criteria.organisationTypes);
      this.toggleMatchAllCountriesSelection(criteria.matchAllCountries);
    },

    isCeProgrammeSelected: function() {
      if (this.programmes.hasOneSelection()) {
        return this.programmes.firstSelectedItem().id === constants.ccm.CE;
      } else {
        return false;
      }
    },

    isMatchAllCountriesVisible: function() {
      return this.getMatchAllCountriesContainerElement().css('display') !== 'none';
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

      this.initCriteriaVisibility();

      return this;
    }
  });
});