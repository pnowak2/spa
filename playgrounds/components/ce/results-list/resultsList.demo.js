define(function (require) {
    var $ = require('jquery');
    var ResultsListComponent = require('app/ce/components/landing-page/results/list/results-list/main.component');

    var component = new ResultsListComponent();

    component.update([{
        id: '1',
        title: 'Sample title 1',
        description: 'Sample description 1',
        startYear: 2014,
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
        startYear: 2016,
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
        startYear: 2016,
        countries: [{
            code: 'uk',
            fullName: 'United Kingdom'
        }]
    }]);

    $('.demo__ce-results-list').append(component.render().view.el);
});
