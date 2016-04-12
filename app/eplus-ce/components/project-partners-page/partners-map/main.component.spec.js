define(function(require) {
  var PartnersMapComponent = require('./main.component'),
    EfCPartnersMapComponent = require('app/efc/components/project-partners-page/partners-map/main.component');

  describe('Eplus-CE Project Partners Component', function() {
    it('should use EfC partners map component', function() {
      expect(PartnersMapComponent).toBe(EfCPartnersMapComponent);
    });
  });
});