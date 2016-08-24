define(function(require) {
  var _ = require('underscore'),
    ProjectItemView = require('./projectItem.view');

  describe('Project Item View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ProjectItemView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      it('.className should be defined', function() {
        expect(ProjectItemView.prototype.className).toEqual('vlr-project-item');
      });
    });

    describe('creation', function() {
      it('should store passed options', function() {
        var fakeOptions = {
          data: {
            foo: 'bar'
          }
        }
        var view = new ProjectItemView(fakeOptions);

        expect(view.options).toEqual(fakeOptions);
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        describe('All Fields Provided', function() {
          beforeEach(function() {
            this.view = new ProjectItemView({
              data: {
                id: 'id-1',
                title: 'Project Title',
                description: 'Project Description',
                year: '2012',
                countries: ['PL', 'BE'],
                goodPractice: true,
                successStory: true
              }
            });

            this.$el = this.view.render().$el;
          });

          it('should return view itself', function() {
            expect(this.view.render()).toBe(this.view);
          });

          describe('Project Title Link', function() {
            it('should contain anchor with proper class name', function() {
              expect(this.$el).toContainElement('a.vlr-project-item__title-link')
            });

            it('should contain proper text', function() {
              expect(this.$el.find('a.vlr-project-item__title-link')).toContainText('Project Title');
            });

            it('should contain proper href', function() {
              expect(this.$el.find('a.vlr-project-item__title-link')).toHaveAttr('href', '');
            });
          });

          describe('Project Description', function() {
            it('should contain project description', function() {
              expect(this.$el.find('.vlr-project-item__description')).toContainText('Project Description');
            });
          });

          describe('Project Year', function() {
            it('should contain badge element', function() {
              expect(this.$el).toContainElement('.vlr-project-item__badge.vlr-project-item__badge--year')
            });

            it('should contain proper text', function() {
              expect(this.$el.find('.vlr-project-item__badge--year')).toContainText('2012');
            });
          });

          describe('Success Story', function() {
            it('should contain badge element', function() {
              expect(this.$el).toContainElement('.vlr-project-item__badge.vlr-project-item__badge--success-story')
            });

            it('should contain proper text', function() {
              expect(this.$el.find('.vlr-project-item__badge--success-story')).toContainText('Success story');
            });
          });

          describe('Good Practice', function() {
            it('should contain badge element', function() {
              expect(this.$el).toContainElement('.vlr-project-item__badge.vlr-project-item__badge--good-practice')
            });

            it('should contain proper text', function() {
              expect(this.$el.find('.vlr-project-item__badge--good-practice')).toContainText('Good practice');
            });
          });
        });
      });
    });
  });
});