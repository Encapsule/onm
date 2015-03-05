// test-onm.Address.visitChildAddresses.js
//

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var uuid = require('node-uuid');
var onm = require('../../index');

var testData = require('../fixture/address-book-data-model');

module.exports = describe("onm.Address.visitChildAddresses tests", function() {
    describe("enumerate children of 'addressBook'", function() {
        var store, address;
        var childAddresses = [];
        var actualResult;
        var expectedResult;
        before( function() {
            expectedResult = '["onm-uri:431c97059a0240f9312f1b8854d58bfa:properties","onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts"]';
            store = testData.createStore();
            address = store.model.address("*");
            address.visitChildAddresses( function(childAddress_) {
                childAddresses.push(childAddress_.uri());
            });
            actualResult = JSON.stringify(childAddresses);
        });
        it("expecting the actual result to match the expected result", function() {
            assert.equal(actualResult, expectedResult);
        });
    });
    describe("enumerate children of 'addressBook.properties'", function() {
        var store, address;
        var childAddresses = [];
        var actualResult;
        var expectedResult;
        before( function() {
            expectedResult = '["onm-uri:431c97059a0240f9312f1b8854d58bfa:properties.subproperties"]';
            store = testData.createStore();
            address = store.model.createPathAddress("addressBook.properties");
            address.visitChildAddresses( function(childAddress_) {
                childAddresses.push(childAddress_.uri());
            });
            actualResult = JSON.stringify(childAddresses);
        });
        it("expecting the actual result to match the expected result", function() {
            assert.equal(actualResult, expectedResult);
        });
    });
    describe("enumerate children of 'addressBook.contacts'", function() {
        var store, address;
        var childAddresses = [];
        var actualResult;
        var expectedResult;
        before( function() {
            expectedResult = '[]';
            store = testData.createStore();
            address = store.model.createPathAddress("addressBook.contacts");
            address.visitChildAddresses( function(addressChild_) {
                childAddresses.push(addressChild_.uri());
            });
            actualResult = JSON.stringify(childAddresses);
        });
        it("expecting actual result to matach expected result", function() {
            assert.equal(actualResult, expectedResult);
        });
    });


    describe("enumerate child namespaces of a completely unresolved component address", function() {

        var store, model, address;
        var childAddresses = [];
        var actualResult = null;
        var expectedResult;
        before(function() {
            expectedResult = '["onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.contact.emails","onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.contact.addresses","onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.contact.phoneNumbers"]';
            model = testData.createModel();
            address = model.createPathAddress("addressBook.contacts.contact");
            address.visitChildAddresses( function (addressChild_) {
                childAddresses.push(addressChild_.uri());
            });
            actualResult = JSON.stringify(childAddresses);
        });
        it("expecting actual result to match the expected result", function() {
            assert.equal(actualResult, expectedResult);
        });

        describe("now create a component, and repeat the test using a partially-resolved address", function() {

            var addressContact;
            var childAddresses = [];
            var actualResult = null;
            var expectedResult;

            before(function() {
                expectedResult = '["onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.1.emails","onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.1.addresses","onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.1.phoneNumbers"]',
                store = testData.createStore();
                var namespace = store.nsCreate(address);
                addressContact = namespace.address();
                addressContact.visitChildAddresses( function (addressChild_) {
                    childAddresses.push(addressChild_.uri());
                });
                actualResult = JSON.stringify(childAddresses);
            });

            it("expecting actual result to match the expected result", function() {
                assert.equal(actualResult, expectedResult);
            });

            it("expecting 'addressContact' to be resolvable", function() {
                assert.isTrue(addressContact.isResolvable());
            });


            describe("further extend the resovled address and repeat the test", function() {

                var childAddresses = [];
                var actualResult = null;
                var expectedResult;

                before(function() {
                    expectedResult = '["onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts.1.addresses.address.notes"]';
                    var address = addressContact.address("addresses.address");
                    address.visitChildAddresses( function (addressChild_) {
                        childAddresses.push(addressChild_.uri());
                    })
                    actualResult = JSON.stringify(childAddresses);
                });

                it("expecting actual result to match the expected result", function() {
                    assert.equal(actualResult, expectedResult);
                });

            });
            
        });

    });


});
