define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchResultMapper = require('./searchResult.mapper'),
    constants = require('app/efc/util/constants');

  return {
    search: function(criteria) {
      criteria = criteria || {};

      return new RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: constants.rest.SEARCH,
          dataType: 'json',
          method: 'GET',
          data: {
            KEYWORD: criteria.keyword,
            iDisplayStart: criteria.startFromItem || 0,
            iDisplayLength: criteria.pageSize || 10,
          }
        }).done(function(response) {
          resolve(searchResultMapper.map(response));
        }).fail(function(jqXHR, textStatus) {
          reject(textStatus);
        });
      });
    }
  }
});