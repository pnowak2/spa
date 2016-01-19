define(function(require) {
  _ = require('underscore'),
  countriesDataSource = require('app/efc/data/countries.datasource'),
  activitiesDataSource = require('app/efc/data/activities.datasource'),
  subactivitiesDataSource = require('app/efc/data/subactivities.datasource'),
  organisationTypesDataSource = require('app/efc/data/organisationTypes.datasource');

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