define(function(require) {
  var $ = require('jquery'),
    searchMapper = require('./searchMapper'),
    constants = require('app/core/constants');

  var search = function(searchCriteria, success, failure) {
    $.ajax({
      url: constants.urls.rest.SEARCH,
      dataType: 'json',
      method: 'GET',
      data: {
        'KEYWORD': searchCriteria.keyword,
        'iDisplayStart': (searchCriteria.page - 1) * searchCriteria.pageSize,
        'iDisplayLength': searchCriteria.pageSize
      }
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