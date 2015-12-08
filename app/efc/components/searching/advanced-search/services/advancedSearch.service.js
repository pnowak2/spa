define(function(require) {
  RSVP = require('rsvp'),
  countriesDataSource = require('./data/countries'),
  activitiesDataSource = require('./data/activities'),
  organisationTypesDataSource = require('./data/organisationTypes');

  allCountries = function() {
    return new RSVP.Promise(function(resolve, reject) {
      resolve(countriesDataSource);
    });
  },

  allActivities = function() {
    return new RSVP.Promise(function(resolve, reject) {
      resolve(activitiesDataSource);
    });
  },

  allOrganisationTypes = function() {
    return new RSVP.Promise(function(resolve, reject) {
      resolve(organisationTypesDataSource);
    });
  };

  return {
    allCountries: allCountries,
    allActivities: allActivities,
    allOrganisationTypes: allOrganisationTypes
  }
});