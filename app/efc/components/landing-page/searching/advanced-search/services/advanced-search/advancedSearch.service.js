define(function(require) {
  _ = require('underscore'),
  countriesDataSource = require('app/efc/data/countries.datasource'),
  activitiesDataSource = require('app/efc/data/activities.datasource'),
  subactivitiesDataSource = require('app/efc/data/subactivities.datasource'),
  organisationTypesDataSource = require('app/efc/data/organisationTypes.datasource');

  allCallYears = function() {
    var startYear = 2014,
      currentYear = new Date().getFullYear(),
      yearsRange = _.range(startYear, currentYear + 1);

    return _.map(yearsRange, function(year) {
      return {
        id: year,
        title: year
      }
    });
  },

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
    allCallYears: allCallYears,
    allCountries: allCountries,
    allActivities: allActivities,
    subactivitiesByActivityId: subactivitiesByActivityId,
    allOrganisationTypes: allOrganisationTypes
  }
});