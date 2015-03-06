
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

                    'lib/onm-util-functions.js': 'src/common/onm-util-functions.coffee'
                    'lib/onm-intrinsic-data-models.js': 'src/common/onm-intrinsic-data-models.coffee'

                    # onm core modules
                    # ============================================================================
                    
                    # onm core request processor
                    'lib/onm-core.js': 'src/core/onm-core.coffee'
                    'lib/crp.js': 'src/core/crp/crp.coffee'
                    'lib/crp-normalize.js': 'src/core/crp/crp-normalize.coffee'
                    'lib/crp-bind.js': 'src/core/crp/crp-bind.coffee'
                    'lib/crp-dispatch.js': 'src/core/crp/crp-dispatch.coffee'
                    'lib/crp-ops-map.js' : 'src/core/crp/crp-ops-map.coffee'

                    # CIDS - Class Identification Subsystem
                    # ----------------------------------------------------------------------------
                    'lib/cids.js':     'src/core/cids/cids.coffee'
                    'lib/cids-table.js': 'src/core/cids/cids-table.coffee'

                    # NTCL - Native Type Conversion Library
                    # ----------------------------------------------------------------------------
                    'lib/ntcl.js': 'src/core/ntcl/ntcl.coffee'
                    'lib/ntcl-luts.js': 'src/core/ntcl/ntcl-luts.coffee'
                    'lib/ntcl-cluts.js': 'src/core/ntcl/ntcl-cluts.coffee'

                    # DTR - Data Type Registry
                    # ----------------------------------------------------------------------------
                    'lib/dtr.js': 'src/core/dtr/dtr.coffee'

                    # DAOS - Data-Addressable Object Store
                    # ----------------------------------------------------------------------------

                    # JNSP - Journal Notification Stream Processor
                    # ----------------------------------------------------------------------------
                    'lib/onm-store-reifier.js': 'src/core/jnsp/onm-store-reifier.coffee'

                    # RASP - Resource Address Space Processor
                    # ----------------------------------------------------------------------------
                    'lib/onm-model-details.js': 'src/core/rasp/onm-model-details.coffee'
                    'lib/onm-address-token.js': 'src/core/rasp/onm-address-token.coffee'
                    'lib/onm-address-details.js': 'src/core/rasp/onm-address-details.coffee'

                    # RISP - Resource Identifier String Processor
                    # ----------------------------------------------------------------------------
                    'lib/risp.js': 'src/core/risp/risp.coffee'
                    'lib/risp-generate.js': 'src/core/risp/generate/risp-generate.coffee'
                    'lib/risp-generate-path.js': 'src/core/risp/generate/risp-generate-path.coffee'
                    'lib/risp-generate-path-readable.js': 'src/core/risp/generate/risp-generate-path-readable.coffee'
                    'lib/risp-generate-path-hash.js': 'src/core/risp/generate/risp-generate-path-hash.coffee'
                    'lib/risp-generate-vector.js': 'src/core/risp/generate/risp-generate-vector.coffee'
                    'lib/risp-generate-vector-uri.js': 'src/core/risp/generate/risp-generate-vector-uri.coffee'
                    'lib/risp-generate-vector-lri.js': 'src/core/risp/generate/risp-generate-vector-lri.coffee'
                    'lib/risp-generate-irut.js': 'src/core/risp/generate/risp-generate-irut.coffee'

                    'lib/risp-parse.js': 'src/core/risp/parse/risp-parse.coffee'
                    'lib/risp-parse-path.js': 'src/core/risp/parse/risp-parse-path.coffee'
                    'lib/risp-parse-path-readable.js': 'src/core/risp/parse/risp-parse-path-readable.coffee'
                    'lib/risp-parse-path-hash.js': 'src/core/risp/parse/risp-parse-path-hash.coffee'
                    'lib/risp-parse-vector.js': 'src/core/risp/parse/risp-parse-vector.coffee'
                    'lib/risp-parse-vector-uri.js': 'src/core/risp/parse/risp-parse-vector-uri.coffee'
                    'lib/risp-parse-vector-lri.js': 'src/core/risp/parse/risp-parse-vector-lri.coffee'

                    # RLTP - Resource Location Transformation Processor
                    # ----------------------------------------------------------------------------
                    'lib/rltp-address-resolver.js': 'src/core/rltp/rltp-address-resolver.coffee'
                    'lib/rltp-component-resolver.js': 'src/core/rltp/rltp-component-resolver.coffee'
                    'lib/rltp-component-context.js': 'src/core/rltp/rltp-component-context.coffee'
                    'lib/rltp-named-object-resolver.js': 'src/core/rltp/rltp-named-object-resolver.coffee'
                    'lib/rltp-named-object-context.js': 'src/core/rltp/rltp-named-object-context.coffee'
                    'lib/rltp-named-object-property-visitor.js': 'src/core/rltp/rltp-named-object-property-visitor.coffee'
                    'lib/rltp-named-object-property-policy-common.js': 'src/core/rltp/rltp-named-object-property-policy-common.coffee'
                    'lib/rltp-named-object-property-policy-initialize.js': 'src/core/rltp/rltp-named-object-property-policy-initialize.coffee'
                    'lib/rltp-named-object-property-policy-update.js': 'src/core/rltp/rltp-named-object-property-policy-update.coffee'


                    # TEST ASSETS
                    'test/core/cids/test-use-case-cids-setCID-class.js' : 'test/core/cids/test-use-case-cids-setCID-class.coffee'


        jshint:
            options: {}
            files: [ '*.js', './lib/*.js',  ]


        mochaTest:
            options:
                reporter: 'spec'
                checkLeaks: true
                captureFile: "./logs/mocha-spec-results.log" # git ignored
 
            src: [ './test/**/*.js' ]

        clean: [ 'lib', 'build' ]



        browserify:
            dist:
                browserifyOptions:
                    bundleExternal: false
                    bundleBuildins: undefined
                    standalone: 'onm'
                files: [ 'build/browserify.js': 'index.js' ]
                external: [ 'node-uuid' ]



    grunt.initConfig configObject

    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-contrib-clean"
    grunt.loadNpmTasks "grunt-mocha-test"
    grunt.loadNpmTasks "grunt-contrib-jshint"
    grunt.loadNpmTasks "grunt-browserify"

    grunt.registerTask "test", [ "mochaTest" ]
    grunt.registerTask "default", [ "clean", "coffee:compile", "test" ]

    grunt.registerTask "release", [ "default", "browserify" ]