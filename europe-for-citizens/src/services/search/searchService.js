define(function (require) {
  var _ = require('underscore'),
    $ = require('jquery');

  var searchByKeyword = function (searchCriteria, success, failure) {
    var url = '/programmes/service/es/search?index=eplus&indexTypeShow=projectPublicSearch&searchType=simple&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5';

    console.log(searchCriteria.page)

    var request = $.ajax({
      url: url,
      dataType: 'json',
      method: 'GET',
      data: {
        'KEYWORD': searchCriteria.keyword,
        'iDisplayStart': (searchCriteria.page - 1) * searchCriteria.pageSize,
        'iDisplayLength': searchCriteria.pageSize
      }
    });

    request
      .done(function (response) {
        var total = response['iTotalRecords'],
          items = _.map(response['aaData'], function (responseItem) {
            return {
              id: responseItem[0],
              title: responseItem[1],
              description: responseItem[2],
              year: responseItem[4],
              countries: _.map(responseItem[5].split('|'), function (country) {
                return country.toLowerCase();
              })
            }
          });

        success.call(null, {
          total: total,
          items: items
        });
      })
      .fail(function (jqXHR, textStatus) {
        failure.call(null, textStatus);
      });
  }

  return {
    searchByKeyword: searchByKeyword
  }
});