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
    require('./test-fixtures');

    // Validate v1 onm core
    require('./test-onm-core');

    // Validate v0.2/v0.3 API (Model/Address/Store/Namespace)
    require('./test-legacy');

});



