define(function(require) {
  return {
    urls: {
      SEARCH_LIST: '/programmes/service/es/search?index=ce&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=5&sColumns=nodeRef%2Ctitle%2Cdescription%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4',
      EXPORT_LIST: '/programmes/service/es/exportexcel?index=ce&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=5&sColumns=nodeRef%2Ctitle%2Cdescription%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4',
    },
    options: {
      ONGOING: 'ongoing',
      COMPLETED: 'completed',
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