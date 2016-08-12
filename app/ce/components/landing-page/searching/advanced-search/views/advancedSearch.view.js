define(function(require) {
  var Backbone = require('backbone'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component'),
    advancedSearchService = require('../services/advanced-search/advancedSearch.service'),
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