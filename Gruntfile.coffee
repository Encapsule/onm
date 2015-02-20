
module.exports = (grunt) ->

    configObject =
        pkg: grunt.file.readJSON("package.json")

        coffee:
            compile:
                files:
                    # API modules
                    'lib/onm-model.js': 'src/onm-model.coffee'
                    'lib/onm-address.js': 'src/onm-address.coffee'
                    'lib/onm-store.js': 'src/onm-store.coffee'
                    'lib/onm-namespace.js': 'src/onm-namespace.coffee'
                    'lib/onm-address-store.js': 'src/onm-address-store.coffee'

                    # API sub-modules
                    'lib/model/onm-model-details.js': 'src/model/onm-model-details.coffee'
                    'lib/address/onm-address-details.js': 'src/address/onm-address-details.coffee'


                    # onm implementation modules
                    'lib/common/onm-class-registry.js': 'src/common/onm-class-registry.coffee'
                    'lib/address/onm-address-token.js': 'src/address/onm-address-token.coffee'

                    # v0.3 implementation

                    # Common sub-modules.
                    'lib/common/onm-util-functions.js': 'src/common/onm-util-functions.coffee'
                    'lib/common/onm-intrinsic-data-models.js': 'src/common/onm-intrinsic-data-models.coffee'

                    # x Resource Identifier Processor (xRIP)
                    'lib/model/xrip/onm-xri-processor.js': 'src/model/xrip/onm-xri-processor.coffee'
                    # generate resource locator strings
                    'lib/model/xrip/generate/onm-xri-generate.js': 'src/model/xrip/generate/onm-xri-generate.coffee'
                    'lib/model/xrip/generate/onm-xri-generate-path.js': 'src/model/xrip/generate/onm-xri-generate-path.coffee'
                    'lib/model/xrip/generate/onm-xri-generate-path-readable.js': 'src/model/xrip/generate/onm-xri-generate-path-readable.coffee'
                    'lib/model/xrip/generate/onm-xri-generate-path-hash.js': 'src/model/xrip/generate/onm-xri-generate-path-hash.coffee'
                    'lib/model/xrip/generate/onm-xri-generate-vector.js': 'src/model/xrip/generate/onm-xri-generate-vector.coffee'
                    'lib/model/xrip/generate/onm-xri-generate-vector-uri.js': 'src/model/xrip/generate/onm-xri-generate-vector-uri.coffee'
                    'lib/model/xrip/generate/onm-xri-generate-vector-lri.js': 'src/model/xrip/generate/onm-xri-generate-vector-lri.coffee'
                    # parse resource locator strings
                    'lib/model/xrip/parse/onm-xri-parse.js': 'src/model/xrip/parse/onm-xri-parse.coffee'
                    'lib/model/xrip/parse/onm-xri-parse-path.js': 'src/model/xrip/parse/onm-xri-parse-path.coffee'
                    'lib/model/xrip/parse/onm-xri-parse-path-readable.js': 'src/model/xrip/parse/onm-xri-parse-path-readable.coffee'
                    'lib/model/xrip/parse/onm-xri-parse-path-hash.js': 'src/model/xrip/parse/onm-xri-parse-path-hash.coffee'
                    'lib/model/xrip/parse/onm-xri-parse-vector.js': 'src/model/xrip/parse/onm-xri-parse-vector.coffee'
                    'lib/model/xrip/parse/onm-xri-parse-vector-uri.js': 'src/model/xrip/parse/onm-xri-parse-vector-uri.coffee'
                    'lib/model/xrip/parse/onm-xri-parse-vector-lri.js': 'src/model/xrip/parse/onm-xri-parse-vector-lri.coffee'

                    # x Resource Location Transformer (xRLT)
                    'lib/store/xrlt/onm-address-resolver.js': 'src/store/xrlt/onm-address-resolver.coffee'
                    'lib/store/xrlt/onm-component-resolver.js': 'src/store/xrlt/onm-component-resolver.coffee'
                    'lib/store/xrlt/onm-component-context.js': 'src/store/xrlt/onm-component-context.coffee'
                    'lib/store/xrlt/onm-named-object-resolver.js': 'src/store/xrlt/onm-named-object-resolver.coffee'
                    'lib/store/xrlt/onm-named-object-context.js': 'src/store/xrlt/onm-named-object-context.coffee'
                    'lib/store/xrlt/onm-named-object-property-visitor.js': 'src/store/xrlt/onm-named-object-property-visitor.coffee'
                    'lib/store/xrlt/onm-named-object-property-policy-common.js': 'src/store/xrlt/onm-named-object-property-policy-common.coffee'
                    'lib/store/xrlt/onm-named-object-property-policy-initialize.js': 'src/store/xrlt/onm-named-object-property-policy-initialize.coffee'
                    'lib/store/xrlt/onm-named-object-property-policy-update.js': 'src/store/xrlt/onm-named-object-property-policy-update.coffee'

                    # v0.2 observer/notification subsystem (to be replaced in v0.3)
                    'lib/store/jnsp/onm-store-reifier.js': 'src/store/jnsp/onm-store-reifier.coffee'


        jshint:
            options: {}
            files: [ '*.js', './lib/*.js', './lib/**/*.js' ]


        mochaTest:
            options:
                reporter: 'nyan'
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
