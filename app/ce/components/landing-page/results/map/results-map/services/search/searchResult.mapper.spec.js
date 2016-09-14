define(function(require) {
  var activitiesDataSource = require('app/efc/data/activities.datasource'),
    searchResultMapper = require('./searchResult.mapper'),

    testResponses = {
      noData: {
        total: '0',
        items: []
      },
      dataTwoCountriesTwoRowsEach: {
        iTotalRecords: '4',
        aaData: [
          [
            [
              'id-pl-1',
              '1',
              '2',
              'Project title (pl-1)',
              'Project description (pl-1)',
              'id-activity-1',
              'Project coordinator (pl-1)'
            ],
            [
              'id-pl-2',
              '3',
              '4',
              'Project title (pl-2)',
              'Project description (pl-2)',
              'id-activity-1',
              'Project coordinator (pl-2)'
            ]
          ],
          [
            [
              'id-be-1',
              '5',
              '6',
              'Project title (be-1)',
              'Project description (be-1)',
              'id-activity-2',
              'Project coordinator (be-1)'
            ],
            [
              'id-be-2',
              '7',
              '8',
              'Project title (be-2)',
              'Project description (be-2)',
              'id-activity-2',
              'Project coordinator (be-2)'
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
              'Project title (pl-1)',
              'Project description (pl-1)',
              'id-activity-1',
              'Project coordinator (pl-1)'
            ],
            [
              'id-pl-2',
              '',
              '4',
              'Project title (pl-2)',
              'Project description (pl-2)',
              'id-activity-1',
              'Project coordinator (pl-2)'
            ],
            [
              'id-pl-3',
              '4',
              '',
              'Project title (pl-3)',
              'Project description (pl-3)',
              'id-activity-2',
              'Project coordinator (pl-3)'
            ],
            [
              'id-pl-4',
              '',
              '',
              'Project title (pl-4)',
              'Project description (pl-4)',
              'id-activity-2',
              'Project coordinator (pl-4)'
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
          spyOn(activitiesDataSource, 'getItems').and.returnValue([{
            id: 'id-activity-1',
            title: 'Activity 1 description'
          }, {
            id: 'id-activity-2',
            title: 'Activity 2 description'
          }]);
        });

        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });

        it('should return default empty object when invoked without response', function() {
          expect(searchResultMapper.map()).toEqual({
            total: 0,
            markers: []
          });
        });

        it('should convert total to number if it is string', function() {
          var mapped = searchResultMapper.map(testResponses.noData);
          expect(mapped.total).toEqual(jasmine.any(Number));
        });

        it('should map response to object', function() {
          var mapped = searchResultMapper.map(testResponses.dataTwoCountriesTwoRowsEach);

          expect(mapped).toEqual({
            total: 4,
            markers: [
              [{
                id: 'id-pl-1',
                lat: '1',
                lng: '2',
                title: 'Project title (pl-1)',
                description: 'Project description (pl-1)',
                activity: 'Activity 1 description',
                coordinator: 'Project coordinator (pl-1)'
              }, {
                id: 'id-pl-2',
                lat: '3',
                lng: '4',
                title: 'Project title (pl-2)',
                description: 'Project description (pl-2)',
                activity: 'Activity 1 description',
                coordinator: 'Project coordinator (pl-2)'
              }],
              [{
                id: 'id-be-1',
                lat: '5',
                lng: '6',
                title: 'Project title (be-1)',
                description: 'Project description (be-1)',
                activity: 'Activity 2 description',
                coordinator: 'Project coordinator (be-1)'
              }, {
                id: 'id-be-2',
                lat: '7',
                lng: '8',
                title: 'Project title (be-2)',
                description: 'Project description (be-2)',
                activity: 'Activity 2 description',
                coordinator: 'Project coordinator (be-2)'
              }]
            ]
          });
        });

        it('should map response to object omitting those without coordinates', function() {
          var mapped = searchResultMapper.map(testResponses.dataWithMissingCoordinates);

          expect(mapped).toEqual({
            total: 4,
            markers: [
              [{
                id: 'id-pl-1',
                lat: '1',
                lng: '2',
                title: 'Project title (pl-1)',
                description: 'Project description (pl-1)',
                activity: 'Activity 1 description',
                coordinator: 'Project coordinator (pl-1)'
              }]
            ]
          });
        });
      });
    });
  });
});