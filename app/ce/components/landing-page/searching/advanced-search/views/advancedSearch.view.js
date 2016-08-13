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

      this.initCriteriaStatus();

      this.listenTo(this.programmes, 'multiselect:change', this.didProgrammeChange);
      this.listenTo(this.subprogrammes, 'multiselect:change', this.didSubprogrammeChange);
      this.listenTo(this.countries, 'multiselect:change', this.didCountryChange);
    },

    initCriteriaStatus: function() {
      this.clearMatchAllCountries();
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
        this.organisationTypes.isDirty();
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
      // var selectedItem = this.programmes.firstSelectedItem();

      // if (this.programmes.hasSelection()) {
      //   this.subprogrammes.update(
      //     advancedSearchService.subprogrammesByProgramme(selectedItem.id)
      //   );
      //   this.activities.update(
      //     advancedSearchService.activitiesByProgramme(selectedItem.id)
      //   );
      //   this.subprogrammes.show();
      //   this.activities.show();
      //   this.fundingYears.toggle(selectedItem.id === constants.ccm.CE);
      // } else {
      //   this.subprogrammes.hide();
      //   this.subprogrammes.update([]);
      //   this.activities.hide();
      //   this.activities.update([]);
      // }
    },

    didSubprogrammeChange: function() {
      // var selectedItem = this.subprogrammes.firstSelectedItem();

      // if (this.subprogrammes.hasSelection()) {
      //   this.actions.update(
      //     advancedSearchService.actionsBySubprogramme(selectedItem.id)
      //   );
      //   this.actions.show();
      // } else {
      //   this.actions.hide();
      //   this.actions.update([]);
      // }
    },

    didCountryChange: function() {
      // var selectedItem = {},
      //   regions = [];

      // if (this.countries.hasOneSelection()) {
      //   selectedItem = this.countries.firstSelectedItem()
      //   regions = advancedSearchService.regionsByCountry(selectedItem.id);

      //   this.regions.update(regions);
      //   this.regions.show();
      // } else {
      //   this.regions.hide();
      //   this.regions.update([]);
      // }
    },

    update: function(criteria) {
      this.options.selectItems(criteria.options);
      this.programmes.selectItem(criteria.programme);
      this.subprogrammes.selectItem(criteria.subprogramme);
    },

    getMatchAllCountriesElement: function() {
      return this.$el.find('.vlr-advanced-search__match-all-countries-input');
    },

    clearMatchAllCountries: function() {
      this.getMatchAllCountriesElement().removeAttr('checked');
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

      return this;
    }
  });
});