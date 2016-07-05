define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchInputMapper = require('../search/searchInput.mapper'),
    constants = require('app/efc/util/constants');

  return {
    search: function(criteria) {
      criteria = criteria || {};

      return new RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: constants.urls.EXPORT_LIST,
          dataType: 'json',
          method: 'GET',
          data: searchInputMapper.map(criteria)
        }).done(function(response) {
          resolve();
        }).fail(function(jqXHR, textStatus) {
          reject(textStatus);
        });
      });
    }
  }
});