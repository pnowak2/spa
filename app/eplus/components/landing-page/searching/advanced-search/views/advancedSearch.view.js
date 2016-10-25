define(function (require) {
  var _ = require('underscore'),
    Backbone = require('backbone'),
    tpl = require('text!../templates/advancedSearch.tpl.html'),
    MultiselectComponent = require('app/shared/components/other/multiselect/main.component'),
    advancedSearchService = require('../services/advancedSearch.service'),
    constants = require('app/eplus/util/constants'),
    Mustache = require('mustache');

  return Backbone.View.extend({
    className: 'vlr-advanced-search',

    events: {
      'click a.vlr-advanced-search__clear': 'didClickClearFilters'
    },

    initialize: function () {
      this.options = this.createOptionMultiselect();
      this.programmes = this.createProgrammesMultiselect();
      this.actions = this.createActionsMultiselect();
      this.actionsTypes = this.createActionsTypesMultiselect();
      this.activityYears = this.createActivityYearsMultiselect();
      this.fundingYears = this.createFundingYearsMultiselect();
      this.countries = this.createCountryMultiselect();
      this.regions = this.createRegionsMultiselect();
      this.organisationTypes = this.createOrganisationTypesMultiselect();
      this.organisationRoles = this.createOrganisationRolesMultiselect();

      this.listenTo(this.countries, 'multiselect:change', this.didCountriesChange);
      this.listenTo(this.programmes, 'multiselect:change', this.didProgrammesChange);
      this.listenTo(this.actions, 'multiselect:change', this.didActionsChange);
    },

    getCriteria: function () {
      var options = _.pluck(this.options.selectedItems(), 'id'),
        programmes = _.pluck(this.programmes.selectedItems(), 'id'),
        actions = _.pluck(this.actions.selectedItems(), 'id'),
        actionsTypes = _.pluck(this.actionsTypes.selectedItems(), 'id'),
        activityYears = _.pluck(this.activityYears.selectedItems(), 'id'),
        fundingYears = _.pluck(this.fundingYears.selectedItems(), 'id'),
        countries = _.pluck(this.countries.selectedItems(), 'id'),
        regions = _.pluck(this.regions.selectedItems(), 'id'),
        organisationTypes = _.pluck(this.organisationTypes.selectedItems(), 'id'),
        organisationRoles = _.pluck(this.organisationRoles.selectedItems(), 'id'),
        matchAllCountries = this.isMatchAllCountriesSelected();

      return {
        options: this.options.isVisible() ? options : [],
        programmes: this.programmes.isVisible() ? programmes : [],
        actions: this.actions.isVisible() ? actions : [],
        actionsTypes: this.actionsTypes.isVisible() ? actionsTypes : [],
        activityYears: this.activityYears.isVisible() ? activityYears : [],
        fundingYears: this.fundingYears.isVisible() ? fundingYears : [],
        countries: this.countries.isVisible() ? countries : [],
        regions: this.regions.isVisible() ? regions : [],
        organisationTypes: this.organisationTypes.isVisible() ? organisationTypes : [],
        organisationRoles: this.organisationRoles.isVisible() ? organisationRoles : [],
        matchAllCountries: this.isMatchAllCountriesVisible() ? matchAllCountries : false
      };
    },

    createOptionMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allOptions(), {
        placeholder: 'All Options',
        multiple: true
      });
    },

    createProgrammesMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allProgrammes(), {
        placeholder: 'All Programmes',
        multiple: true
      });
    },

    createActionsMultiselect: function () {
      return new MultiselectComponent([], {
        placeholder: 'All Actions',
        multiple: true,
        maximumSelectionLength: 1
      });
    },

    createActionsTypesMultiselect: function () {
      return new MultiselectComponent([], {
        placeholder: 'All Actions Types',
        multiple: true,
        maximumSelectionLength: 1
      });
    },

    createActivityYearsMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allActivityYears(), {
        placeholder: 'All Activity Years',
        multiple: true
      });
    },

    createFundingYearsMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allFundingYears(), {
        placeholder: 'All Funding Years',
        multiple: true
      });
    },

    createCountryMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allCountries(), {
        placeholder: 'All Countries',
        multiple: true
      });
    },

    createRegionsMultiselect: function () {
      return new MultiselectComponent([], {
        placeholder: 'All Regions',
        multiple: true
      });
    },

    createOrganisationTypesMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allOrganisationTypes(), {
        placeholder: 'All Organisation Types',
        multiple: true
      });
    },

    createOrganisationRolesMultiselect: function () {
      return new MultiselectComponent(advancedSearchService.allOrganisationRoles(), {
        placeholder: 'All Organisation Roles',
        multiple: true
      });
    },

    didClickClearFilters: function (e) {
      e.preventDefault();

      this.initCriteriaVisibility();

      this.options.update(advancedSearchService.allOptions());
      this.programmes.update(advancedSearchService.allProgrammes());
      this.actions.update([]);
      this.actionsTypes.update([]);
      this.activityYears.update(advancedSearchService.allActivityYears());
      this.fundingYears.update(advancedSearchService.allFundingYears());
      this.countries.update(advancedSearchService.allCountries());
      this.regions.update([]);
      this.organisationTypes.update(advancedSearchService.allOrganisationTypes());
      this.organisationRoles.update(advancedSearchService.allOrganisationRoles());
    },

    didCountriesChange: function () {
      var selectedCountry;

      if (this.countries.hasOneSelection()) {
        selectedCountry = this.countries.firstSelectedItem();

        this.regions.update(advancedSearchService.getRegionsByCountry(selectedCountry.id));
      } else {
        this.regions.clear();
      }

      this.calculateCriteriaVisibility();
    },

    didProgrammesChange: function () {
      var selectedProgrammes;
      if (this.programmes.hasOneSelection()) {
        selectedProgrammes = this.programmes.firstSelectedItem();

        this.actions.update(advancedSearchService.getActionsByProgramme(selectedProgrammes.id));
      } else {
        this.actions.clear();
        this.actionsTypes.clear();
      }

      this.calculateCriteriaVisibility();
    },

    didActionsChange: function () {
      var selectedAction;
      if (this.actions.hasOneSelection()) {
        selectedAction = this.actions.firstSelectedItem();

        this.actionsTypes.update(advancedSearchService.getActionsTypeByAction(selectedAction.id));
      } else {
        this.actionsTypes.clear();
      }

      this.calculateCriteriaVisibility();
    },

    initCriteriaVisibility: function () {
      this.actions.hide();
      this.actionsTypes.hide();
      this.organisationTypes.hide();
      this.regions.hide();
      this.getMatchAllCountriesContainerElement().hide();
    },

    isMatchAllCountriesVisible: function() {
      return this.getMatchAllCountriesContainerElement().css('display') !== 'none';
    },

    isMatchAllCountriesSelected: function() {
      return this.getMatchAllCountriesElement().is(':checked');
    },

    getMatchAllCountriesContainerElement: function () {
      return this.$el.find('.vlr-advanced-search__match-all-countries-container');
    },

    getMatchAllCountriesElement: function () {
      return this.$el.find('.vlr-advanced-search__match-all-countries-input');
    },

    isErasmusPlusProgrammeSelected: function () {
      if (this.programmes.hasOneSelection()) {
        return this.programmes.firstSelectedItem().id === constants.ccm.ERASMUS_PLUS;
      } else {
        return false;
      }
    },

    calculateCriteriaVisibility: function () {
      this.actions.toggle(this.isErasmusPlusProgrammeSelected());
      this.actionsTypes.toggle(this.actions.hasOneSelection());
      this.organisationTypes.toggle(this.isErasmusPlusProgrammeSelected());
      this.regions.toggle(this.countries.hasOneSelection());

      this.getMatchAllCountriesContainerElement().toggle(this.countries.hasMultipleSelections());
    },

    render: function () {
      var html = Mustache.render(tpl);
      this.$el.append(html);

      this.$el.find('.vlr-advanced-search__section-options').append(this.options.render().view.el);
      this.$el.find('.vlr-advanced-search__section-programmes').append(this.programmes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-actions').append(this.actions.render().view.el);
      this.$el.find('.vlr-advanced-search__section-actions-types').append(this.actionsTypes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-activity-years').append(this.activityYears.render().view.el);
      this.$el.find('.vlr-advanced-search__section-funding-years').append(this.fundingYears.render().view.el);
      this.$el.find('.vlr-advanced-search__section-countries').append(this.countries.render().view.el);
      this.$el.find('.vlr-advanced-search__section-regions').append(this.regions.render().view.el);
      this.$el.find('.vlr-advanced-search__section-organisation-types').append(this.organisationTypes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-organisation-roles').append(this.organisationRoles.render().view.el);

      this.initCriteriaVisibility();

      return this;
    }
  });
});