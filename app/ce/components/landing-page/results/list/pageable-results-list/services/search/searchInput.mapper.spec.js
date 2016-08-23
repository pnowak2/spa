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
              it('should map to default property if not provided', function() {
                var input = {};
                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
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
              it('should map to default property if not provided', function() {
                var input = {};
                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
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

            describe('Ongoing & Completed', function() {
              it('should map to empty property if provided', function() {
                var input = {
                  options: ['ongoing', 'completed']
                };

                expect(searchInputMapper.map(input)).toEqual(jasmine.objectContaining({
                  'FILTER-PROJECT_STATUS': ''
                }));
              });
            });

            describe('With Results', function() {
              it('should map to default property if not provided', function() {
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