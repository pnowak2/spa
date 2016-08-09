define(function(require) {
  var searchCriteriaBuilder = require('./searchCriteriaBuilder');

  describe('Eplus Search Criteria Builder', function() {
    beforeEach(function() {
      this.fakeEducationSearchParams = '/programmes/service/search-map?foo=1&bar=2';
      this.fakeCultureSearchParams = '/programmes/service/search-map?goo=3&baz=4';
      window.buildEducationSearchParams = jasmine.createSpy('buildEducationSearchParams').and.returnValue(this.fakeEducationSearchParams);
      window.buildCultureSearchParams = jasmine.createSpy('buildCultureSearchParams').and.returnValue(this.fakeCultureSearchParams);
    });

    describe('.getCriteria()', function() {
      it('should be defined', function() {
        expect(searchCriteriaBuilder.getCriteria).toEqual(jasmine.any(Function));
      });

      describe('Erasmus Plus', function() {
        beforeEach(function() {
          setFixtures('<input checked value="projectPublicSearch" name="searchType" type="radio"><input type="hidden" id="domain" value="eplus">');
        });

        it('should use education search params for Eplus domain', function() {
          searchCriteriaBuilder.getCriteria();
          expect(window.buildEducationSearchParams).toHaveBeenCalledWith('projectPublicSearch');
          expect(window.buildCultureSearchParams).not.toHaveBeenCalled();
        });

        it('should return criteria as javascript object', function() {
          expect(searchCriteriaBuilder.getCriteria()).toEqual({
            foo: '1',
            bar: '2'
          });
        });
      });

      describe('Creative Europe', function() {
        beforeEach(function() {
          setFixtures('<input checked value="projectPublicSearch" name="searchType" type="radio"><input type="hidden" id="domain" value="ce">');
        });

        it('should use education search params for Eplus domain', function() {
          searchCriteriaBuilder.getCriteria();
          expect(window.buildCultureSearchParams).toHaveBeenCalledWith('projectPublicSearch');
          expect(window.buildEducationSearchParams).not.toHaveBeenCalled();
        });

        it('should return criteria as javascript object', function() {
          expect(searchCriteriaBuilder.getCriteria()).toEqual({
            goo: '3',
            baz: '4'
          });
        });
      });
    });

    describe('.getQueryParametersAsObject()', function() {
      it('should be defined', function() {
        expect(searchCriteriaBuilder.getQueryParametersAsObject).toEqual(jasmine.any(Function));
      });

      it('should extract params from query without url', function() {
        var queryObj = searchCriteriaBuilder.getQueryParametersAsObject('a=b&c=d');

        expect(queryObj).toEqual({
          a: 'b',
          c: 'd'
        });
      });

      it('should extract params from query without url but with question mark', function() {
        var queryObj = searchCriteriaBuilder.getQueryParametersAsObject('?a=b&c=d');

        expect(queryObj).toEqual({
          a: 'b',
          c: 'd'
        });
      });

      it('should extract params from query without url but with trailing ampersand', function() {
        var queryObj = searchCriteriaBuilder.getQueryParametersAsObject('a=b&c=d&');

        expect(queryObj).toEqual({
          a: 'b',
          c: 'd'
        });
      });

      it('should extract params from query with url', function() {
        var queryObj = searchCriteriaBuilder.getQueryParametersAsObject('/server?a=b&c=d');

        expect(queryObj).toEqual({
          a: 'b',
          c: 'd'
        });
      });

      it('should extract params from query with url and no params', function() {
        var queryObj = searchCriteriaBuilder.getQueryParametersAsObject('/server');

        expect(queryObj).toEqual({});
      });
    });
  });
});