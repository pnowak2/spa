define(function(require) {
  _ = require('underscore'),
  countriesDataSource = require('./data/countries'),
  activitiesDataSource = require('./data/activities'),
  subactivitiesDataSource = require('./data/subactivities'),
  organisationTypesDataSource = require('./data/organisationTypes');

  allCountries = function() {
    return countriesDataSource.getData();
  },

  allActivities = function() {
    return activitiesDataSource.getData();
  },

  subactivitiesByActivityId = function(activityId) {
    return _.where(subactivitiesDataSource.getData(), {
      activityId: activityId
    });
  },

  allOrganisationTypes = function() {
    return organisationTypesDataSource.getData()
  };

  return {
    allCountries: allCountries,
    allActivities: allActivities,
    subactivitiesByActivityId: subactivitiesByActivityId,
    allOrganisationTypes: allOrganisationTypes
  }
});