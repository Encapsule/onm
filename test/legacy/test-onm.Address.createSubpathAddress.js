// test-onm.Address.createSubpathAddress.js
//

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var uuid = require('node-uuid');
var onm = require('../../index');

module.exports = describe("onm.Address.address (subpath) tests.", function() {

    var testData = require('../fixture/address-book-data-model');
    var model, response, addressRoot;

    before(function() {
        model = testData.createModel();
        addressRoot = model.address("*");
    });

    it("The onm.Model instance should be defined and not null.", function() {
        assert.isDefined(model);
        assert.isNotNull(model);
        assert.instanceOf(model, onm.Model);
    });


    it("Verify that the model returned an onm.Address instance", function() {
        assert.isDefined(model)
        assert.isNotNull(model);
        assert.instanceOf(model, onm.Model);
        assert.isDefined(addressRoot);
        assert.isNotNull(addressRoot);
        assert.instanceOf(addressRoot, onm.Address);
        assert.isTrue(addressRoot.isRoot());
    });

    describe("Create a subpath address one level above the root namespace.", function() {
        var addressActual, addressExpected;
        before(function() {
            addressActual = addressRoot.address("contacts");
            addressExpected = model.address("addressBook.contacts");
        });
        it("Actual and expected address URI's should match.", function() {
            assert.equal(addressActual.uri(), addressExpected.uri());
        });
        it("Actual and expected address LRI's should match.", function() {
            assert.equal(addressActual.lri(), addressExpected.lri());
        });
        it("Actual and expected address should be equal via onm.Address.isEqual operator.", function() {
            assert.isTrue(addressActual.isEqual(addressExpected));
            assert.isTrue(addressExpected.isEqual(addressActual));
        });
    });

    describe("Create a subpath address two levels above the root namespace.", function() {
        var addressActual, addressExpected;
        before(function() {
            addressActual = addressRoot.address("contacts.contact");
            addressExpected = model.address("addressBook.contacts.contact");
        });
        it("Actual and expected address URI's should match.", function() {
            assert.equal(addressActual.uri(), addressExpected.uri());
        });
        it("Actual and expected address LRI's should match.", function() {
            assert.equal(addressActual.lri(), addressExpected.lri());
        });
        it("Actual and expected address should be equal via onm.Address.isEqual operator.", function() {
            assert.isTrue(addressActual.isEqual(addressExpected));
            assert.isTrue(addressExpected.isEqual(addressActual));
        });
    });

    describe("Create a component and use it as the base to create a subpath address.", function() {

        var store;
        var actualResult, expectedResult;
        var addressContact, addressContactAddresses;

        before(function() {
            store = testData.createStore();
            var addressNewContact = addressRoot.address("contacts.contact");
            var namespace = store.nsCreate(addressNewContact);
            addressContact = namespace.address();
            addressContactAddresses = addressContact.address("addresses");
            actualResult = addressContactAddresses.uri();
            expectedResult = 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.1.addresses';
        });

        it("The actual result should match the expected result", function() {
            assert.equal(actualResult, expectedResult);
        });


        describe("Go another level deeper.", function() {

            before(function() {
                var addressTest = addressContactAddresses.address('address');
                actualResult = addressTest.uri();
                expectedResult = 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.1.addresses.address';
            });

            it("The actual result should match the expected result", function() {
                assert.equal(actualResult, expectedResult);
            });

        });

    });

});