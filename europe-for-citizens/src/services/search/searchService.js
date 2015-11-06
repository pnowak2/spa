define(function(require) {
  var $ = require('jquery'),
    searchMapper = require('./searchMapper'),
    constants = require('app/core/constants');

  return {
    search: function(searchCriteria, success, failure) {
      $.ajax({
        url: constants.urls.rest.SEARCH,
        dataType: 'json',
        method: 'GET',
        data: {
          KEYWORD: searchCriteria.keyword,
          COUNTRIES: searchCriteria.countries,
          iDisplayStart: searchCriteria.startFromItem,
          iDisplayLength: searchCriteria.pageSize,
        }
      }).done(function(response) {
        success(searchMapper.map(response));
      }).fail(function(jqXHR, textStatus) {
        failure(textStatus);
      });
    }
  }
});