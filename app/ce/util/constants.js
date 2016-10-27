define(function(require) {
  return {
    urls: {
      SEARCH_LIST: '/programmes/service/es/search?index=ce&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC',
      SEARCH_MAP: '/programmes/service/es/search/mapCE',
      EXPORT_LIST: '/programmes/service/es/exportexcel?index=ce&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC',
    },
    options: {
      ONGOING: 'ongoing',
      COMPLETED: 'finalized',
      SUCCESS_STORIES: 'successStoriesOnly',
      RESULTS: 'resultsOnly'
    },
    ccm: {
      CULTURE_2007: 'eve001_cult_2007',
      CE: '31052583',
      CULTURE: '31052584',
      MEDIA: '31052594'
    }
  };
});