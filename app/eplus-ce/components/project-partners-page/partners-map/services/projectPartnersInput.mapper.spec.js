define(function(require) {
  var projectPartnersInputMapper = require('./projectPartnersInput.mapper');

  describe('Eplus-CE Project Partners Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(projectPartnersInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        it('should be defined', function() {
          expect(projectPartnersInputMapper.map).toEqual(jasmine.any(Function));
        });

        it('should throw if called without project id', function() {
          expect(function() {
            projectPartnersInputMapper.map();
          }).toThrowError('projectId is mandatory');
        });

        it('should map properly project id', function() {
          var mapped = projectPartnersInputMapper.map({
            projectId: '6'
          });

          expect(mapped).toEqual({
            projectId: '6'
          });
        });
      });
    });
  });
});