define(function(require) {
  var $ = require('jquery'),
    searchInputMapper = require('../search/searchInput.mapper'),
    constants = require('app/ce/util/constants');

  return {
    exportXls: function(criteria) {
      criteria = criteria || {};
      var url = constants.urls.EXPORT_LIST,
        params = $.param(searchInputMapper.map(criteria)),
        wdw = this.getWindow();

        wdw.location = url + "&" + params;
    },

    getWindow: function () {
      return window;
    }
  };
});