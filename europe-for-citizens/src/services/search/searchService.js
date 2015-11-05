define(function(require) {
  var $ = require('jquery'),
    searchMapper = require('./searchMapper'),
    constants = require('app/core/constants');

  var search = function(searchCriteria, success, failure) {
    $.ajax({
      url: constants.urls.rest.SEARCH,
      dataType: 'json',
      method: 'GET',
      data: pageUtils.pagify(searchCriteria).mix({
        KEYWORD: this.keyword,
        COUNTRIES: this.countries
      })
    }).done(function(response) {
      success(searchMapper.map(response));
    }).fail(function(jqXHR, textStatus) {
      failure(textStatus);
    });
  };

  return {
    search: search
  }
});