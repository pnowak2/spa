define(function(require) {
	var Component = require('app/core/component'), 
	PopupComponent = require('./main.component'), 
	PopupView = require('./views/popup.view');

	describe('Popup Component', function() {
		describe('type', function() {
			it('should be of component', function() {
				expect(PopupComponent.prototype)
						.toEqual(jasmine.any(Component));
			});
		});

		describe('creation', function() {
			it('should be initialized with proper view', function() {
				var component = new PopupComponent({
					type : 'efc-project'
				});
				expect(component.view).toEqual(jasmine.any(PopupView));
			});

			it('should pass popup data to view', function() {
				spyOn(PopupView.prototype, 'initialize');

				var fakeOptions = {
					type : 'efc-project',
					data : {}
				}, component = new PopupComponent(fakeOptions);

				expect(component.view.initialize).toHaveBeenCalledWith(fakeOptions);

			});
		});
	});
});