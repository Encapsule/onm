
module.exports = (grunt) ->

    configObject =
        pkg: grunt.file.readJSON("package.json")

        coffee:
            compile:
                files:
                    # API modules
                    # ============================================================================
                    'lib/onm-model.js': 'src/onm-model.coffee'
                    'lib/onm-address.js': 'src/onm-address.coffee'
                    'lib/onm-store.js': 'src/onm-store.coffee'
                    'lib/onm-namespace.js': 'src/onm-namespace.coffee'
                    'lib/onm-address-store.js': 'src/onm-address-store.coffee'

                    # API sub-modules
                    'lib/model/onm-model-details.js': 'src/model/onm-model-details.coffee'
                    'lib/address/onm-address-details.js': 'src/address/onm-address-details.coffee'

                    # Common modules
                    # ============================================================================

                    'lib/common/onm-class-registry.js': 'src/common/onm-class-registry.coffee'
                    'lib/common/onm-util-functions.js': 'src/common/onm-util-functions.coffee'
                    'lib/common/onm-intrinsic-data-models.js': 'src/common/onm-intrinsic-data-models.coffee'

                    # onm core modules
                    # ============================================================================

                    # DAOS - Data-Addressable Object Store
                    # ----------------------------------------------------------------------------

                    # JNSP - Journal Notification Stream Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/jnsp/onm-store-reifier.js': 'src/core/jnsp/onm-store-reifier.coffee'

                    # RASP - Resource Address Space Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/rasp/onm-address-token.js': 'src/core/rasp/onm-address-token.coffee'


                    # RISP - Resource Identifier String Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/risp/onm-xri-processor.js': 'src/core/risp/onm-xri-processor.coffee'
                    'lib/core/risp/generate/onm-xri-generate.js': 'src/core/risp/generate/onm-xri-generate.coffee'
                    'lib/core/risp/generate/onm-xri-generate-path.js': 'src/core/risp/generate/onm-xri-generate-path.coffee'
                    'lib/core/risp/generate/onm-xri-generate-path-readable.js': 'src/core/risp/generate/onm-xri-generate-path-readable.coffee'
                    'lib/core/risp/generate/onm-xri-generate-path-hash.js': 'src/core/risp/generate/onm-xri-generate-path-hash.coffee'
                    'lib/core/risp/generate/onm-xri-generate-vector.js': 'src/core/risp/generate/onm-xri-generate-vector.coffee'
                    'lib/core/risp/generate/onm-xri-generate-vector-uri.js': 'src/core/risp/generate/onm-xri-generate-vector-uri.coffee'
                    'lib/core/risp/generate/onm-xri-generate-vector-lri.js': 'src/core/risp/generate/onm-xri-generate-vector-lri.coffee'
                    'lib/core/risp/parse/onm-xri-parse.js': 'src/core/risp/parse/onm-xri-parse.coffee'
                    'lib/core/risp/parse/onm-xri-parse-path.js': 'src/core/risp/parse/onm-xri-parse-path.coffee'
                    'lib/core/risp/parse/onm-xri-parse-path-readable.js': 'src/core/risp/parse/onm-xri-parse-path-readable.coffee'
                    'lib/core/risp/parse/onm-xri-parse-path-hash.js': 'src/core/risp/parse/onm-xri-parse-path-hash.coffee'
                    'lib/core/risp/parse/onm-xri-parse-vector.js': 'src/core/risp/parse/onm-xri-parse-vector.coffee'
                    'lib/core/risp/parse/onm-xri-parse-vector-uri.js': 'src/core/risp/parse/onm-xri-parse-vector-uri.coffee'
                    'lib/core/risp/parse/onm-xri-parse-vector-lri.js': 'src/core/risp/parse/onm-xri-parse-vector-lri.coffee'

                    # RLTP - Resource Location Transformation Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/rltp/onm-address-resolver.js': 'src/core/rltp/onm-address-resolver.coffee'
                    'lib/core/rltp/onm-component-resolver.js': 'src/core/rltp/onm-component-resolver.coffee'
                    'lib/core/rltp/onm-component-context.js': 'src/core/rltp/onm-component-context.coffee'
                    'lib/core/rltp/onm-named-object-resolver.js': 'src/core/rltp/onm-named-object-resolver.coffee'
                    'lib/core/rltp/onm-named-object-context.js': 'src/core/rltp/onm-named-object-context.coffee'
                    'lib/core/rltp/onm-named-object-property-visitor.js': 'src/core/rltp/onm-named-object-property-visitor.coffee'
                    'lib/core/rltp/onm-named-object-property-policy-common.js': 'src/core/rltp/onm-named-object-property-policy-common.coffee'
                    'lib/core/rltp/onm-named-object-property-policy-initialize.js': 'src/core/rltp/onm-named-object-property-policy-initialize.coffee'
                    'lib/core/rltp/onm-named-object-property-policy-update.js': 'src/core/rltp/onm-named-object-property-policy-update.coffee'







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
