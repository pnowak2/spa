define(function(require) {
  var Mustache = require('mustache'),
    Backbone = require('backbone'),
    tpl = require('text!../templates/export-link.tpl.html');

  return Backbone.View.extend({
    className: 'vlr-export-link',

    events: {
    	'click .vlr-export-link__button': 'didClickExportLink'
    },

    didClickExportLink: function (e) {
    	e.preventDefault();
    	this.trigger('exportLink:click');
    },

    render: function () {
    	this.$el.html(Mustache.render(tpl));
    	
    	return this;
    }
  });
});