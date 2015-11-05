define(function(require) {
  var Pageable = require('app/services/search/pageable');

  describe('Pageable', function() {
    describe('type', function() {
      it('should be a function', function() {
        expect(Pageable).toEqual(jasmine.any(Function));
      });
    });

    describe('properties', function() {
      describe('.defaults', function() {
        it('should be defined', function() {
          expect(Pageable.defaults).toEqual({
            page: 1,
            pageSize: 10
          })
        });
      });
    });

    describe('api', function() {
      describe('.create()', function() {
        it('should be defined', function() {
          expect(Pageable.create).toEqual(jasmine.any(Function));
        });

        it('should return pageable object', function() {
          expect(Pageable.create()).toEqual(jasmine.any(Pageable));
        });

        it('should have defaults', function() {
          expect(Pageable.create().attrs).toEqual({
            iDisplayStart: 0,
            iDisplayLength: 10
          });
        });

        it('should return attributes using page only', function() {
          var criteria = {
            page: 2
          };

          expect(Pageable.create(criteria).attrs).toEqual({
            iDisplayStart: 10,
            iDisplayLength: 10
          });
        });

        it('should return attributes using page size only', function() {
          var criteria = {
            pageSize: 20
          };

          expect(Pageable.create(criteria).attrs).toEqual({
            iDisplayStart: 0,
            iDisplayLength: 20
          });
        });

        it('should return attributes using all options', function() {
          var criteria = {
            page: 10,
            pageSize: 10
          };

          expect(Pageable.create(criteria).attrs).toEqual({
            iDisplayStart: 90,
            iDisplayLength: 10
          });
        });
      });
    });
  });
});