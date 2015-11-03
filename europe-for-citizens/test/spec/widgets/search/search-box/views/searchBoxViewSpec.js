define(function(require) {

  var Backbone = require('backbone'),
    constants = require('app/core/constants'),
    eventBus = require('app/widgets/search/search-box/events/eventBus'),
    SearchBoxView = require('app/widgets/search/search-box/views/searchBoxView'),
    SearchBoxModel = require('app/widgets/search/search-box/models/searchBoxModel');

  describe('SearchBox View', function() {
    describe('type', function() {
      it('should be of view', function() {
        expect(SearchBoxView.prototype).toEqual(jasmine.any(Backbone.View));
      });
    });

    describe('creation', function() {
      it('should have model defined', function() {
        expect(new SearchBoxView().model).toEqual(jasmine.any(SearchBoxModel));
      });
    });

    describe('properties', function() {
      it('.tagName', function() {
        expect(SearchBoxView.prototype.tagName).toEqual('div');
      });

      it('.className', function() {
        expect(SearchBoxView.prototype.className).toEqual('efc-searchbox');
      });
    });

    describe('api', function() {
      describe('.didClickSearchButton()', function() {
        beforeEach(function() {
          spyOn(SearchBoxView.prototype, 'requestSearch');

          this.fakeEventWithOtherKey = {
            preventDefault: jasmine.createSpy(),
            which: 35
          };
        });

        it('should be defined', function() {
          expect(SearchBoxView.prototype.didClickSearchButton).toEqual(jasmine.any(Function));
        });

        it('should prevent default event action', function() {
          SearchBoxView.prototype.didClickSearchButton(this.fakeEventWithOtherKey);
          expect(this.fakeEventWithOtherKey.preventDefault).toHaveBeenCalled();
        });

        it('should call search method', function() {
          SearchBoxView.prototype.didClickSearchButton(this.fakeEventWithOtherKey);
          expect(SearchBoxView.prototype.requestSearch).toHaveBeenCalled();
        });
      });

      describe('.didPressKey()', function() {
        beforeEach(function() {
          spyOn(SearchBoxView.prototype, 'requestSearch');

          this.fakeEventWithEnter = {
            preventDefault: jasmine.createSpy(),
            which: constants.dom.keys.ENTER
          };

          this.fakeEventWithOtherKey = {
            preventDefault: jasmine.createSpy(),
            which: 35
          };
        });

        it('should be defined', function() {
          expect(SearchBoxView.prototype.didPressKey).toEqual(jasmine.any(Function));
        });

        it('should prevent default event action', function() {
          SearchBoxView.prototype.didPressKey(this.fakeEventWithEnter);
          expect(this.fakeEventWithEnter.preventDefault).toHaveBeenCalled();
        });

        it('should call search method when enter key pressed', function() {
          SearchBoxView.prototype.didPressKey(this.fakeEventWithEnter);
          expect(SearchBoxView.prototype.requestSearch).toHaveBeenCalled();
        });

        it('should not call search method when other key pressed', function() {
          SearchBoxView.prototype.didPressKey(this.fakeEventWithOtherKey);
          expect(SearchBoxView.prototype.requestSearch).not.toHaveBeenCalled();
        });
      });

      describe('.requestSearch()', function() {
        it('should be defined', function() {
          expect(SearchBoxView.prototype.requestSearch).toEqual(jasmine.any(Function));
        });

        it('should set proper keyword on model', function() {
          var view = new SearchBoxView,
            fakeFormData = {};

          spyOn(view.model, 'set');
          spyOn(view, 'getFormData').and.returnValue(fakeFormData);

          view.requestSearch();

          expect(view.model.set).toHaveBeenCalled();
          expect(view.model.set.calls.count()).toBe(1);
          expect(view.model.set.calls.mostRecent().args[0]).toBe(fakeFormData);
        });
      });

      describe('.getFormData()', function() {
        it('should be defined', function() {
          expect(SearchBoxView.prototype.getFormData).toEqual(jasmine.any(Function));
        });

        it('should get data from form and return as object', function() {
          var view = new SearchBoxView;

          view.keywordInput = {
            val: function() {
              return 'kwrd';
            }
          };

          expect(view.getFormData()).toEqual({
            keyword: 'kwrd'
          });
        });
      });

      describe('.didModelChange()', function() {
        it('should be defined', function() {
          expect(SearchBoxView.prototype.didModelChange).toEqual(jasmine.any(Function));
        });

        it('should trigger event bus with serialized model', function() {
          var view = new SearchBoxView,
            fakeModelJSON = {}

          spyOn(eventBus, 'trigger');
          spyOn(view.model, 'toJSON').and.returnValue(fakeModelJSON);

          view.didModelChange();

          expect(eventBus.trigger).toHaveBeenCalledWith('search:keyword', fakeModelJSON);
          expect(eventBus.trigger.calls.mostRecent().args[1]).toBe(fakeModelJSON);
        });
      });
    });

    describe('events', function() {
      describe('dom', function() {
        it('should be properly defined', function() {
          expect(SearchBoxView.prototype.events).toEqual({
            'click button': 'didClickSearchButton',
            'keypress input': 'didPressKey'
          });
        });
      });

      describe('model', function() {
        it('should listen to changes', function() {
          spyOn(SearchBoxView.prototype, 'didModelChange');

          var view = new SearchBoxView;
          view.model.trigger('change');

          expect(SearchBoxView.prototype.didModelChange).toHaveBeenCalled();
        });
      });
    });

    describe('rendering', function() {
      describe('.render()', function() {
        it('should return view object', function() {
          var view = new SearchBoxView;
          expect(view.render()).toBe(view);
        });

        it('should set keyword input property', function() {
          var view = new SearchBoxView,
            fakeKeywordInput = {};

          spyOn(view.$el, 'find').and.callFake(function(selector) {
            if (selector === 'input') {
              return fakeKeywordInput;
            }
          });

          expect(view.keywordInput).toBeUndefined();

          view.render();

          expect(view.keywordInput).toBe(fakeKeywordInput);
        });

        it('should render proper markup', function() {
          var view = new SearchBoxView;

          view.render();

          expect(view.$el).toContainElement('input');
          expect(view.$el).toContainElement('button');
        });
      });
    });
  });

});