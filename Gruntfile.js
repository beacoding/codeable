//TODO: Finish gruntfile and npm install modules

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // concat: {
    //   clientjs: {
    //     src: ['public/dist/bundle.js'],
    //     dest: 'public/deploy/bundle.js',
    //   },
    //   // libjs: {
    //   //   src: ['public/lib/jquery.js', 'public/lib/underscore.js', 'public/lib/backbone.js', 'public/lib/handlebars.js'],
    //   //   dest: 'public/deploy/libbuild.js'
    //   // }
    // },

    concat: {
      css: {
        src: ['public/test/stylesheets/bootstrap.css', 'public/test/stylesheets/flexboxgrid.css', 'public/test/stylesheets/style.css','public/test/stylesheets/codemirror.css','public/test/stylesheets/codemirror-themes/*.css','public/test/stylesheets/doc_brython.css'],
        dest: 'public/deploy/style.css'
      }
    }

    clean: ['public/deploy/*.css'],

    // nodemon: {
    //   dev: {
    //     script: 'server.js'
    //   }
    // },

    // uglify: {
    //   my_target: {
    //     files: {
    //       'public/deploy/bundle.min.js': ['public/deploy/bundle.js']
    //     }
    //   }
    // },

    // eslint: {
    //   target: [
    //     // Add list of files to lint here

    //   ]
    // },

    // cssmin: {
    //   options: {
    //     shorthandCompacting: false,
    //     roundingPrecision: -1
    //   },
    //   target: {
    //     files: {
    //       'public/deploy/style.css': [
    //       'public/test/stylesheets/bootstrap.css', 
    //       'public/test/stylesheets/flexboxgrid.css', 
    //       'public/test/stylesheets/style.css',
    //       'public/test/stylesheets/codemirror.css',
    //       'public/test/stylesheets/codemirror-themes/*.css',
    //       'public/test/stylesheets/doc_brython.css'
    //       ]
    //     }
    //   }
    // }

    // watch: {
    //   scripts: {
    //     files: [
    //       'public/client/**/*.js',
    //       'public/lib/**/*.js',
    //     ],
    //     tasks: [
    //       'concat',
    //       'uglify'
    //     ]
    //   },
    //   css: {
    //     files: 'public/*.css',
    //     tasks: ['cssmin']
    //   }
    // },


    // shell: {
    //   prodServer: {
    //     command: [
    //       'git push live master'
    //     ].join('&&')
    //   }
    // },
  });

  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-eslint');
  // grunt.loadNpmTasks('grunt-mocha-test');
  // grunt.loadNpmTasks('grunt-shell');
  // grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // grunt.registerTask('server-dev', function (target) {
  //   grunt.task.run([ 'nodemon', 'watch' ]);
  // });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('build', [
    'clean',
    'concat'
  ]);

  // grunt.registerTask('upload', function(n) {
  //   if (grunt.option('prod')) {
  //     grunt.task.run(['shell']);
  //     // add your production server task here
  //   } else {
  //     grunt.task.run([ 'server-dev' ]);
  //   }
  // });

  // grunt.registerTask('deploy', function(n) {
  //   // add your deploy tasks here
  //   if (grunt.option('prod')) {
  //     grunt.task.run([
  //       'eslint',
  //       'test',
  //       'build',
  //       'server-dev'
  //     ]);
  //   } else {
  //     grunt.task.run([
  //       'eslint',
  //       'test',
  //       'build',
  //       'server-dev'
  //     ]);
  //   }
  // });


};
