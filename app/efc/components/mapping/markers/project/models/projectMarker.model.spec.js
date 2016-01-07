define(function(require) {
  var ProjectMarkerModel = require('./projectMarker.model');

  describe('Project Marker Model', function() {
    describe('type', function() {
      it('should be of model', function() {
        expect(ProjectMarkerModel.prototype).toEqual(jasmine.any(Backbone.Model));
      });
    });

    describe('defaults', function() {
      it('should be defined with proper values', function() {
        expect(ProjectMarkerModel.prototype.defaults).toEqual({
          id: '',
          lat: null,
          lng: null,
          title: '',
          activity: '',
          coordinator: '',
          summary: ''
        });
      });
    });
  });
});