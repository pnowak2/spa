define(function(require) {
  var map = function(response) {
    var total,
      coordinator = {},
      partners = [];

    response = response || {};
    total = response.total || 0;
    coordinator = response.coordinator || {};
    partners = response.partners || [];

    return {
      total: total,
      coordinator: coordinator,
      partners: partners
    };
  };

  return {
    map: map
  };
});