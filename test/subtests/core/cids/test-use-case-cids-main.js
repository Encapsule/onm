// test-core-cids.js

var assert = require('chai').assert;

describe("onm core CIDS subsystem tests.", function() {

    describe("Attempt to load the module.", function() {

        CIDS = null;

        before(function() {
            var loadModuleWrapper = function() {
                CIDS = require('../../../../lib/core/cids/cids');
            };
            assert.doesNotThrow(loadModuleWrapper, "Attempt to load module ./lib/core/cids/cids should succeed.");
        });

        it("CIDS module should have loaded without error.", function() {
            assert.isDefined(CIDS);
            assert.isNotNull(CIDS);
            assert.isObject(CIDS);
        });

        describe("Verify expected CIDS module export signature.", function() {

            it("CIDS should export function 'setObjectCID'", function() {
                assert.property(CIDS, 'setObjectCID');
                assert.isFunction(CIDS.setObjectCID);
            });

            it("CIDS should export function 'getObjectCIDInfo'", function() {
                assert.property(CIDS, 'getObjectCIDInfo');
                assert.isFunction(CIDS.getObjectCIDInfo);
            });

            describe("Verify CIDS functions.", function() {

                //require './test-core-cids.getObjectCIDInfo'
                //require './test-core-cids-setObjectCID'

            });

        });

    });


});
