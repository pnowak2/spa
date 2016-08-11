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
      this.callYears = new MultiselectComponent(advancedSearchService.allCallYears(), {
        placeholder: 'All'
      });
      this.countries = new MultiselectComponent(advancedSearchService.allCountries(), {
        placeholder: 'All'
      });
      this.activities = new MultiselectComponent(advancedSearchService.allActivities(), {
        placeholder: 'All'
      });
      this.subactivities = new MultiselectComponent(advancedSearchService.subactivitiesByActivityId(), {
        placeholder: 'All',
        disabled: true
      });
      this.organisationTypes = new MultiselectComponent(advancedSearchService.allOrganisationTypes(), {
        placeholder: 'All'
      });

      this.listenTo(this.activities, 'multiselect:change', this.didActivityChange);
    },

    getCriteria: function() {
      return {
        callYears: _.pluck(this.callYears.selectedItems(), 'id'),
        countries: _.pluck(this.countries.selectedItems(), 'id'),
        activities: _.pluck(this.activities.selectedItems(), 'id'),
        subactivities: _.pluck(this.subactivities.selectedItems(), 'id'),
        organisationTypes: _.pluck(this.organisationTypes.selectedItems(), 'id')
      }
    },

    isDirty: function() {
      return this.callYears.hasSelection() ||
        this.countries.hasSelection() ||
        this.activities.hasSelection() ||
        this.subactivities.hasSelection() ||
        this.organisationTypes.hasSelection();
    },

    didClickClearFilters: function(e) {
      e.preventDefault();

      this.callYears.unselectAll();
      this.countries.unselectAll();
      this.activities.unselectAll();
      this.subactivities.unselectAll();
      this.organisationTypes.unselectAll();
    },

    didActivityChange: function() {
      var selectedActivities = this.activities.selectedItems(),
        selectedActivity,
        subactivitiesByActivity;

      if (_.size(selectedActivities) === 1) {
        selectedActivity = _.first(selectedActivities);
        subactivitiesByActivity = advancedSearchService.subactivitiesByActivityId(selectedActivity.id);
        this.subactivities.update(subactivitiesByActivity);

        if (this.subactivities.hasItems()) {
          this.subactivities.enable();
        } else {
          this.subactivities.disable();
        }
      } else {
        this.subactivities.clear();
        this.subactivities.disable();
      }
    },

    render: function() {
      var html = Mustache.render(tpl);

      this.$el.html(html);

      this.$el.find('#efc-year').append(this.callYears.render().view.el);
      this.$el.find('#efc-country').append(this.countries.render().view.el);
      this.$el.find('#efc-activity').append(this.activities.render().view.el);
      this.$el.find('#efc-subactivity').append(this.subactivities.render().view.el);
      this.$el.find('#efc-organisation-type').append(this.organisationTypes.render().view.el);

      return this;
    }
  });
});