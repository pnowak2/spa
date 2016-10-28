define(function (require) {
    var $ = require('jquery');
    var ResultsListComponent = require('app/efc/components/landing-page/results/list/results-list/main.component');

    var component = new ResultsListComponent();

    component.update([{
        id: '1',
        title: 'Sample title 1',
        description: 'Sample description 1',
        callYear: 2014,
        countries: [{
            code: 'pl',
            fullName: 'Poland'
        }, {
            code: 'be',
            fullName: 'Belgium'
        }]
    }, {
        id: '2',
        title: 'Sample title 2',
        description: 'Sample description 2',
        callYear: 2016,
        countries: [{
            code: 'ro',
            fullName: 'Romania'
        }, {
            code: 'es',
            fullName: 'Spain'
        }]
    },
    {
        id: '..',
        title: 'Etc..',
        description: 'Etc..',
        callYear: 2016,
        countries: [{
            code: 'uk',
            fullName: 'United Kingdom'
        }]
    }]);

    $('.demo__efc-results-list').append(component.render().view.el);
});
