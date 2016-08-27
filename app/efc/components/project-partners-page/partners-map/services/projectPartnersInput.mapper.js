define(function(require) {
  var map = function(criteria) {
    criteria = criteria || {};

    if (!criteria.projectId) {
      throw new Error('projectId is mandatory');
    }

    return {
      projectId: criteria.projectId
    };
  };

  return {
    map: map
  };
});