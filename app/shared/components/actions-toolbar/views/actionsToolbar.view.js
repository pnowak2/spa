define(function(require) {
  var Mustache = require('mustache'),
    Backbone = require('backbone'),
    tpl = require('text!../templates/actions-toolbar.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-actions-toolbar',

    events: {
    	'click .vlr-actions-toolbar__export': 'didClickExportLink'
    },

    didClickExportLink: function (e) {
    	e.preventDefault();
    	this.trigger('actionsToolbar:export:click');
    },

    render: function () {
    	this.$el.html(Mustache.render(tpl));
    	
    	return this;
    }
  });
});