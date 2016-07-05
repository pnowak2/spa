define(function(require) {
  return {
    urls: {
      SEARCH_LIST: '/programmes/service/es/search?index=efc&indexTypeShow=projectPublicSearch&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=TITLE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5',
      EXPORT_LIST: '/programmes/service/es/exportexcel?index=efc&indexTypeShow=projectPublicSearch&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=TITLE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5',
      SEARCH_MAP: '/programmes/service/es/search/map?index=efc&indexTypeSearch=projectPublicSearch',
      PROJECT_PARTNERS: '/programmes/service/es/project/partners'
    }
  }
});