define(function(require) {
  var Component = require('app/core/component'),
    ExportLinkView = require('./views/exportLink.view');

  return Component.extend({
    initialize: function() {
      this.view = new ExportLinkView;
      this.listenTo(this.view, 'exportLink:click', function () {
      	this.trigger('exportLink:click');
      });
    }
  });
});