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
            lat: 54,
            lng: 19,
            itemsCount: 10
        }, {
            type: 'marker',
            lat: 54,
            lng: 17,
            id: '1',
            group: 'pl',
            popupContent: 'Content 1',
            notAccurate: true
        }, {
            type: 'marker',
            lat: 54,
            lng: 16,
            id: '2',
            group: 'pl',
            popupContent: 'Content 2',
            notAccurate: false
        }]
    });
});