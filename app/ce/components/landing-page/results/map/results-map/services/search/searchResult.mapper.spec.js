define(function(require) {
  var programmesDataSource = require('app/ce/data/programmes.datasource'),
    actionsDataSource = require('app/ce/data/actions.datasource'),
    searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        iTotalRecords: '0',
        aaData: []
      },
      dataTwoCountriesTwoRowsEach: {
        iTotalRecords: '2',
        aaData: [
          [
            [
              'id-pl-1',
              '1',
              '2',
              'Project title 1',
              'Project description 1',
              'id-subprogramme-1',
              'Project coordinator 1',
              'id-programme-ce',
              'id-action-video',
              'Project start date 1',
              'Project end date 1',
              'true'
            ]
          ],
          [
            [
              'id-be-1',
              '3',
              '4',
              'Project title 2',
              'Project description 2',
              'id-subprogramme-2',
              'Project coordinator 2',
              'id-programme-culture',
              'id-action-media',
              'Project start date 2',
              'Project end date 2',
              'false'
            ]
          ]
        ]
      },
      dataWithMissingCoordinates: {
        iTotalRecords: '4',
        aaData: [
          [
            [
              'id-pl-1',
              '1',
              '2',
              'Project title 1',
              'Project description 1',
              'id-subprogramme-1',
              'Project coordinator 1',
              'id-programme-ce',
              'id-action-media',
              'Project start date 1',
              'Project end date 1',
              'true'
            ],
            [
              'id-pl-1',
              '',
              '2',
              'Project title 2',
              'Project description 2',
              'id-subprogramme-2',
              'Project coordinator 2',
              'id-programme-2',
              'id-action-video',
              'Project start date 2',
              'Project end date 2',
              'true'
            ],
            [
              'id-pl-3',
              '4',
              '',
              'Project title 3',
              'Project description 3',
              'id-subprogramme-3',
              'Project coordinator 3',
              'id-programme-3',
              'id-action-video',
              'Project start date 3',
              'Project end date 3',
              'true'
            ],
            [
              'id-pl-4',
              '',
              '',
              'Project title 4',
              'Project description 4',
              'id-subprogramme-4',
              'Project coordinator 4',
              'id-programme-4',
              'id-action-video',
              'Project start date 4',
              'Project end date 4',
              'true'
            ]
          ]
        ]
      }
    };

  describe('CE Map Search Result Mapper', function() {
    describe('creation', function() {
      it('should be defined', function() {
        expect(searchResultMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map', function() {
        beforeEach(function() {
          spyOn(programmesDataSource, 'getItems').and.returnValue([{
            id: 'id-programme-ce',
            title: 'Programme Creative Europe'
          }, {
            id: 'id-programme-culture',
            title: 'Programme Culture (2007-2013)'
          }]);

          spyOn(actionsDataSource, 'getItems').and.returnValue({
            'id-subprogramme-1': [{
              id: "id-action-media",
              title: "Action Media"
            }],
            'id-subprogramme-2': [{
              id: "id-action-video",
              title: "Action Video"
            }]
          });
        });

        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });

        describe('Empty response', function() {
          it('should have total equal to zero', function() {
            expect(searchResultMapper.map()).toEqual(jasmine.objectContaining({
              total: 0,
            }));
          });

          it('should convert total to number if it is string', function() {
            var mapped = searchResultMapper.map(testResponses.noData);
            expect(mapped.total).toEqual(jasmine.any(Number));
          });

          it('should have markers equal to empty array', function() {
            expect(searchResultMapper.map()).toEqual(jasmine.objectContaining({
              markers: [],
            }));
          });
        });

        describe('Response with complete data', function() {
          beforeEach(function () {
            this.mapped = searchResultMapper.map(testResponses.dataTwoCountriesTwoRowsEach);
          });

          it('should map total count', function() {
            expect(this.mapped).toEqual(jasmine.objectContaining({
              total: 2
            }));
          });

          it('should map markers array size', function() {
            expect(this.mapped.markers.length).toEqual(2);
          });

          describe('First item', function() {
            it('should map item id', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                id: 'id-pl-1'
              }));
            });

            it('should map item lat', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                lat: '1'
              }));
            });

            it('should map item lng', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                lng: '2'
              }));
            });

            it('should map item title', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                title: 'Project title 1'
              }));
            });

            it('should map item coordinator', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                coordinator: 'Project coordinator 1'
              }));
            });

            it('should map item programme', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                programme: 'Programme Creative Europe'
              }));
            });

            it('should map item action', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                action: 'Action Video'
              }));
            });

            it('should map item start date', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                startDate: 'Project start date 1'
              }));
            });

            it('should map item end date', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                endDate: 'Project end date 1'
              }));
            });

            it('should map item success story', function() {
              expect(this.mapped.markers[0][0]).toEqual(jasmine.objectContaining({
                successStory: true
              }));
            });
          });

          describe('Second item', function() {
            it('should map item id', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                id: 'id-be-1'
              }));
            });

            it('should map item lat', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                lat: '3'
              }));
            });

            it('should map item lng', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                lng: '4'
              }));
            });

            it('should map item title', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                title: 'Project title 2'
              }));
            });

            it('should map item coordinator', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                coordinator: 'Project coordinator 2'
              }));
            });

            it('should map item programme', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                programme: 'Programme Culture (2007-2013)'
              }));
            });

            it('should map item action', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                action: 'Action Media'
              }));
            });

            it('should map item start date', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                startDate: 'Project start date 2'
              }));
            });

            it('should map item end date', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                endDate: 'Project end date 2'
              }));
            });

            it('should map item success story', function() {
              expect(this.mapped.markers[1][0]).toEqual(jasmine.objectContaining({
                successStory: false
              }));
            });
          });
        });

        describe('Response with missing coordinates', function() {
          it('should have correct total number', function() {
            expect(searchResultMapper.map(testResponses.dataWithMissingCoordinates)).toEqual(jasmine.objectContaining({
              total: 4,
            }));
          });

          it('should have correct markers number', function() {
            var mapped = searchResultMapper.map(testResponses.dataWithMissingCoordinates);
            expect(mapped.markers.length).toEqual(1);
          });

          it('should have correct markers mapping', function() {
            var mapped = searchResultMapper.map(testResponses.dataWithMissingCoordinates);
            expect(mapped.markers[0][0].id).toEqual('id-pl-1');
          });        
        });
      });
    });
  });
});