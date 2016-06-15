define(function(require) {
  var searchCriteriaBuilder = require('./searchCriteriaBuilder');

  describe('Eplus/CE Search Criteria Builder', function() {
    beforeEach(function() {
      this.fakeEducationSearchParams = 'es/search';
      this.fakeCultureSearchParams = 'es/search';
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
          expect(window.buildEducationSearchParams).toHaveBeenCalledWith('projectPublicSearch')
        });

        it('should use correct webscript name in criteria', function() {
          expect(searchCriteriaBuilder.getCriteria()).toContain('es/search-map');
        });
      });

      describe('Creative Europe', function() {
        beforeEach(function() {
          setFixtures('<input checked value="projectPublicSearch" name="searchType" type="radio"><input type="hidden" id="domain" value="ce">');
        });

        it('should use education search params for Eplus domain', function() {
          searchCriteriaBuilder.getCriteria();
          expect(window.buildCultureSearchParams).toHaveBeenCalledWith('projectPublicSearch')
        });

        it('should use correct webscript name in criteria', function() {
          expect(searchCriteriaBuilder.getCriteria()).toContain('es/search-map');
        });
      });
    });
  });
});