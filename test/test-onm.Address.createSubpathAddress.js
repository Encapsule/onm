// test-onm.Address.createSubpathAddress.js
//

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var uuid = require('node-uuid');
var onm = require('../index');

module.exports = describe("onm.Address.createSubpathAddress tests.", function() {

    var testData = require('./fixture/address-book-data-model');
    var model, addressRoot;

    before(function() {
        model = testData.createModel();
        addressRoot = model.createRootAddress();
    });

    it("Verify test setup", function() {
        assert.isNotNull(model);
        assert.isNotNull(addressRoot);
    });

    describe("Create a subpath address one level above the root namespace.", function() {
        var addressActual, addressExpected;
        before(function() {
            addressActual = addressRoot.createSubpathAddress("contacts");
            addressExpected = model.createPathAddress("addressBook.contacts");
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
            addressActual = addressRoot.createSubpathAddress("contacts.contact");
            addressExpected = model.createPathAddress("addressBook.contacts.contact");
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
            var addressNewContact = addressRoot.createSubpathAddress("contacts.contact");
            var namespace = store.nsCreate(addressNewContact);
            addressContact = namespace.address();
            addressContactAddresses = addressContact.createSubpathAddress("addresses");
            actualResult = addressContactAddresses.uri();
            expectedResult = 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.contact.addresses';
        });

        it("The actual result should match the expected result", function() {
            assert.equal(actualResult, expectedResult);
        });


        describe("Go another level deeper.", function() {

            before(function() {
                var addressTest = addressContactAddresses.createSubpathAddress('address');
                actualResult = addressTest.uri();
                expectedResult = 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.contact.addresses.address';
            });

            it("The actual result should match the expected result", function() {
                assert.equal(actualResult, expectedResult);
            });

        });

    });

});