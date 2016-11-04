define(function(require) {
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

    initialize: function() {
      this.options = this.createOptionMultiselect();
      this.programmes = this.createProgrammesMultiselect();
      this.actions = this.createActionsMultiselect();
      this.actionsTypes = this.createActionsTypesMultiselect();
      this.topics = this.createTopicsMultiselect();
      this.activityYears = this.createActivityYearsMultiselect();
      this.fundingYears = this.createFundingYearsMultiselect();
      this.countries = this.createCountryMultiselect();
      this.regions = this.createRegionsMultiselect();
      this.organisationTypes = this.createOrganisationTypesMultiselect();
      this.organisationRoles = this.createOrganisationRolesMultiselect();
      this.toggleMatchAllCountriesSelection(false);
      this.toggleMatchAllCountriesVisibility(false);

      this.listenTo(this.countries, 'multiselect:change', this.didCountriesChange);
      this.listenTo(this.programmes, 'multiselect:change', this.didProgrammesChange);
      this.listenTo(this.actions, 'multiselect:change', this.didActionsChange);
    },



    getCriteria: function() {
      var options = _.pluck(this.options.selectedItems(), 'id'),
        programmes = _.pluck(this.programmes.selectedItems(), 'id'),
        actions = _.pluck(this.actions.selectedItems(), 'id'),
        actionsTypes = _.pluck(this.actionsTypes.selectedItems(), 'id'),
        topics = _.pluck(this.topics.selectedItems(), 'id'),
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
        topics: this.topics.isVisible() ? topics : [],
        activityYears: this.activityYears.isVisible() ? activityYears : [],
        fundingYears: this.fundingYears.isVisible() ? fundingYears : [],
        countries: this.countries.isVisible() ? countries : [],
        regions: this.regions.isVisible() ? regions : [],
        organisationTypes: this.organisationTypes.isVisible() ? organisationTypes : [],
        organisationRoles: this.organisationRoles.isVisible() ? organisationRoles : [],
        matchAllCountries: this.isMatchAllCountriesVisible() ? matchAllCountries : false
      };
    },

    createOptionMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allOptions(), {
        placeholder: 'All Options',
        multiple: true
      });
    },

    createProgrammesMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allProgrammes(), {
        placeholder: 'All Programmes',
        multiple: true
      });
    },

    createActionsMultiselect: function() {
      return new MultiselectComponent([], {
        placeholder: 'All Actions',
        multiple: true,
        maximumSelectionLength: 1
      });
    },

    createActionsTypesMultiselect: function() {
      return new MultiselectComponent([], {
        placeholder: 'All Actions Types',
        multiple: true,
        maximumSelectionLength: 1
      });
    },

    createTopicsMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.getTopicsForFormerProgrammes(), {
        placeholder: 'All Topics',
        multiple: true
      });
    },

    createActivityYearsMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allActivityYears(), {
        placeholder: 'All Activity Years',
        multiple: true
      });
    },

    createFundingYearsMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allFundingYears(), {
        placeholder: 'All Funding Years',
        multiple: true
      });
    },

    createCountryMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allCountries(), {
        placeholder: 'All Countries',
        multiple: true
      });
    },

    createRegionsMultiselect: function() {
      return new MultiselectComponent([], {
        placeholder: 'All Regions',
        multiple: true
      });
    },

    createOrganisationTypesMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allOrganisationTypes(), {
        placeholder: 'All Organisation Types',
        multiple: true
      });
    },

    createOrganisationRolesMultiselect: function() {
      return new MultiselectComponent(advancedSearchService.allOrganisationRoles(), {
        placeholder: 'All Organisation Roles',
        multiple: true
      });
    },

    isDirty: function() {
      return this.options.isVisible() && this.options.isDirty() ||
        this.programmes.isVisible() && this.programmes.isDirty() ||
        this.actions.isVisible() && this.actions.isDirty() ||
        this.actionsTypes.isVisible() && this.actionsTypes.isDirty() ||
        this.topics.isVisible() && this.topics.isDirty() ||
        this.activityYears.isVisible() && this.activityYears.isDirty() ||
        this.fundingYears.isVisible() && this.fundingYears.isDirty() ||
        this.countries.isVisible() && this.countries.isDirty() ||
        this.regions.isVisible() && this.regions.isDirty() ||
        this.organisationTypes.isVisible() && this.organisationTypes.isDirty() ||
        this.organisationRoles.isVisible() && this.organisationRoles.isDirty() ||
        this.isMatchAllCountriesVisible() && this.isMatchAllCountriesSelected();
    },

    update: function(criteria) {
      this.options.selectItems(criteria.options);
      this.programmes.selectItems(criteria.programmes);
      this.actions.selectItems(criteria.actions);
      this.actionsTypes.selectItems(criteria.actionsTypes);
      this.topics.selectItems(criteria.topics);
      this.activityYears.selectItems(criteria.activityYears);
      this.fundingYears.selectItems(criteria.fundingYears);
      this.countries.selectItems(criteria.countries);
      this.regions.selectItems(criteria.regions);
      this.organisationTypes.selectItems(criteria.organisationTypes);
      this.organisationRoles.selectItems(criteria.organisationRoles);
      this.toggleMatchAllCountriesSelection(criteria.matchAllCountries);
    },


    didClickClearFilters: function(e) {
      e.preventDefault();

      this.initCriteriaVisibility();

      this.options.update(advancedSearchService.allOptions());
      this.programmes.update(advancedSearchService.allProgrammes());
      this.actions.update([]);
      this.actionsTypes.update([]);
      this.topics.update(advancedSearchService.getTopicsForFormerProgrammes());
      this.activityYears.update(advancedSearchService.allActivityYears());
      this.fundingYears.update(advancedSearchService.allFundingYears());
      this.countries.update(advancedSearchService.allCountries());
      this.regions.update([]);
      this.toggleMatchAllCountriesSelection(false);
      this.toggleMatchAllCountriesVisibility(false);
      this.organisationTypes.update(advancedSearchService.allOrganisationTypes());
      this.organisationRoles.update(advancedSearchService.allOrganisationRoles());
    },

    didCountriesChange: function() {
      var selectedCountry;

      if (this.countries.hasOneSelection()) {
        selectedCountry = this.countries.firstSelectedItem();

        this.regions.update(advancedSearchService.getRegionsByCountry(selectedCountry.id));
      } else {
        this.regions.clear();
      }

      this.calculateCriteriaVisibility();
    },

    didProgrammesChange: function() {
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

    didActionsChange: function() {
      var selectedAction;
      if (this.actions.hasOneSelection()) {
        selectedAction = this.actions.firstSelectedItem();

        this.actionsTypes.update(advancedSearchService.getActionsTypeByAction(selectedAction.id));
      } else {
        this.actionsTypes.clear();
      }

      this.calculateCriteriaVisibility();
    },

    initCriteriaVisibility: function() {
      this.actions.hide();
      this.actionsTypes.hide();
      this.topics.hide();
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

    isOnlyErasmusPlusProgrammeSelected: function() {
      if (this.programmes.hasOneSelection()) {
        return this.programmes.firstSelectedItem().id === constants.ccm.ERASMUS_PLUS;
      } else {
        return false;
      }
    },

    isErasmusPlusProgrammeSelected: function() {
      return _.some(this.programmes.selectedItems(), function(item) {
        return item.id === constants.ccm.ERASMUS_PLUS;
      });
    },

    calculateCriteriaVisibility: function() {
      // There is only one selection, and that is Erasmus+
      var isOnlyErasmusPlusProgrammeSelected = this.isOnlyErasmusPlusProgrammeSelected();
      // There are one or more selections, and none of them is Erasmus+
      var isNotErasmusPlusProgrammeSelected = !(this.isErasmusPlusProgrammeSelected());

      this.actions.toggle(isOnlyErasmusPlusProgrammeSelected);
      this.actionsTypes.toggle(this.actions.hasOneSelection());
      this.topics.toggle(this.programmes.hasSelection() && isNotErasmusPlusProgrammeSelected);
      this.organisationTypes.toggle(isOnlyErasmusPlusProgrammeSelected);
      this.regions.toggle(this.countries.hasOneSelection());

      this.getMatchAllCountriesContainerElement().toggle(this.countries.hasMultipleSelections());
    },

    render: function() {
      var html = Mustache.render(tpl);
      this.$el.append(html);

      this.$el.find('.vlr-advanced-search__section-options').append(this.options.render().view.el);
      this.$el.find('.vlr-advanced-search__section-programmes').append(this.programmes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-actions').append(this.actions.render().view.el);
      this.$el.find('.vlr-advanced-search__section-actions-types').append(this.actionsTypes.render().view.el);
      this.$el.find('.vlr-advanced-search__section-topics').append(this.topics.render().view.el);
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