define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchMapper = require('./searchMapper'),
    constants = require('app/core/constants');

  return {
    search: function(searchCriteria, pagingCriteria) {
      var promise = new RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: constants.urls.rest.SEARCH,
          dataType: 'json',
          method: 'GET',
          data: {
            KEYWORD: searchCriteria.keyword,
            COUNTRIES: searchCriteria.countries,
            iDisplayStart: pagingCriteria.startFromItem,
            iDisplayLength: pagingCriteria.pageSize,
          }
        }).done(function(response) {
          resolve(searchMapper.map(response));
        }).fail(function(jqXHR, textStatus) {
          reject(textStatus);
        });
      });

      return promise;
    }
  }
});