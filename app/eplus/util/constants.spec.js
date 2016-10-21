define(function(require) {
    var constants = require('./constants');

    describe('Eplus Constants', function() {
        describe('type', function() {
            it('should be of object', function() {
                expect(constants).toEqual(jasmine.any(Object));
            });
        });

        describe('urls', function() {

            it('.SEARCH_MAP should be defined', function() {
                expect(constants.urls.SEARCH_MAP).toEqual('/programmes/service/es/search/clustermap');
            });

        });

        describe('ccm', function() {

            it('ERASMUS_PLUS should be defined', function() {
                expect(constants.ccm.ERASMUS_PLUS).toBeDefined();
            });

            it('ERASMUS_PLUS should return 31046216 code', function() {
                expect(constants.ccm.ERASMUS_PLUS).toEqual('31046216');
            });

        });

        describe('options', function() {

            it('.ONGOING should be defined', function() {
                expect(constants.options.ONGOING).toEqual('ongoing');
            });

            it('.COMPLETED should be defined', function() {
                expect(constants.options.COMPLETED).toEqual('finalized');
            });

            it('.SUCCESS_STORIES should be defined', function() {
                expect(constants.options.SUCCESS_STORIES).toEqual('successStoriesOnly');
            });

            it('.RESULTS should be defined', function() {
                expect(constants.options.RESULTS).toEqual('resultsOnly');
            });

            it('.GOOD_PRACTICE should be defined', function() {
                expect(constants.options.GOOD_PRACTICE).toEqual('goodPracticesOnly');
            });

            

        });
    });
});