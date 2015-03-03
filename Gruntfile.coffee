
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

                    # API sub-modules

                    # Common modules
                    # ============================================================================

                    'lib/common/onm-util-functions.js': 'src/common/onm-util-functions.coffee'
                    'lib/common/onm-intrinsic-data-models.js': 'src/common/onm-intrinsic-data-models.coffee'

                    # onm core modules
                    # ============================================================================
                    
                    # onm core request processor
                    'lib/core/onm-core.js': 'src/core/onm-core.coffee'
                    'lib/core/crp/crp.js': 'src/core/crp/crp.coffee'
                    'lib/core/crp/crp-normalize.js': 'src/core/crp/crp-normalize.coffee'
                    'lib/core/crp/crp-bind.js': 'src/core/crp/crp-bind.coffee'
                    'lib/core/crp/crp-dispatch.js': 'src/core/crp/crp-dispatch.coffee'
                    'lib/core/crp/crp-ops-map.js' : 'src/core/crp/crp-ops-map.coffee'

                    # CIDS - Class Identification Subsystem
                    # ----------------------------------------------------------------------------
                    'lib/core/cids/cids.js':     'src/core/cids/cids.coffee'
                    'lib/core/cids/cids-table.js': 'src/core/cids/cids-table.coffee'

                    # NTCL - Native Type Conversion Library
                    # ----------------------------------------------------------------------------
                    'lib/core/ntcl/ntcl.js': 'src/core/ntcl/ntcl.coffee'
                    'lib/core/ntcl/ntcl-luts.js': 'src/core/ntcl/ntcl-luts.coffee'
                    'lib/core/ntcl/ntcl-cluts.js': 'src/core/ntcl/ntcl-cluts.coffee'

                    # PODS - Plain Old Data Subsystem
                    # ----------------------------------------------------------------------------
                    'lib/core/pods/pods.js': 'src/core/pods/pods.coffee'

                    # DAOS - Data-Addressable Object Store
                    # ----------------------------------------------------------------------------

                    # JNSP - Journal Notification Stream Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/jnsp/onm-store-reifier.js': 'src/core/jnsp/onm-store-reifier.coffee'

                    # RASP - Resource Address Space Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/rasp/onm-model-details.js': 'src/core/rasp/onm-model-details.coffee'
                    'lib/core/rasp/onm-address-token.js': 'src/core/rasp/onm-address-token.coffee'
                    'lib/core/rasp/onm-address-details.js': 'src/core/rasp/onm-address-details.coffee'

                    # RISP - Resource Identifier String Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/risp/risp.js': 'src/core/risp/risp.coffee'
                    'lib/core/risp/generate/risp-generate.js': 'src/core/risp/generate/risp-generate.coffee'
                    'lib/core/risp/generate/risp-generate-path.js': 'src/core/risp/generate/risp-generate-path.coffee'
                    'lib/core/risp/generate/risp-generate-path-readable.js': 'src/core/risp/generate/risp-generate-path-readable.coffee'
                    'lib/core/risp/generate/risp-generate-path-hash.js': 'src/core/risp/generate/risp-generate-path-hash.coffee'
                    'lib/core/risp/generate/risp-generate-vector.js': 'src/core/risp/generate/risp-generate-vector.coffee'
                    'lib/core/risp/generate/risp-generate-vector-uri.js': 'src/core/risp/generate/risp-generate-vector-uri.coffee'
                    'lib/core/risp/generate/risp-generate-vector-lri.js': 'src/core/risp/generate/risp-generate-vector-lri.coffee'
                    'lib/core/risp/generate/risp-generate-irut.js': 'src/core/risp/generate/risp-generate-irut.coffee'

                    'lib/core/risp/parse/risp-parse.js': 'src/core/risp/parse/risp-parse.coffee'
                    'lib/core/risp/parse/risp-parse-path.js': 'src/core/risp/parse/risp-parse-path.coffee'
                    'lib/core/risp/parse/risp-parse-path-readable.js': 'src/core/risp/parse/risp-parse-path-readable.coffee'
                    'lib/core/risp/parse/risp-parse-path-hash.js': 'src/core/risp/parse/risp-parse-path-hash.coffee'
                    'lib/core/risp/parse/risp-parse-vector.js': 'src/core/risp/parse/risp-parse-vector.coffee'
                    'lib/core/risp/parse/risp-parse-vector-uri.js': 'src/core/risp/parse/risp-parse-vector-uri.coffee'
                    'lib/core/risp/parse/risp-parse-vector-lri.js': 'src/core/risp/parse/risp-parse-vector-lri.coffee'

                    # RLTP - Resource Location Transformation Processor
                    # ----------------------------------------------------------------------------
                    'lib/core/rltp/rltp-address-resolver.js': 'src/core/rltp/rltp-address-resolver.coffee'
                    'lib/core/rltp/rltp-component-resolver.js': 'src/core/rltp/rltp-component-resolver.coffee'
                    'lib/core/rltp/rltp-component-context.js': 'src/core/rltp/rltp-component-context.coffee'
                    'lib/core/rltp/rltp-named-object-resolver.js': 'src/core/rltp/rltp-named-object-resolver.coffee'
                    'lib/core/rltp/rltp-named-object-context.js': 'src/core/rltp/rltp-named-object-context.coffee'
                    'lib/core/rltp/rltp-named-object-property-visitor.js': 'src/core/rltp/rltp-named-object-property-visitor.coffee'
                    'lib/core/rltp/rltp-named-object-property-policy-common.js': 'src/core/rltp/rltp-named-object-property-policy-common.coffee'
                    'lib/core/rltp/rltp-named-object-property-policy-initialize.js': 'src/core/rltp/rltp-named-object-property-policy-initialize.coffee'
                    'lib/core/rltp/rltp-named-object-property-policy-update.js': 'src/core/rltp/rltp-named-object-property-policy-update.coffee'


        jshint:
            options: {}
            files: [ '*.js', './lib/*.js', './lib/**/*.js' ]


        mochaTest:
            options:
                reporter: 'spec'
                checkLeaks: true
                captureFile: "./logs/mocha-spec-results.log" # git ignored
 
            src: [ './test/**/*.js' ]

        clean: [ 'lib' ]

    grunt.initConfig configObject

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-mocha-test"
    grunt.loadNpmTasks "grunt-contrib-jshint"

    grunt.registerTask "test", [ "mochaTest" ]
    grunt.registerTask "default", [ "clean", "coffee:compile", "test" ]
