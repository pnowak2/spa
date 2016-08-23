define(function(require) {
  var constants = require('./constants');

  describe('CE Constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('urls', function() {
      it('.SEARCH_LIST should be defined', function() {
        expect(constants.urls.SEARCH_LIST).toEqual('/programmes/service/es/search?index=ce&indexTypeShow=projectPublicSearch&searchType=advanced&indexTypeSearch=projectPublicSearch&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=5&sColumns=nodeRef%2Ctitle%2Cdescription%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4');
      });
    });

    describe('options', function() {
      it('.ONGOING should be defined', function() {
        expect(constants.options.ONGOING).toEqual('ongoing');
      });

      it('.COMPLETED should be defined', function() {
        expect(constants.options.COMPLETED).toEqual('completed');
      });

      it('.SUCCESS_STORIES should be defined', function() {
        expect(constants.options.SUCCESS_STORIES).toEqual('successStoriesOnly');
      });

      it('.RESULTS should be defined', function() {
        expect(constants.options.RESULTS).toEqual('resultsOnly');
      });
    });

    describe('ccm', function() {
      it('.CE should be defined', function() {
        expect(constants.ccm.CE).toBeDefined();
      });

      it('.CULTURE_2007 should be defined', function() {
        expect(constants.ccm.CULTURE_2007).toBeDefined();
      });

      it('.CULTURE should be defined', function() {
        expect(constants.ccm.CULTURE).toBeDefined();
      });

      it('.MEDIA should be defined', function() {
        expect(constants.ccm.MEDIA).toBeDefined();
      });
    });
  });
});