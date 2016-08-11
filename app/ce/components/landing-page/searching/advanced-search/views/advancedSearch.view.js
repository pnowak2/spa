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
    },

    getCriteria: function() {

    },

    hasSelections: function() {
      return this.options.hasSelection() ||
        this.programmes.hasSelection() ||
        this.subprogrammes.hasSelection() ||
        this.actions.hasSelection() ||
        this.activities.hasSelection() ||
        this.activityYears.hasSelection() ||
        this.fundingYears.hasSelection() ||
        this.countries.hasSelection() ||
        this.regions.hasSelection() ||
        this.organisationTypes.hasSelection();
    },

    didClickClearFilters: function(e) {
      e.preventDefault();

      this.options.unselectAll();
      this.programmes.unselectAll();
      this.subprogrammes.unselectAll();
      this.actions.unselectAll();
      this.activities.unselectAll();
      this.activityYears.unselectAll();
      this.fundingYears.unselectAll();
      this.countries.unselectAll();
      this.regions.unselectAll();
      this.organisationTypes.unselectAll();
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