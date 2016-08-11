define(function(require) {
  var _ = require('underscore'),
		countriesDatasource = require('app/ce/data/countries.datasource'),

		allCountries = function () {
			return countriesDatasource.getItems();
		};
  
  return {
  	allCountries: allCountries
  }
});