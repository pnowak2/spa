define(function (require) {
  var _ = require('underscore'),
    searchInputMapper = require('./searchInput.mapper'),
    constants = require('app/eplus/util/constants');

  describe('EPLUS Search Input Mapper', function () {
    describe('creation', function () {
      it('should be defined', function () {
        expect(searchInputMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('Default search without any criteria typed in', function () {
      it('should map default iDisplayStart', function () {
        expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
          iDisplayStart: 0
        }));
      });

      it('should map default iDisplayLength', function () {
        expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
          iDisplayLength: 10
        }));
      });

      it('should map default searchType', function () {
        expect(searchInputMapper.map()).toEqual(jasmine.objectContaining({
          searchType: 'advanced'
        }));
      });
    });

    describe('api', function () {
      describe('.map()', function () {
        it('should be defined', function () {
          expect(searchInputMapper.map).toEqual(jasmine.any(Function));
        });


        it('should not be possible to call with more than one argument', function () {
          expect(function () {
            searchInputMapper.map(1, 2);
          }).toThrowError('Only one argument is allowed');
        });

        it('should be possible to pass only object as argument', function () {
          expect(function () {
            searchInputMapper.map({});
          }).not.toThrow();
        });

        describe('Mapping Search Criteria Properties', function () {

          describe('keyword', function () {
            it('should map to empty value if the property is not provided', function () {
              var fakeCriteria = {};

              expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                'KEYWORD': ''
              }));
            });

            it('should map to propety value if the property is provided', function () {
              var fakeCriteria = {
                'keyword': 'test'
              };

              expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                'KEYWORD': 'test'
              }));
            });
          });

          describe('Options', function () {

            describe('Ongoing', function () {

              it('should map to empty value if the property is not provided', function () {
                var fakeCriteria = {};

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
              });

              it('should map to property if provided', function () {
                var fakeCriteria = {
                  'options': [constants.options.ONGOING]
                };

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': constants.options.ONGOING
                }));
              });

            });

            describe('Completed', function () {

              it('should map to empty value if the property is not provided', function () {
                var fakeCriteria = {};

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
              });

              it('should map to property if provided', function () {
                var fakeCriteria = {
                  'options': [constants.options.COMPLETED]
                };

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': constants.options.COMPLETED
                }));
              });

            });

            describe('Success Story', function () {
              it('should map to false if not provided', function () {
                var fakeCriteria = {};

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  SUCCESS_STORY: false
                }));
              });

              it('should map to true if provided', function () {
                var fakeCriteria = {
                  options: ['successStoriesOnly']
                };

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  SUCCESS_STORY: true
                }));
              });
            });

            describe('With Results', function () {
              it('should map to false if not provided', function () {
                var fakeCriteria = {};

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'FILTER-WITH_RESULTS_ONLY': false
                }));
              });

              it('should map to true if provided', function () {
                var fakeCriteria = {
                  options: ['resultsOnly']
                };

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'FILTER-WITH_RESULTS_ONLY': true
                }));
              });
            });

            describe('Good Practices', function () {
              it('should map to false if not provided', function () {
                var fakeCriteria = {};

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'GOOD_PRACTICE': false
                }));
              });

              it('should map to true if provided', function () {
                var fakeCriteria = {
                  options: ['goodPracticesOnly']
                };

                expect(searchInputMapper.map(fakeCriteria)).toEqual(jasmine.objectContaining({
                  'GOOD_PRACTICE': true
                }));
              });
            });
          });

          describe('Programmes', function () {

            beforeEach(function () {
              this.criteria = {};
            });

            it('should map to empty value if not provided', function () {
              expect(searchInputMapper.map(this.criteria)).toEqual(jasmine.objectContaining({
                'FILTER-LEVEL1': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                programmes: ['test1', 'test2']
              };
              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-LEVEL1': 'test1;test2'
              }));
            });

          });

          describe('Actions', function () {
            beforeEach(function () {
              this.criteria = {};
            });

            it('should map to empty value if not provided', function () {
              expect(searchInputMapper.map(this.criteria)).toEqual(jasmine.objectContaining({
                'FILTER-LEVEL2': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                actions: ['test1', 'test2']
              };
              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-LEVEL2': 'test1;test2'
              }));
            });
          });

          describe('ActionsTypes', function () {
            beforeEach(function () {
              this.criteria = {};
            });

            it('should map to empty value if not provided', function () {
              expect(searchInputMapper.map(this.criteria)).toEqual(jasmine.objectContaining({
                'FILTER-LEVEL3': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                actionsTypes: ['test1', 'test2']
              };
              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-LEVEL3': 'test1;test2'
              }));
            });
          });

          describe('Activity Years', function () {
            it('should map to empty value if not provided', function () {
              var criteria = {};

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-START_DATE': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                activityYears: ['2017', '2018']
              };

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-START_DATE': '2017;2018'
              }));
            });
          });

          describe('Funding Years', function () {
            it('should map to empty value if not provided', function () {
              var criteria = {};

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-CALL_YEAR': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                fundingYears: ['2014', '2016']
              };

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-CALL_YEAR': '2014;2016'
              }));
            });
          });

          describe('Country', function () {
            it('should map to empty value if not provided', function () {
              var criteria = {};

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-COVERAGE': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                countries: ['SP', 'PL']
              };

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-COVERAGE': 'SP;PL'
              }));
            });
          });

          describe('Regions', function () {
            it('should map to empty value if not provided', function () {
              var criteria = {};

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-REGIONS': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                regions: ['SP', 'PL']
              };

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-REGIONS': 'SP;PL'
              }));
            });
          });

          describe('Type', function () {
            it('should map to empty value if not provided', function () {
              var criteria = {};

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-TYPE': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                organisationTypes: ['1', '2']
              };

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-TYPE': '1;2'
              }));
            });
          });

          describe('Role', function () {
            it('should map to empty value if not provided', function () {
              var criteria = {};

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-ROLE': ''
              }));
            });

            it('should map to properties if provided', function () {
              var criteria = {
                organisationRoles: ['SP', 'PL']
              };

              expect(searchInputMapper.map(criteria)).toEqual(jasmine.objectContaining({
                'FILTER-ROLE': 'SP;PL'
              }));
            });
          });
        });

        describe('Mapping Paging Properties', function () {
          it('should map start from page', function () {
            var input = {
              startFromItem: 30
            };

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              iDisplayStart: 30,
              iDisplayLength: 10
            }));
          });

          it('should map page size', function () {
            var input = {
              pageSize: 19
            };

            expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
              iDisplayStart: 0,
              iDisplayLength: 19
            }));
          });

          it('should map all paging properties', function () {
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