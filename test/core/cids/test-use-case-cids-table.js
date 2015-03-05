// test-use-case-cids-table.js

var assert = require('chai').assert;

describe("Attempt to load the cids-table module.", function() {

    cnameTable = null;

    before(function() {
        var moduleLoader = function() {
            cnameTable = require('../../../lib/core/cids/cids-table');
        };
        assert.doesNotThrow(moduleLoader, "ATTEMPT TO LOAD cid-table MODULE SHOULD NOT THROW");
    });

    it("The cids-table module should have loaded and exported cnameTable object.", function() {
        assert.isDefined(cnameTable);
        assert.isNotNull(cnameTable);
        assert.isObject(cnameTable);
    });

    it("cnameTable object should define 'reservedPropertyName' property of type string.", function() {
        assert.property(cnameTable, 'reservedPropertyName');
        assert.isString(cnameTable.reservedPropertyName);
    });

    it("cnameTable object should defined 'cnames' prperty of type array.", function() {
        assert.property(cnameTable, 'cnames');
        assert.isArray(cnameTable.cnames);
    });

    it("cnameTable object should define 'cname2cid' property of type object.", function() {
        assert.property(cnameTable, 'cname2cid');
        assert.isObject(cnameTable.cname2cid);
    });

    it("cnameTable object should define 'cid2cname' property of type object.", function() {
        assert.property(cnameTable, 'cid2cname');
        assert.isObject(cnameTable.cid2cname);
    });

    describe("Verify the expected contents of the CIDS CNAME table.", function() {
        it("The cnameTable JSON serialization should match control value.", function() {
            var expectedValue = '{"reservedPropertyName":"__cid__","cnames":["IRUT","Model","Address","Store","Namespace","NSD","ASM","RAS","DAO","RAL","RLP","RIS","DAB","JSON","DATA"],"cname2cid":{"IRUT":"onmRWMgVT-Gls0D99oo-9A","Model":"onmnqPaPSWKDsC9c8GZaEg","Address":"onm-jxccSVSMum1pxB7-RA","Store":"onmJ854qRVarn0zv7arr1w","Namespace":"onmPnVIeToa_1BxO8Y47gg","NSD":"onm7f7BZTEONDSnfrSs6AA","ASM":"onmN7AoERO-3jIhkVqkxEg","RAS":"onmbrsKOR0iv8kZXzhXejw","DAO":"onmP7n5uTxaLduPZF_Naig","RAL":"onmthokETQuOMLrIDeegpw","RLP":"onmESS9lSZukNLhQmCosyQ","RIS":"onmf5Qt2RD2g30oDtsZD1g","DAB":"onmCBeRAQFKhIokTJLTGfA","JSON":"onmFMpxfSCaZO943sLfuxw","DATA":"onmVNJZMQUKjDmocj6esPA"},"cid2cname":{"onmRWMgVT-Gls0D99oo-9A":"IRUT","onmnqPaPSWKDsC9c8GZaEg":"Model","onm-jxccSVSMum1pxB7-RA":"Address","onmJ854qRVarn0zv7arr1w":"Store","onmPnVIeToa_1BxO8Y47gg":"Namespace","onm7f7BZTEONDSnfrSs6AA":"NSD","onmN7AoERO-3jIhkVqkxEg":"ASM","onmbrsKOR0iv8kZXzhXejw":"RAS","onmP7n5uTxaLduPZF_Naig":"DAO","onmthokETQuOMLrIDeegpw":"RAL","onmESS9lSZukNLhQmCosyQ":"RLP","onmf5Qt2RD2g30oDtsZD1g":"RIS","onmCBeRAQFKhIokTJLTGfA":"DAB","onmFMpxfSCaZO943sLfuxw":"JSON","onmVNJZMQUKjDmocj6esPA":"DATA"}}'
            assert.equal(JSON.stringify(cnameTable), expectedValue);
        });
    });
});
