define(function(require) {
  var $ = require('jquery'),
    Backbone = require('backbone'),
    ResultsListView = require('app/widgets/results/results-list/views/resultsListView'),
    ResultItemView = require('app/widgets/results/results-list/views/resultItemView'),
    ResultsCollection = require('app/widgets/results/results-list/collections/resultsCollection'),
    ResultModel = require('app/widgets/results/results-list/models/resultModel');

  describe('Results List View', function() {
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
          expect(ResultsListView.prototype.className).toEqual('efc-results-list');
        });
      });
    });

    describe('creation', function() {
      it('should have default collection defined', function() {
        var view = new ResultsListView;
        expect(view.collection).toEqual(jasmine.any(Backbone.Collection));
      });
    });

    describe('api', function() {
      describe('.update()', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.update).toEqual(jasmine.any(Function));
        });

        it('should reset collection with passed data', function() {
          var view = new ResultsListView,
            fakeData = {};

          spyOn(view.collection, 'reset');

          view.update(fakeData);

          expect(view.collection.reset).toHaveBeenCalledWith(fakeData);
        });
      });

      describe('.createResultItemViews()', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.createResultItemViews).toEqual(jasmine.any(Function));
        });

        it('should return array of views initialized with colletion models', function() {
          var resultsListView = new ResultsListView,
            fakeModel = new ResultModel(),
            fakeCollection = new ResultsCollection([fakeModel]),
            resultItemViews;

          resultsListView.collection = fakeCollection;
          resultItemViews = resultsListView.createResultItemViews();

          expect(resultItemViews.length).toBe(1);
          expect(resultItemViews[0]).toEqual(jasmine.any(ResultItemView));
          expect(resultItemViews[0].model).toBe(fakeModel);
        });
      });

      describe('.getTableBodyContainer()', function() {
        it('should be defined', function() {
          expect(ResultsListView.prototype.getTableBodyContainer).toEqual(jasmine.any(Function));
        });

        it('should return jquery dom object', function() {
          var view = new ResultsListView,
            fakeContainer = {},
            foundContainer;

          spyOn(view.$el, 'find').and.returnValue(fakeContainer);

          foundContainer = view.getTableBodyContainer();

          expect(view.$el.find).toHaveBeenCalledWith('tbody');
          expect(foundContainer).toEqual(fakeContainer);
        });
      });
    });

    describe('events', function() {
      describe('custom', function() {
        it('should render on collection reset', function() {
          spyOn(ResultsListView.prototype, 'render');

          var view = new ResultsListView

          view.collection.trigger('reset');

          expect(view.render).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        beforeEach(function() {
          this.view = new ResultsListView
          this.$el = this.view.render().$el;
        });

        it('should return view itself', function() {
          expect(this.view.render()).toBe(this.view);
        });

        it('should render table', function() {
          expect(this.$el).toContainElement('table');
        });

        it('should render 4 column headers with proper titles', function() {
          expect(this.$el.find('table > thead > tr > th')).toHaveLength(4);
          expect(this.$el.find('th').first()).toContainText('Title');
          expect(this.$el.find('th').eq(1)).toContainText('Description');
          expect(this.$el.find('th').eq(2)).toContainText('Start Year');
          expect(this.$el.find('th').last()).toContainText('Countries');
        });

        it('should render table body', function() {
          expect(this.$el.find('table')).toContainElement('tbody');
        });

        it('should append to table body result items', function() {
          var resultsListView = new ResultsListView,
            fakeTableBodyContainer = jasmine.createSpyObj('tableBodyContainer', ['append']),
            fakeItemView = new ResultItemView({
              model: new ResultModel
            });

          spyOn(fakeItemView, 'render').and.callThrough();
          spyOn(ResultsListView.prototype, 'getTableBodyContainer').and.returnValue(fakeTableBodyContainer);
          spyOn(ResultsListView.prototype, 'createResultItemViews').and.returnValue([fakeItemView]);

          resultsListView.render();

          expect(fakeItemView.render).toHaveBeenCalled();
          expect(fakeTableBodyContainer.append).toHaveBeenCalledWith(fakeItemView.el);
        });
      });
    });

  });
});