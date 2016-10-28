define(function (require) {
    var $ = require('jquery');
    var MapComponent = require('app/shared/components/mapping/map/simple/main.component');

    var component = new MapComponent({
        initialZoom: 2,
        initialPosition: [53, 17],
        minZoom: 1,
        maxZoom: 14,
        zoomClusterSizeTrigger: 5,
        countryClusterSize: 900,
        localClusterSize: 120
    });

    $('.demo__simple-map').append(component.render().view.el);

    component.initMap();

    component.showMarkers({
        total: 3,
        markers: [
            // Fist cluster
            [{
                id: 1,
                lat: 51,
                lng: 27,
                popupContent: 'Im a marker 1!'
            },
            {
                id: 2,
                lat: 52,
                lng: 28,
                popupContent: 'Im a marker 2!'
            }],
            // Second cluster
            [{
                id: 3,
                lat: 53,
                lng: 29,
                popupContent: 'Im a marker 3!'
            }]
        ]
    });
});