define(function(require) {
  var ResultsStatsComponent = require('./main.component'),
    ResultStatsComponent = require('app/ce/components/landing-page/results/results-stats/main.component');

  describe('EPLUS Results Stats Component', function() {
    it('should use CE results stats component', function() {
      expect(ResultsStatsComponent).toBe(ResultStatsComponent);
    });
  });
});