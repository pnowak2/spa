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
            it('should map to empty value if not provided', function() {
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
              it('should map to false if not provided', function() {
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
              it('should map to empty value if not provided', function() {
                var input = {};
                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
              });

              it('should map to property if provided', function() {
                var input = {
                  options: [constants.options.ONGOING]
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': constants.options.ONGOING
                }));
              });
            });

            describe('Completed', function() {
              it('should map to empty value if not provided', function() {
                var input = {};
                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
              });

              it('should map to property if provided', function() {
                var input = {
                  options: [constants.options.COMPLETED]
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': constants.options.COMPLETED
                }));
              });
            });

            describe('Ongoing & Completed', function() {
              it('should map to empty property if provided', function() {
                var input = {
                  options: [constants.options.ONGOING, constants.options.COMPLETED]
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
              });
            });

            describe('With Results', function() {
              it('should map to false if not provided', function() {
                var input = {};

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-WITH_RESULTS_ONLY': false
                }));
              });

              it('should map to property if provided', function() {
                var input = {
                  options: ['resultsOnly']
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-WITH_RESULTS_ONLY': true
                }));
              });
            });
          });

          describe('Programme', function() {
            describe('No Programme Selected', function() {
              beforeEach(function() {
                this.input = {};
              });

              it('should map LEVEL1 to empty value if not provided', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL1': ''
                }));
              });

              it('should map LEVEL2 to empty value if not provided', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL2': ''
                }));
              });

              it('should map LEVEL3 to empty value if not provided', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL3': ''
                }));
              });

              it('should map CATEGORY to empty value if not provided', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-CATEGORY': ''
                }));
              });
            });

            describe('Creative Europe Programme Selected', function() {
              beforeEach(function() {
                this.input = {
                  programmes: [constants.ccm.CE]
                };
              });

              it('should map LEVEL1 to CE value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL1': constants.ccm.CE
                }));
              });

              it('should map LEVEL2 to empty value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL2': ''
                }));
              });

              it('should map LEVEL3 to empty value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL3': ''
                }));
              });

              it('should map CATEGORY to empty value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-CATEGORY': ''
                }));
              });
            });

            describe('Culture Programme Selected', function() {
              beforeEach(function() {
                this.input = {
                  programmes: [constants.ccm.CULTURE_2007]
                };
              });

              it('should map LEVEL1 to empty value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL1': ''
                }));
              });

              it('should map LEVEL2 to empty value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL2': ''
                }));
              });

              it('should map LEVEL3 to empty value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-LEVEL3': ''
                }));
              });

              it('should map CATEGORY to CULTURE value', function() {
                expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                  'FILTER-CATEGORY': constants.ccm.CULTURE_2007
                }));
              });
            });
          });

          describe('Subprogramme', function() {
            describe('Creative Europe Programme Selected', function() {
              describe('No Subprogramme Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CE],
                    subprogrammes: []
                  };
                });

                it('should map LEVEL1 to CE value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': constants.ccm.CE
                  }));
                });

                it('should map LEVEL2 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': ''
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': ''
                  }));
                });
              });

              describe('Subprogramme Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CE],
                    subprogrammes: ['sub1']
                  };
                });

                it('should map LEVEL1 to CE value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': constants.ccm.CE
                  }));
                });

                it('should map LEVEL2 to selected value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': 'sub1'
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': ''
                  }));
                });
              });
            });

            describe('Culture Programme Selected', function() {
              describe('No Subprogramme Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CULTURE_2007],
                    subprogrammes: []
                  };
                });

                it('should map LEVEL1 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': ''
                  }));
                });

                it('should map LEVEL2 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': ''
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to programme value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': constants.ccm.CULTURE_2007
                  }));
                });
              });

              describe('Subprogramme Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CULTURE_2007],
                    subprogrammes: ['sub1']
                  };
                });

                it('should map LEVEL1 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': ''
                  }));
                });

                it('should map LEVEL2 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': ''
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to subprogramme value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': 'sub1'
                  }));
                });
              });
            });
          });

          describe('Action', function() {
            describe('Creative Europe Programme Selected', function() {
              describe('No Action Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CE],
                    subprogrammes: ['sub2'],
                    actions: []
                  };
                });

                it('should map LEVEL1 to CE value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': constants.ccm.CE
                  }));
                });

                it('should map LEVEL2 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': 'sub2'
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': ''
                  }));
                });
              });

              describe('Action Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CE],
                    subprogrammes: ['sub1'],
                    actions: ['act1']
                  };
                });

                it('should map LEVEL1 to CE value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': constants.ccm.CE
                  }));
                });

                it('should map LEVEL2 to selected value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': 'sub1'
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': 'act1'
                  }));
                });

                it('should map CATEGORY to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': ''
                  }));
                });
              });
            });

            describe('Culture Programme Selected (Not applicable for Culture but just to be sure..)', function() {
              describe('No Action Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CULTURE_2007],
                    subprogrammes: ['sub1'],
                    actions: []
                  };
                });

                it('should map LEVEL1 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': ''
                  }));
                });

                it('should map LEVEL2 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': ''
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to subprogramme value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': 'sub1'
                  }));
                });
              });

              describe('Action Selected', function() {
                beforeEach(function() {
                  this.input = {
                    programmes: [constants.ccm.CULTURE_2007],
                    subprogrammes: ['sub1'],
                    actions: ['act1']
                  };
                });

                it('should map LEVEL1 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL1': ''
                  }));
                });

                it('should map LEVEL2 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL2': ''
                  }));
                });

                it('should map LEVEL3 to empty value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-LEVEL3': ''
                  }));
                });

                it('should map CATEGORY to subprogramme value', function() {
                  expect(searchInputMapper.map(this.input)).toEqual(jasmine.objectContaining({
                    'FILTER-CATEGORY': 'sub1'
                  }));
                });
              });
            });
          });

          describe('Activities', function() {
            it('should map to empty value if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-TAGS': ''
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                activities: ['avt1', 'avt2']
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-TAGS': 'avt1;avt2'
              }));
            });
          });

          describe('Funding Years', function() {
            it('should map to empty value if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-CALL_YEAR': ''
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                fundingYears: ['2014', '2016']
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-CALL_YEAR': '2014;2016'
              }));
            });
          });

          describe('Activity Years', function() {
            it('should map to empty value if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-START_DATE': ''
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                activityYears: ['2017', '2018']
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-START_DATE': '2017;2018'
              }));
            });
          });

          describe('Countries', function() {
            it('should map to empty value if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-COVERAGE': ''
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                countries: ['PL', 'BE']
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-COVERAGE': 'PL;BE'
              }));
            });
          });

          describe('Match All Countries', function() {
            it('should map to false if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-MATCH_ALL_COUNTRIES': false
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                matchAllCountries: true
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-MATCH_ALL_COUNTRIES': true
              }));
            });
          });

          describe('Regions', function() {
            it('should map to empty value if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-REGION': ''
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                regions: ['reg1', 'reg2']
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-REGION': 'reg1;reg2'
              }));
            });
          });

          describe('Organisation Types', function() {
            it('should map to empty value if not provided', function() {
              var input = {};

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-TYPE': ''
              }));
            });

            it('should map to properties if provided', function() {
              var input = {
                organisationTypes: ['org1', 'org2']
              };

              expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                'FILTER-TYPE': 'org1;org2'
              }));
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