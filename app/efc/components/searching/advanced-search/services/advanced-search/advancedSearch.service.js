define(function(require) {
  _ = require('underscore'),
  countriesDataSource = require('./data/countries'),
  activitiesDataSource = require('./data/activities'),
  subactivitiesDataSource = require('./data/subactivities'),
  organisationTypesDataSource = require('./data/organisationTypes');

  allCountries = function() {
    return countriesDataSource.getItems();
  },

  allActivities = function() {
    return activitiesDataSource.getItems();
  },

  subactivitiesByActivityId = function(activityId) {
    return _.where(subactivitiesDataSource.getItems(), {
      activityId: activityId
    });
  },

  allOrganisationTypes = function() {
    return organisationTypesDataSource.getItems()
  };

  return {
    allCountries: allCountries,
    allActivities: allActivities,
    subactivitiesByActivityId: subactivitiesByActivityId,
    allOrganisationTypes: allOrganisationTypes
  }
});