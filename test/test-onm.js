// test-onm.js
//

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should;

var packageMeta = require('../package.json');

describe("**** " + packageMeta.author.org + " " + packageMeta.name + " v" + packageMeta.version + " TEST SUITE ****", function() {

    before(function() {
        console.log("package.description = " + packageMeta.description + "'");
        console.log("package.repository.url = '" + packageMeta.repository.url + "'");
    });

    // Validate data models used by these tests.
    require('./fixture/test-fixture-data-models');

    // Validate the v1 onm core
    require('./test-onm-core');

    // Base level onm export object API test suites.
    require('./test-onm.Model');
    require('./test-onm.Address');
    require('./test-onm-xri-parser');
    require('./test-onm.Store');
    require('./test-onm.Namespace');

    // Advanced white box, and functional test suites.
    require('./test-onm.Model-intrinsic-semantic-bindings');
});



