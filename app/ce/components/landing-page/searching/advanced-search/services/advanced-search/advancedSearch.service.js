define(function(require) {
  var _ = require('underscore'),
    optionsDatasource = require('app/ce/data/options.datasource'),
    programmesDatasource = require('app/ce/data/programmes.datasource'),
    subprogrammesDatasource = require('app/ce/data/subprogrammes.datasource'),
    actionsDatasource = require('app/ce/data/actions.datasource'),
    activitiesDatasource = require('app/ce/data/activities.datasource'),
    activityYearsDataSource = require('app/ce/data/activityYears.datasource'),
    countriesDatasource = require('app/ce/data/countries.datasource'),
    regionsDatasource = require('app/ce/data/regions.datasource'),
    orgTypesDataSource = require('app/ce/data/organisation-types.datasource'),

    allOptions = function() {
      return optionsDatasource.getItems();
    },

    allProgrammes = function() {
      return programmesDatasource.getItems();
    },

    subprogrammesByProgramme = function(programmeCode) {
      return subprogrammesDatasource.getItems()[programmeCode];
    },

    actionsBySubprogramme = function(subprogrammeCode) {
      return actionsDatasource.getItems()[subprogrammeCode];
    },

    activitiesByProgramme = function(programmeCode) {
      return activitiesDatasource.getItems()[programmeCode];
    },

    allActivityYears = function() {
      return activityYearsDataSource.getItems();
    },

    allFundingYears = function() {
      var startYear = 2014,
        currentYear = new Date().getFullYear(),
        yearsRange = _.range(startYear, currentYear + 1);

      return _.map(yearsRange, function(year) {
        return {
          id: year,
          title: year,
          hint: 'funding year'
        };
      });
    },

    allCountries = function() {
      return countriesDatasource.getItems();
    },

    regionsByCountry = function(countryCode) {
      return regionsDatasource.getItems()[countryCode];
    },

    allOrganisationTypes = function() {
      return orgTypesDataSource.getItems();
    };

  return {
    allOptions: allOptions,
    allProgrammes: allProgrammes,
    subprogrammesByProgramme: subprogrammesByProgramme,
    actionsBySubprogramme: actionsBySubprogramme,
    activitiesByProgramme: activitiesByProgramme,
    allFundingYears: allFundingYears,
    allActivityYears: allActivityYears,
    allCountries: allCountries,
    regionsByCountry: regionsByCountry,
    allOrganisationTypes: allOrganisationTypes
  };
});