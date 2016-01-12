define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchInputMapper = require('./searchInput.mapper'),
    searchResultMapper = require('./searchResult.mapper'),
    markersDataSource = require('./data/markers'),
    constants = require('app/efc/util/constants');

  return {
    search: function(criteria) {
      criteria = criteria || {};

      return new RSVP.Promise(function(resolve, reject) {
        // resolve(searchResultMapper.map(markersDataSource.generate()));
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
  }
});