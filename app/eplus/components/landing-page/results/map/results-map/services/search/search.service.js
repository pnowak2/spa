define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchInputMapper = require('./searchInputHardcoded.mapper'),
    searchResultMapper = require('./searchResult.mapper'),
    constants = require('app/eplus/util/constants');

  return {
    search: function(criteria) {
      criteria = criteria || {};

      return new RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: constants.urls.SEARCH_MAP,
          dataType: 'json',
          method: 'GET',
          data: searchInputMapper.map(criteria)
        }).done(function(response) {
          resolve(searchResultMapper.map(response));
        }).fail(function(jqXHR, textStatus) {
          reject(textStatus);
        });
      });
    }
  };
});