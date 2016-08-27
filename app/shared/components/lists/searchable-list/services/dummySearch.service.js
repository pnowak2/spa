define(function(require) {
  var RSVP = require('rsvp');

  return {
    search: function() {
      return (
        new RSVP.Promise(function(resolve, reject) {
          resolve();
        })
      );
    }
  };
});