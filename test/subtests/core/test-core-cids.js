// test-core-cids.js

var assert = require('chai').assert;

describe("onm core CIDS subsystem tests.", function() {

    describe("Load and verify the CIDS CNAME table module, `cids-table`", function() {
        require('./cids/test-use-case-cids-table');
    });


    describe("Load and verify the CIDS module, `./cids/cids`", function() {

        CIDS = null;

        before(function() {
            var loadModuleWrapper = function() {
                CIDS = require('../../../lib/core/cids/cids');
            };
            assert.doesNotThrow(loadModuleWrapper, "Attempt to load module ./lib/core/cids/cids should succeed.");
        });

        it("CIDS module should have loaded without error.", function() {
            assert.isDefined(CIDS);
            assert.isNotNull(CIDS);
            assert.isObject(CIDS);
        });

        describe("Verify expected CIDS module export signature.", function() {

            it("CIDS should export function 'setCID'", function() {
                assert.property(CIDS, 'setCID');
                assert.isFunction(CIDS.setCID);
            });

            it("CIDS should export function 'getCNAME'", function() {
                assert.property(CIDS, 'getCNAME');
                assert.isFunction(CIDS.getCNAME);
            });

            it("CIDS should export function 'assertCNAME'", function() {
                assert.property(CIDS, 'assertCNAME');
                assert.isFunction(CIDS.assertCNAME);
            });


            it("CIDS should export function 'CNAMEfromCID'", function() {
                assert.property(CIDS, 'CNAMEfromCID');
                assert.isFunction(CIDS.CNAMEfromCID);
            });

            it("CIDS should export function 'CIDfromCNAME'", function() {
                assert.property(CIDS, 'CIDfromCNAME');
                assert.isFunction(CIDS.CIDfromCNAME);
            });

            describe("Verify CIDS functions.", function() {

                require('./cids/test-use-case-cids-getCNAME');
                require('./cids/test-use-case-cids-setCID');
                require('./cids/test-use-case-cids-assertCNAME');

            });

        });

    });


});
