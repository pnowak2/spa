define(function(require) {
  var $ = require('jquery'),
    RSVP = require('rsvp'),
    searchInputMapper = require('./searchInput.mapper'),
    searchResultMapper = require('./searchResult.mapper'),
    constants = require('app/efc/util/constants');

  return {
    search: function(criteria) {
      criteria = criteria || {};

      return new RSVP.Promise(function(resolve, reject) {

        // resolve(searchResultMapper.map({
        //   iTotalRecords: '2',
        //   aaData: [
        //     [
        //       '11',
        //       'Title 1',
        //       'Description 1',
        //       '2011',
        //       'PL|DE',
        //       'Organisation'
        //     ],
        //     [
        //       '16',
        //       'Title 2',
        //       'Description 2',
        //       '2012',
        //       'FR',
        //       'Organisation'
        //     ],
        //   ]
        // }));

        $.ajax({
          url: constants.urls.SEARCH_LIST,
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