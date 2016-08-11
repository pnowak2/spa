define(function(require) {
  var _ = require('underscore'),
		optionsDatasource = require('app/ce/data/options.datasource'),
    programmesDatasource = require('app/ce/data/programmes.datasource'),
    activityYearsDataSource = require('app/ce/data/activityYears.datasource'),
		countriesDatasource = require('app/ce/data/countries.datasource'),
    orgTypesDataSource = require('app/ce/data/organisation-types.datasource'),

    allOptions = function () {
			return optionsDatasource.getItems();
    },

    allProgrammes = function () {
			return programmesDatasource.getItems();
    },

		allActivityYears = function () {
			return activityYearsDataSource.getItems();
		},

		allFundingYears = function () {
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


		allCountries = function () {
			return countriesDatasource.getItems();
		},

		allOrganisationTypes = function () {
			return orgTypesDataSource.getItems();
		};
  
  return {
  	allCountries: allCountries,
  	allOrganisationTypes: allOrganisationTypes,
  	allOptions: allOptions,
  	allProgrammes: allProgrammes,
  	allFundingYears: allFundingYears,
  	allActivityYears: allActivityYears
  }
});
