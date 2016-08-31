define(function(require) {
  var _ = require('underscore'),
    Backbone = require('backbone');

  return Backbone.Model.extend({
    defaults: {
      keyword: ''
    },

    isDirty: function() {
      return !_.isEmpty(this.get('keyword'));
    },

    toJSON: function() {
      var attrs = this.constructor.__super__.toJSON.call(this),
        serialized = _.assign(attrs, {
        	isSearchBoxDirty: this.isDirty()
        });

      return serialized;
    }
  });
});