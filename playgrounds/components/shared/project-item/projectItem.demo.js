define(function (require) {
  var $ = require('jquery');
  var ProjectItemComponent = require('app/shared/components/other/project-item/main.component');

  var component = new ProjectItemComponent({
    data: {
      title: 'Community Oriented Art and Social Transformation',
      description: 'The proposed 2-year project, Beyond Front@: Bridging New Territories, will employ dance-related activities to build physical, social and creative bridges between: 1. dance artists in big and small...',
      year: 2016,
      successStory: true,
      goodPractice: true
    }
  });

  $('.demo__project-item').append(component.render().view.el);
});