define(function(require) {
  var Component = require('app/core/component'),
    ExportLinkView = require('./views/actionsToolbar.view');

  return Component.extend({
    initialize: function() {
      this.view = new ExportLinkView;
      this.listenTo(this.view, 'actionsToolbar:export:click', function () {
      	this.trigger('actionsToolbar:export:click');
      });
    }
  });
});