define(function(require) {
  var _ = require('underscore'),

    generate = function() {
      var generated = [],
        count = _.random(50, 1000);

      for (var i = 1; i <= count; i++) {
        var rnd_lat, rnd_lng;
        rnd_lat = 42 + 12 * Math.random();
        rnd_lng = 0 + 40 * Math.random();
        generated.push(['workspace://SpacesStore/d2374110-528d-446c-a0bb-8866574f12b2', rnd_lat, rnd_lng, 'Hanseatic Tradition for VET:Mobility Strategies for Promoting Enterprenership Skills of VET Students', 'More and more VET institutions are willing to arrange international placements and apprenticeships for their students. The ET2020 strategic priority No1 "Making lifelong learning and mobility a re...', 'Strand1: European Remembrance', 'Netherhall Educational Association']);
      }

      return {
        iTotalLength: count,
        aaData: generated
      }
    };

  return {
    generate: generate
  }
});