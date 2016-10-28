define(function (require) {
    var $ = require('jquery');
    var ResultStatsComponent = require('app/ce/components/landing-page/results/results-stats/main.component');

    var component = new ResultStatsComponent();

    component.update({
        itemsCount: 100,
        criteria: {
            keyword: 'foo'
        }
    });

    component.on('export:xls', function() {
        alert('Export to Xls was clicked !');
    });

    $('.demo__ce-result-stats').append(component.render().view.el);
});
