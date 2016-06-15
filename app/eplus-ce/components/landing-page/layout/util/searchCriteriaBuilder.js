define(function (require) {
  var getCriteria = function () {
        var searchTypeValue = $('input[name=searchType]').filter(':checked').val(),
          domain = $('#domain').val(),
          query = '';

      switch(domain) {
        case 'eplus':
          query = buildEducationSearchParams(searchTypeValue);
          break;
        case 'ce':
          query = buildCultureSearchParams(searchTypeValue);
          break;
      }

      return query.replace(/es\/search/g, 'es/search-map');
  }

  return {
    getCriteria: getCriteria
  }
});