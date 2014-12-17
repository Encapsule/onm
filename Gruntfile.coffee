
module.exports = (grunt) ->

    configObject =
        pkg: grunt.file.readJSON("package.json")

        coffee:
            compile:
                files:
                    'lib/onm-model.js': 'src/onm-model.coffee'
                    'lib/onm-address.js': 'src/onm-address.coffee'
                    'lib/onm-store.js': 'src/onm-store.coffee'
                    'lib/onm-namespace.js': 'src/onm-namespace.coffee'
                    'lib/onm-address-store.js': 'src/onm-address-store.coffee'
                    'lib/impl/onm-address-token.js': 'src/impl/onm-address-token.coffee'

                    # legacy
                    'lib/impl/onm-address-token-resolver.js': 'src/impl/onm-address-token-resolver.coffee'

                    'lib/impl/onm-component-resolver.js': 'src/impl/onm-component-resolver.coffee'
                    'lib/impl/onm-namespace-resolver.js': 'src/impl/onm-namespace-resolver.coffee'
                    'lib/impl/onm-namespace-resolver-impl.js': 'src/impl/onm-namespace-resolver-impl.coffee'

                    'lib/impl/onm-store-reifier.js': 'src/impl/onm-store-reifier.coffee'
                    'lib/lib-javascript.js': 'src/lib-javascript.coffee'

        jshint:
            options: {}
            files: [ '*.js', './lib/*.js', './lib/**/*.js' ]


        mochaTest:
            options:
                reporter: 'spec'
                checkLeaks: true
 
            src: [ 'test/test-onm.js' ]

        clean: [ 'lib' ]

    grunt.initConfig configObject

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-mocha-test"
    grunt.loadNpmTasks "grunt-contrib-jshint"

    grunt.registerTask "test", [ "mochaTest" ]
    grunt.registerTask "default", [ "clean", "coffee:compile", "test" ]
