define(function (require) {
    var $ = require('jquery');
    var ResultsMapComponent = require('app/efc/components/landing-page/results/map/results-map/main.component');

    var component = new ResultsMapComponent();

    $('.demo__efc-results-map').append(component.render().show().view.el);

    component.initMap();

    // perform search by keyword and display results with results stats and pager
    component.onSearchRequest({
        keyword: 'a'
    });

});
