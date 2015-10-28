define(function (require) {
  var Widget = require('app/core/widget'),
    MapView = require('./views/mapView'),
    mapView = new MapView;

  return Widget.extend({
    view: mapView,

    showItem: function (projectModel) {
      this.view.showItem(projectModel);
    }
  });
});