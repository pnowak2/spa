define(function(require) {
  var projectPartnersInputMapper = require('./projectPartnersInput.mapper'),
    projectPartnersResultMapper = require('./projectPartnersResult.mapper'),
    constants = require('app/eplus-ce/util/constants'),
    RSVP = require('rsvp'),
    $ = require('jquery'),

    find = function(criteria) {
      return new RSVP.Promise(function(resolve, reject) {
        $.ajax({
          url: constants.urls.PROJECT_PARTNERS,
          dataType: 'json',
          method: 'GET',
          data: projectPartnersInputMapper.map(criteria)
        }).done(function(response) {
          resolve(projectPartnersResultMapper.map(response));
        }).fail(function(jqXHR, textStatus) {
          reject(textStatus);
        });
      });
    }

  return {
    find: find
  }
});