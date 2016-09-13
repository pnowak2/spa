define(function(require) {
  var Backbone = require('backbone'),
    ResultsListView = require('./resultsList.view');

  describe('CE Results List View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ResultsListView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(ResultsListView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.className).toEqual('ce-results-list');
        });
      });
    });

    describe('creation', function() {
      it('should have empty data object', function() {
        var view = new ResultsListView();
        expect(view.data).toEqual({});
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        beforeEach(function() {
          spyOn(ResultsListView.prototype, 'render');
          this.view = new ResultsListView();
        });

        it('should be defined', function() {
          expect(ResultsListView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.view.update();
          }).not.toThrow();
        });

        it('should store items to instance variable', function() {
          var fakeItems = [{}, {}];
          this.view.update(fakeItems);

          expect(this.view.items).toBe(fakeItems);
        });

        it('should rerender the view', function() {
          this.view.update();

          expect(this.view.render).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ResultsListView();
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        describe('without data items', function() {
          beforeEach(function() {
            this.view = new ResultsListView();
            this.$el = this.view.render().$el;
          });

          it('should render no data placeholder', function() {
            expect(this.$el.find('.ce-results-list__no-data')).toContainText('No results');
          });
        });

        describe('with data items', function() {
          beforeEach(function() {
            this.view = new ResultsListView();
            this.view.render();

            this.view.update([{
              id: 'id-1',
              title: 'Sample Title 1',
              successStory: true,
              description: 'Sample Description 1',
              startYear: 'Sample Start Year 1',
              countries: [{
                code: 'pl',
                fullName: 'Poland'
              }, {
                code: 'be',
                fullName: 'Belgium'
              }]
            }, {
              id: 'id-2'
            }]);
          });

          describe('Table layout', function() {
            it('should not render no data placeholder', function() {
              expect(this.view.$el).not.toContainElement('.ce-results-list__no-data');
            });

            it('should render table', function() {
              expect(this.view.$el).toContainElement('table');
            });

            it('should render 4 column headers with proper titles', function() {
              expect(this.view.$el.find('table > thead > tr > th')).toHaveLength(4);
            });

            it('should render title column header', function() {
              expect(this.view.$el.find('th').eq(0)).toHaveText('Project Title');
            });

            it('should render description column header', function() {
              expect(this.view.$el.find('th').eq(1)).toHaveText('Description');
            });

            it('should render start year column header', function() {
              expect(this.view.$el.find('th').eq(2)).toHaveText('Start Year');
            });

            it('should render countries column header', function() {
              expect(this.view.$el.find('th').eq(3)).toHaveText('Countries');
            });
          });

          describe('Table rows with data', function() {
            it('should render 2 rows with data', function() {
              expect(this.view.$el.find('table > tbody > tr')).toHaveLength(2);
            });

            describe('First Row With Data', function() {
              beforeEach(function() {
                this.$tr = this.view.$el.find('tr').eq(1);
              });

              describe('First Column', function() {
                beforeEach(function() {
                  this.$th = this.$tr.find('th').first();
                });

                it('should contain link to result card', function() {
                  expect(this.$th).toContainElement('a');
                });

                it('should contain link to result card with proper text', function() {
                  expect(this.$th.find('a')).toHaveText('Sample Title 1');
                });

                it('should contain link to result card with proper url', function() {
                  expect(this.$th.find('a')).toHaveAttr('href', '/programmes/creative-europe/projects/ce-project-details-page/?nodeRef=id-1');
                });

                it('should contain success story badge', function() {
                  expect(this.$th).toContainText('Success Story');
                });
              });

              describe('Second Column', function() {
                beforeEach(function() {
                  this.$td = this.$tr.find('td').eq(0);
                });

                it('should contain description', function() {
                  expect(this.$td).toHaveText('Sample Description 1');
                });
              });

              describe('Third Column', function() {
                beforeEach(function() {
                  this.$td = this.$tr.find('td').eq(1);
                });

                it('should contain year', function() {
                  expect(this.$td).toHaveText('Sample Start Year 1');
                });
              });

              describe('Fourth Column', function() {
                beforeEach(function() {
                  this.$td = this.$tr.find('td').eq(2);
                });

                it('should contain countries elements', function() {
                  expect(this.$td.find('.flag')).toHaveLength(2);
                });

                it('should contain proper flag class names on flag elements', function() {
                  expect(this.$td.find('.flag').eq(0)).toHaveClass('pl');
                  expect(this.$td.find('.flag').eq(1)).toHaveClass('be');
                });

                it('should contain proper titles for each flag elements', function() {
                  expect(this.$td.find('.flag').eq(0)).toHaveAttr('title', 'Poland');
                  expect(this.$td.find('.flag').eq(1)).toHaveAttr('title', 'Belgium');
                });
              });
            });
          });
        });
      });
    });
  });
});