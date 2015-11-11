define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchMapper = require('./search.mapper'),
    constants = require('app/util/constants');

  return {
    search: function(criteria) {
      criteria = criteria || {};

      var promise = new RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: constants.urls.rest.SEARCH,
          dataType: 'json',
          method: 'GET',
          data: {
            KEYWORD: criteria.keyword,
            iDisplayStart: criteria.startFromItem,
            iDisplayLength: criteria.pageSize,
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