define(function(require) {
  var Backbone = require('backbone'),
    ResultStatsView = require('./resultStats.view');

  describe('CE Result Stats View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(ResultStatsView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('properties', function() {
      describe('.tagName', function() {
        it('should be div', function() {
          expect(ResultStatsView.prototype.tagName).toEqual('div');
        });
      });

      describe('.className', function() {
        it('should be defined', function() {
          expect(ResultStatsView.prototype.className).toEqual('ce-result-stats');
        });
      });
    });

    describe('creation', function() {
      it('should have empty data object', function() {
        var view = new ResultStatsView();
        expect(view.data).toEqual({});
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        beforeEach(function() {
          spyOn(ResultStatsView.prototype, 'render');
          this.view = new ResultStatsView();
        });

        it('should be defined', function() {
          expect(ResultStatsView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should not throw if called without arguments', function() {
          var self = this;
          expect(function() {
            self.view.update();
          }).not.toThrow();
        });

        it('should store data to instance variable', function() {
          var fakeData = {};
          this.view.update(fakeData);

          expect(this.view.data).toBe(fakeData);
        });

        it('should rerender the view', function() {
          this.view.update();

          expect(this.view.render).toHaveBeenCalled();
        });
      });

      describe('.didClickExportXls()', function() {
        beforeEach(function() {
          this.evt = jasmine.createSpyObj('e', ['preventDefault']);
          this.view = new ResultStatsView();
        });

        it('should be defined', function() {
          expect(ResultStatsView.prototype.didClickExportXls).toEqual(jasmine.any(Function));
        });

        it('should prevent default', function() {
          this.view.didClickExportXls(this.evt);
          expect(this.evt.preventDefault).toHaveBeenCalled();
        });

        it('should trigger export xls event', function() {
          spyOn(ResultStatsView.prototype, 'trigger');

          var view = new ResultStatsView();

          view.didClickExportXls(this.evt);

          expect(view.trigger).toHaveBeenCalledWith('export:xls');
        });
      });

      describe('.shouldShowKeyword()', function() {
        beforeEach(function() {
          this.view = new ResultStatsView();
        });

        it('should be defined', function() {
          expect(ResultStatsView.prototype.shouldShowKeyword).toEqual(jasmine.any(Function));
        });

        it('should return true if advanced search is not dirty and keyword is not empty', function() {
          var fakeData = {
            keyword: 'bar',
            isAdvancedSearchDirty: false
          };

          expect(this.view.shouldShowKeyword(fakeData)).toBe(true);
        });

        it('should return false if advanced search is not dirty and keyword is empty', function() {
          var fakeData = {
            keyword: '',
            isAdvancedSearchDirty: false
          };

          expect(this.view.shouldShowKeyword(fakeData)).toBe(false);
        });

        it('should return false if advanced search is dirty and keyword is not empty', function() {
          var fakeData = {
            keyword: 'the',
            isAdvancedSearchDirty: true
          };

          expect(this.view.shouldShowKeyword(fakeData)).toBe(false);
        });

        it('should return false if advanced search is dirty and keyword is empty', function() {
          var fakeData = {
            keyword: '',
            isAdvancedSearchDirty: true
          };

          expect(this.view.shouldShowKeyword(fakeData)).toBe(false);
        });
      });
    });

    describe('dom', function() {
      it('should be properly defined', function() {
        expect(ResultStatsView.prototype.events).toEqual({
          'click .ce-result-stats__export-xls': 'didClickExportXls'
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ResultStatsView();
        });

        it('should return view object', function() {
          expect(this.view.render()).toBe(this.view);
        });

        describe('without data', function() {
          beforeEach(function() {
            this.view = new ResultStatsView();
            this.view.data = {};

            this.$el = this.view.render().$el;
          });

          it('should be hidden if items count is not greater than zero', function() {
            expect(this.$el.css('display')).toEqual('none');
          });

          describe('XLS Export', function() {
            it('should contain link to xls export', function() {
              expect(this.$el.find('a.ce-result-stats__export-xls')).toHaveText('XLS');
            });

            it('should contain link to xls export with href pointing to #', function() {
              expect(this.$el.find('a.ce-result-stats__export-xls')).toHaveAttr('href', '#');
            });
          });

          describe('Result Stats', function() {
            it('should contain proper results info', function() {
              expect(this.$el).toContainText('Results');
            });
          });
        });

        describe('with data showing keyword', function() {
          beforeEach(function() {
            this.view = new ResultStatsView();
            this.view.data = {
              itemsCount: 124,
              keyword: 'bar',
              isAdvancedSearchDirty: false
            };

            this.$el = this.view.render().$el;
          });

          it('should be visible if items count is greater than zero', function() {
            expect(this.$el.css('display')).toEqual('block');
          });

          describe('Result Stats', function() {
            it('should contain proper results info', function() {
              expect(this.$el).toContainText('124 Results for bar');
            });
          });
        });

        describe('with data without keyword', function() {
          beforeEach(function() {
            this.view = new ResultStatsView();
            this.view.data = {
              itemsCount: 124,
              keyword: 'bar',
              isAdvancedSearchDirty: true
            };

            this.$el = this.view.render().$el;
          });

          it('should be visible if items count is greater than zero', function() {
            expect(this.$el.css('display')).toEqual('block');
          });

          describe('Result Stats', function() {
            it('should contain proper results info', function() {
              expect(this.$el).toContainText('124 Results');
            });
          });
        });
      });
    });
  });
});