define(function (require) {
    var $ = require('jquery');
    var MapComponent = require('app/shared/components/mapping/map/extended/main.component');

    var component = new MapComponent({
      initialZoom: 7,
      initialPosition: [53, 17],
      minZoom: 6,
      maxZoom: 14,
      clusterSizeOnMaxZoomLevel: 120,
      boundaryFactor: 0.33
    });

    $('.demo__extended-map').append(component.render().view.el);

    component.initMap();

    component.showMarkers({
        total: 12,
        items: [{
            type: 'cluster',
            itemsCount: 10,
            lat: 54,
            lng: 19
        }, {
            type: 'marker',
            group: 'pl',
            lat: 54,
            lng: 17,
            notAccurate: true,
            id: '1',
            popupContent: 'Content 1'
        }, {
            type: 'marker',
            group: 'pl',
            lat: 54,
            lng: 16,
            notAccurate: false,
            id: '2',
            popupContent: 'Content 2'
        }]
    });
});