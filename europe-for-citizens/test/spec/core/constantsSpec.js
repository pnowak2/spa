define(function(require) {
  var constants = require('app/core/constants');

  describe('Constants - Applications constants', function() {
    describe('type', function() {
      it('should be of object', function() {
        expect(constants).toEqual(jasmine.any(Object));
      });
    });

    describe('urls', function() {
      describe('rest', function() {
        it('namespace should be defined', function() {
          expect(constants.urls.rest).toEqual(jasmine.any(Object));
        });

        it('.SEARCH should be defined', function() {
          expect(constants.urls.rest.SEARCH).toEqual('/programmes/service/es/search?index=eplus&indexTypeShow=projectPublicSearch&searchType=simple&indexTypeSearch=projectPublicSearch&GOOD_PRACTICE=false&SUCCESS_STORY=false&sort=MODIFIED_DATE-DESC&sEcho=1&iColumns=6&sColumns=nodeRef%2Ctitle%2Cdescription%2Ctopics%2CstartDate%2Ccountries&mDataProp_0=0&mDataProp_1=1&mDataProp_2=2&mDataProp_3=3&mDataProp_4=4&mDataProp_5=5');
        });
      });
    });

    describe('dom', function() {
      describe('keys', function() {
        it('namespace should be defined', function() {
          expect(constants.dom.keys).toEqual(jasmine.any(Object));
        });

        it('.ENTER should be defined', function() {
          expect(constants.dom.keys.ENTER).toBe(13);
        });
      });
    });
  });
});