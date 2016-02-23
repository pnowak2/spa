define(function(require) {
  var projectPartnersResultMapper = require('./projectPartnersResult.mapper');

  describe('Project Partners Result Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(projectPartnersResultMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        it('should be defined', function() {
          expect(projectPartnersResultMapper.map).toEqual(jasmine.any(Function));
        });
      });
    });
  });
});