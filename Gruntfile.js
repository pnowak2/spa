module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: ['./*.js', 'app/**/*.js', 'main/**/*.js', 'test/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: ['assets/styles/**/*.css']
      },
      lax: {
        options: {
          import: false
        },
        src: ['assets/styles/**/*.css']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: '.',
          paths: {
            app: './app',
            jquery: 'lib/jquery/jquery.min',
            blockUI: 'lib/jquery-blockUI/jquery.blockUI.min',
            underscore: 'lib/underscore/underscore-min',
            backbone: 'lib/backbone/backbone-min',
            mustache: 'lib/mustache.js/mustache.min',
            text: 'lib/text/text',
            select2: 'lib/select2/js/select2.full.min',
            rsvp: 'lib/rsvp/rsvp.min',
            modernizr: 'lib/modernizr/modernizr-custom.min',
            leaflet: 'lib/leaflet/leaflet',
            leafletprunecluster: 'lib/leaflet.prunecluster/dist/PruneCluster',
            leafletfullscreen: 'lib/leaflet.fullscreen/dist/Leaflet.fullscreen',
            leafleteasybutton: 'lib/leaflet.easybutton/dist/easy-button',
            chance: 'lib/chance/chance.min',

            requireLib: 'lib/requirejs/require.min'
          },
          shim: {
            modernizr: {},
            leafletprunecluster: {
              deps: ['leaflet']
            },
            leafletfullscreen: {
              deps: ['leaflet']
            },
            leafleteasybutton: {
              deps: ['leaflet']
            }
          },
          generateSourceMaps: true,
          preserveLicenseComments: false,
          include: "requireLib",
          name: "main/ce.landing-page.main",
          out: "dist/vlr-app.min.js"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('lintjs', ['jshint']);
  grunt.registerTask('lintcss', ['csslint']);

  grunt.registerTask('lint', ['jshint', 'csslint']);
  grunt.registerTask('release', ['jshint', 'requirejs']);
};