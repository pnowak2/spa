define(function (require) {
  var programmeDatasource = require('app/eplus/data/programmes.datasource');

  describe('EPLUS programmeDataSource', function () {
    it('should contain Erasmus+ entry', function () {
      expect(programmeDatasource.getItems()).toContain({
        id: '31046216',
        title: 'Erasmus+'
      });
    });
  });
});