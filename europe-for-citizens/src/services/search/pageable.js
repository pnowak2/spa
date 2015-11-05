define(function(require) {
  var _ = require('underscore'),
    Pageable = function() {}

  _.extend(Pageable, {
    defaults: {
      page: 1,
      pageSize: 10
    },

    create: function(criteria) {
      var pageable = _.extend({}, this.defaults, criteria);

      // return new Pageable({
      //   iDisplayStart: (pageable.page - 1) * pageable.pageSize,
      //   iDisplayLength: pageable.pageSize
      // });
      return {
        iDisplayStart: (pageable.page - 1) * pageable.pageSize,
        iDisplayLength: pageable.pageSize
      }
    }
  });

  return Pageable;
});