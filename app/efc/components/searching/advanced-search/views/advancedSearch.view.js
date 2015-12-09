define(function(require) {
  var Backbone = require('backbone'),
    MultiselectComponent = require('app/shared/components/multiselect/main.component'),
    advancedSearchService = require('../services/advancedSearch.service'),
    Mustache = require('mustache'),
    tpl = require('text!../templates/advancedSearch.tpl.html');

  return Backbone.View.extend({
    className: 'efc-advanced-search',

    events: {
      'click a.efc-advanced-search__clear': 'didClickClearFilters'
    },

    initialize: function() {
      this.countries = new MultiselectComponent(advancedSearchService.allCountries(), {
        placeholder: 'All'
      });
      this.activities = new MultiselectComponent(advancedSearchService.allActivities(), {
        placeholder: 'All'
      });
      this.subactivities = new MultiselectComponent(advancedSearchService.subactivitiesByActivityId(), {
        placeholder: 'All'
      });
      this.organisationTypes = new MultiselectComponent(advancedSearchService.allOrganisationTypes(), {
        placeholder: 'All'
      });
    },

    getCriteria: function() {
      return {
        countries: _.pluck(this.countries.selectedItems(), 'id'),
        activities: _.pluck(this.activities.selectedItems(), 'id'),
        subactivities: _.pluck(this.subactivities.selectedItems(), 'id'),
        organisationTypes: _.pluck(this.organisationTypes.selectedItems(), 'id')
      }
    },

    hasSelections: function() {
      return this.countries.hasSelection() ||
        this.activities.hasSelection() ||
        this.subactivities.hasSelection() ||
        this.organisationTypes.hasSelection();
    },

    didClickClearFilters: function(e) {
      e.preventDefault();

      this.countries.unselectAll();
      this.activities.unselectAll();
      this.subactivities.unselectAll();
      this.organisationTypes.unselectAll();
    },

    render: function() {
      var html = Mustache.render(tpl);

      this.$el.html(html);

      this.$el.find('#efc-country').append(this.countries.render().view.el);
      this.$el.find('#efc-activity').append(this.activities.render().view.el);
      this.$el.find('#efc-subactivity').append(this.subactivities.render().view.el);
      this.$el.find('#efc-organisation-type').append(this.organisationTypes.render().view.el);

      return this;
    }
  });
});