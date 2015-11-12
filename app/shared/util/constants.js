define(function(require) {
  return {
    urls: {
      rest: {
        SEARCH: '/programmes/service/es/search?index=eplus&indexTypeShow=projectPublicSearch&searchType=simple&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5'
      }
    },
    dom: {
      keys: {
        ENTER: 13
      }
    }
  }
});