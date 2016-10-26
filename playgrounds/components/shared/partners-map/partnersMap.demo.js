define(function (require) {
    var $ = require('jquery');
    var PartnersMapComponent = require('app/shared/components/mapping/partners-map/main.component');

    var component = new PartnersMapComponent();

    $('.demo__partners-map').append(component.render().view.el);

    component.initMap();

    component.showMarkers({
        total: 3,
        coordinator: {
            id: 99,
            lat: 50,
            lng: 26,
            name: 'EfC Coordinator',
            role: 'Organisation Role',
            address: 'Organisation Address',
            website: 'www.cabron.es/',
            notAccurate: true
        },
        partners:
        [{
            id: 1,
            lat: 51,
            lng: 27,
            name: 'EfC Partner 1',
            role: 'Organisation Role',
            address: 'Organisation Address',
            website: 'www.cabron.es/',
            notAccurate: true
        },
        {
            id: 2,
            lat: 52,
            lng: 28,
            name: 'EfC Partner 2',
            role: 'Organisation Role',
            address: 'Organisation Address',
            website: 'www.cabron.es/',
            notAccurate: true
        }]

    });
});