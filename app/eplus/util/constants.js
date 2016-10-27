define(function(require) {
  return {
    urls: {
      'SEARCH_LIST': '/programmes/service/es/search?index=eplus&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC',
      'SEARCH_MAP': '/programmes/service/es/search/clustermap?index=eplus&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC',
      'EXPORT_LIST': '/programmes/service/es/exportexcel?index=eplus&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC',

    },
    ccm: {
      'ERASMUS_PLUS': '31046216'
    },
    options: {
      'ONGOING': 'ongoing',
      'COMPLETED': 'finalized',
      'SUCCESS_STORIES': 'successStoriesOnly',
      'RESULTS': 'resultsOnly',
      'GOOD_PRACTICE': 'goodPracticesOnly'
    }

  };
});