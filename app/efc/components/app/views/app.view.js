define(function(require) {
  var Backbone = require('backbone');

  return Backbone.View.extend({
    initialize: function(options) {
      this.tabSwitcherComponent = options.tabSwitcherComponent;
      this.searchComponent = options.searchComponent;
      this.listComponent = options.listComponent;
      this.pagerComponent = options.pagerComponent;

      this.tabSwitcherComponent.update([{
        title: 'List',
        identifier: 'list'
      }, {
        title: 'Map',
        identifier: 'map'
      }]);

      this.listComponent.update([{
        title: 'hello world'
      }]);

      this.pagerComponent.update({
        totalItems: 100
      });

      this.listenTo(this.searchComponent, 'search:keyword', this.onSearch);
    },

    onSearch: function(searchCriteria) {
      this.listComponent.update([{
        title: searchCriteria.keyword,
        description: searchCriteria.keyword
      }]);
    },

    render: function() {
      $('body').append(this.searchComponent.render().view.el);
      $('body').append(this.tabSwitcherComponent.render().view.el);
      $('body').append(this.listComponent.render().view.el);
      $('body').append(this.pagerComponent.render().view.el);
    }
  });
})