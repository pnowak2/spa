define(function(require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper'),
    constants = require('app/ce/util/constants');

  describe('CE Search Input Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        it('should be defined', function() {
          expect(searchInputMapper.map).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          expect(function() {
            searchInputMapper.map();
          }).not.toThrow();
        });

        describe('Default search without any criteria typed in', function() {
          it('should map default iDisplayStart', function() {
            expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
              iDisplayStart: 0
            }));
          });

          it('should map default iDisplayLength', function() {
            expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
              iDisplayLength: 10
            }));
          });

          it('should map default searchType', function() {
            expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
              searchType: 'simple'
            }));
          });
        });

        describe('Mapping Search Criteria Properties', function() {
          describe('Keyword', function() {
            it('should map to default property if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                KEYWORD: ''
              }));
            });

            it('should map to property if provided', function() {
              var input = {
                keyword: 'foo'
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                KEYWORD: 'foo'
              }));
            });
          });

          describe('Options', function() {
            describe('Success Story', function() {
              it('should map to default property if not provided', function() {
                var input = {};

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  SUCCESS_STORY: false
                }));
              });

              it('should map to property if provided', function() {
                var input = {
                  options: ['successStoriesOnly']
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  SUCCESS_STORY: true
                }));
              });
            });

            describe('Ongoing', function() {
              it('should not map property if not provided', function() {
                var input = {};
                expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-PROJECT_STATUS');
              });

              it('should map to property if provided', function() {
                var input = {
                  options: ['ongoing']
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': 'ongoing'
                }));
              });
            });

            describe('Completed', function() {
              it('should not map property if not provided', function() {
                var input = {};
                expect(_.keys(searchInputMapper.map(input))).not.toContain('FILTER-PROJECT_STATUS');
              });

              it('should map to property if provided', function() {
                var input = {
                  options: ['completed']
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': 'completed'
                }));
              });
            });
          });
        });

        describe('Mapping Paging Properties', function() {
          it('should map start from page', function() {
            var input = {
              startFromItem: 30
            };

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              iDisplayStart: 30,
              iDisplayLength: 10
            }));
          });

          it('should map page size', function() {
            var input = {
              pageSize: 19
            };

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              iDisplayStart: 0,
              iDisplayLength: 19
            }));
          });

          it('should map all paging properties', function() {
            var input = {
              startFromItem: 11,
              pageSize: 29
            };

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              iDisplayStart: 11,
              iDisplayLength: 29
            }));
          });
        });
      });
    });
  });
});