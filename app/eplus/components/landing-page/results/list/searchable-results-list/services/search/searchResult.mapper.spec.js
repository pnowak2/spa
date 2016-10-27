define(function(require) {
  var searchResultMapper = require('./searchResult.mapper'),
    testResponse = {
      "fakeRealResponse": {
        iTotalRecords: '2',
        aaData: [
          [
            'workspace://123',
            'Project title',
            'Project description',
            '',
            '2015',
            'PL|BE',
            'true',
            'false'
          ],
          [
            'workspace://223',
            'Project title 2',
            'Project description 2',
            '',
            '2016',
            'ES|RO',
            'false',
            'true'
          ]
        ]
      },
      "fakeRealResponsewithWrongCountry": {
        iTotalRecords: '1',
        aaData: [
          [
            'workspace://123',
            'Project title',
            'Project description',
            '',
            '2015',
            'PL|xx',
            'true',
            'false'
          ]
        ]
      },
      "fakeRealResponseWithoutCountry": {
        iTotalRecords: '1',
        aaData: [
          [
            'workspace://123',
            'Project title',
            'Project description',
            '',
            '2015',
            '',
            'true',
            'false'
          ]
        ]
      }
    };

  describe('EPLUS Search Result Mapper', function() {

    describe('creation', function() {
      it('should be defined', function() {
        expect(searchResultMapper).toEqual(jasmine.any(Object));
      });
    });

    describe('api', function() {
      describe('.map()', function() {
        it('should be defined', function() {
          expect(searchResultMapper.map).toEqual(jasmine.any(Function));
        });
      });

      describe('Mapping response', function() {

        beforeEach(function() {

          this.fakeResponse = {
            "iTotalRecords": "4",
            "aaData": []
          };
        });

        it('should return default empty object when invoked without response', function() {
          expect(searchResultMapper.map()).toEqual({
            "total": 0,
            "items": []
          });
        });

        it('should total be a number', function() {
          var response = searchResultMapper.map(this.fakeResponse);
          expect(response.total).toEqual(jasmine.any(Number));
        });

        it('should map total', function() {
          expect(searchResultMapper.map(this.fakeResponse)).toEqual(jasmine.objectContaining({
            "total": 4
          }));
        });

        describe('Mapping items property', function() {
          it('should be an array', function() {
            var response = searchResultMapper.map(this.fakeResponse);
            expect(response.items).toEqual(jasmine.any(Array));
          });

          it('should map item id property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].id).toEqual('workspace://123');
          });

          it('should map item title property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].title).toEqual('Project title');
          });

          it('should map item title property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].description).toEqual('Project description');
          });

          it('should map item startYear property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].startYear).toEqual('2015');
          });

          it('should map item successStory property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].goodPractice).toEqual(true);
          });

          it('should map item successStory property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].successStory).toEqual(false);
          });

          it('should map item country property', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponse);
            expect(response.items[0].countries).toEqual([{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'be',
              fullName: 'Belgium'
            }]);
          });

          it('should map item country property if the country does not exists', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponsewithWrongCountry);
            expect(response.items[0].countries).toEqual([{
              code: 'pl',
              fullName: 'Poland'
            }, {
              code: 'xx',
              fullName: ''
            }]);
          });

          it('should map item country property if there is no country', function() {
            var response = searchResultMapper.map(testResponse.fakeRealResponseWithoutCountry);
            expect(response.items[0].countries).toEqual([]);
          });
        });

      });
    });
  });
});