define(function(require) {
  var Backbone = require('backbone'),
    ProjectMarkerView = require('./projectMarker.view'),
    ProjectMarkerModel = require('../models/projectMarker.model');

  describe('Project Marker View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ProjectMarkerView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.className should be defined', function() {
        expect(ProjectMarkerView.prototype.className).toEqual('efc-marker-bubble');
      });
    });

    describe('creation', function() {
      it('should have model defined', function() {
        var view = new ProjectMarkerView;

        expect(view.model).toEqual(jasmine.any(ProjectMarkerModel));
      });

      it('should initialize model with marker data', function() {
        spyOn(ProjectMarkerModel.prototype, 'initialize');

        var fakeMarkerData = {},
          view = new ProjectMarkerView({
            markerData: fakeMarkerData
          });

        expect(view.model.initialize).toHaveBeenCalledWith(jasmine.objectContaining(fakeMarkerData));
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ProjectMarkerView({
            markerData: {
              id: '52',
              lat: 1,
              lng: 2,
              title: 'Project Title',
              activity: 'Project Activity',
              coordinator: 'Project Coordinator',
              summary: 'Project Summary'
            }
          });

          this.view.render();
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render bubble properties', function() {
          expect(this.view.$el).toContainHtml('Project Title');
          expect(this.view.$el).toContainHtml('Project Activity');
          expect(this.view.$el).toContainHtml('Project Coordinator');
          expect(this.view.$el).toContainHtml('Project Summary');
        });

        it('should render link to project details', function() {
          var link = this.view.$el.find('.efc-marker-bubble__more-link');
          expect(link).toHaveAttr('href', '/programmes/europe-for-citizens/projects/efc-project-details-page/?nodeRef=52');
          expect(link).toHaveAttr('target', '_blank');
          expect(link).toContainText('Show project card');
        });
      });
    });
  });
});