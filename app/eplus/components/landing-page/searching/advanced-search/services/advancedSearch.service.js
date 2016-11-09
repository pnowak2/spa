define(function(require) {

  var _ = require('underscore'),
    programmesDatasource = require('app/eplus/data/programmes.datasource'),
    optionsDatasource = require('app/eplus/data/options.datasource'),
    countriesDatasource = require('app/eplus/data/countries.datasource'),
    activitiesYearsDatasource = require('app/eplus/data/activityYears.datasource'),
    organisationTypesDatasource = require('app/eplus/data/organisation-types.datasource'),
    organisationRolesDatasource = require('app/eplus/data/organisation-roles.datasource'),
    regionsDatasource = require('app/eplus/data/regions.datasource'),
    actionsDatasource = require('app/eplus/data/actions.datasource'),
    actionsTypeDatasource = require('app/eplus/data/actionsType.datasource'),
    topicsDatasource = require('app/eplus/data/topics.datasource'),

    allOptions = function() {
      return optionsDatasource.getItems();
    },

    allProgrammes = function() {
      return programmesDatasource.getItems();
    },

    allCountries = function() {
      return countriesDatasource.getItems();
    },

    allActivityYears = function() {
      return activitiesYearsDatasource.getItems();
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

    allOrganisationTypes = function() {
      return organisationTypesDatasource.getItems();
    },

    allOrganisationRoles = function() {
      return organisationRolesDatasource.getItems();
    },

    getRegionsByCountry = function(countryCode) {
      return regionsDatasource.getItems()[countryCode];
    },

    getActionsByProgramme = function(programmeCode) {
      return actionsDatasource.getItems()[programmeCode];
    },

    getActionsTypeByAction = function(actionCode) {
      return actionsTypeDatasource.getItems()[actionCode];
    },

    getTopicsForFormerProgrammes = function() {
      return topicsDatasource.getItems();
    };

  return {
    allOptions: allOptions,
    allProgrammes: allProgrammes,
    allCountries: allCountries,
    allActivityYears: allActivityYears,
    allFundingYears: allFundingYears,
    allOrganisationTypes: allOrganisationTypes,
    allOrganisationRoles: allOrganisationRoles,
    getRegionsByCountry: getRegionsByCountry,
    getActionsByProgramme: getActionsByProgramme,
    getActionsTypeByAction: getActionsTypeByAction,
    getTopicsForFormerProgrammes: getTopicsForFormerProgrammes
  };
});