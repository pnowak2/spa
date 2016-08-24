define(function(require) {
	var Component = require('app/core/component'),
    ProjectItemView = require('./views/projectItem.view');

	return Component.extend({
		initialize: function (options) {
			this.view = new ProjectItemView(options);
		}
	});
});