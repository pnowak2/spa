define(function(require) {
  var constants = require('./constants');

  describe('EFC Constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('urls', function() {
      it('.SEARCH_LIST should be defined', function() {
        expect(constants.urls.SEARCH_LIST).toEqual('/programmes/service/es/search?index=efc&indexTypeShow=projectPublicSearch&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=TITLE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5');
      });

      it('.SEARCH_MAP should be defined', function() {
        expect(constants.urls.SEARCH_MAP).toEqual('/programmes/service/es/search/map?index=efc&indexTypeSearch=projectPublicSearch');
      });

      it('.PROJECT_PARTNERS should be defined', function() {
        expect(constants.urls.PROJECT_PARTNERS).toEqual('/dgs/education_culture/eve/alfresco/service/valor/details/projectCoordinatorPartners');
      });
    });
  });
});