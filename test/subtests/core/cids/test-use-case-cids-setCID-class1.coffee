# test-use-case-cids-setCID-class1-coffee
#
# This module is compiled to JavaScript at build time and tested as JavaScript


dirRequires = require './dir-requires'
CIDS = dirRequires.CIDS

chai = require 'chai'
assert = chai.assert

class TestClass1
    constructor: ->
        x = 5
        @y = "this is a test"

    z: [ 'one' ]
    test: => return @y


assert.isFunction TestClass1

describe "Attempting to imbue CoffeeScript-generated 'TestClass1' with a CID.", ->

    cidsResponse = null

    before ->

        setCIDWrapper = ->
            cidsResponse = CIDS.setCID ref: TestClass1, cname: 'Model'

        assert.doesNotThrow setCIDWrapper, "ONM OPERATIONS SHOULD NOT THROW!"
        true

    it "The call to setCID should have returned a response object.", ->
        assert.isDefined cidsResponse
        assert.isNotNull cidsResponse
        assert.isObject cidsResponse
        true

    it "The call response should define property 'error' of type null.", ->
        assert.isNull cidsResponse.error
        true

    it "The call response should define property 'result' of type object.", ->
        assert.property cidsResponse, 'result'
        assert.isObject cidsResponse.result
        true

    describe "Create a new instance of 'testClass1' and ensure it's CID-identified.", ->

        testClass1 = null
        cidsResponse = null

        before ->
            createTestObject = ->
                testClass1 = new TestClass1()
            assert.doesNotThrow createTestObject
            cidsResponse = CIDS.getCNAME testClass1
            true

        it "Test setup should have created a new instance of testClass1.", ->
            assert.isDefined testClass1
            assert.isNotNull testClass1
            assert.isObject testClass1
            true

        it "The call to CIDS.getCNAME on the test object instance should have succeeded.", ->
            assert.isNull cidsResponse.error
            assert.isDefined cidsResponse.result
            assert.isObject cidsResponse.result
            true

        it "The response.result should match expected control value.", ->
            expectedJSON = '{"error":null,"result":{"cid":"onmnqPaPSWKDsC9c8GZaEg","cname":"Model","ref":{"y":"this is a test"}}}'
            assert.equal JSON.stringify(cidsResponse), expectedJSON
            true

    true

