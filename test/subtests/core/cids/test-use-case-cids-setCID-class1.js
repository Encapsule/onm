(function() {
  var CIDS, TestClass1, assert, chai, dirRequires,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  dirRequires = require('./dir-requires');

  CIDS = dirRequires.CIDS;

  chai = require('chai');

  assert = chai.assert;

  TestClass1 = (function() {
    function TestClass1() {
      this.test = __bind(this.test, this);
      var x;
      x = 5;
      this.y = "this is a test";
    }

    TestClass1.prototype.z = ['one'];

    TestClass1.prototype.test = function() {
      return this.y;
    };

    return TestClass1;

  })();

  assert.isFunction(TestClass1);

  describe("Attempting to imbue CoffeeScript-generated 'TestClass1' with a CID.", function() {
    var cidsResponse;
    cidsResponse = null;
    before(function() {
      var setCIDWrapper;
      setCIDWrapper = function() {
        return cidsResponse = CIDS.setCID({
          ref: TestClass1,
          cname: 'Model'
        });
      };
      assert.doesNotThrow(setCIDWrapper, "ONM OPERATIONS SHOULD NOT THROW!");
      return true;
    });
    it("The call to setCID should have returned a response object.", function() {
      assert.isDefined(cidsResponse);
      assert.isNotNull(cidsResponse);
      assert.isObject(cidsResponse);
      return true;
    });
    it("The call response should define property 'error' of type null.", function() {
      assert.isNull(cidsResponse.error);
      return true;
    });
    it("The call response should define property 'result' of type object.", function() {
      assert.property(cidsResponse, 'result');
      assert.isObject(cidsResponse.result);
      return true;
    });
    describe("Create a new instance of 'testClass1' and ensure it's CID-identified.", function() {
      var testClass1;
      testClass1 = null;
      cidsResponse = null;
      before(function() {
        var createTestObject;
        createTestObject = function() {
          return testClass1 = new TestClass1();
        };
        assert.doesNotThrow(createTestObject);
        cidsResponse = CIDS.getCNAME(testClass1);
        return true;
      });
      it("Test setup should have created a new instance of testClass1.", function() {
        assert.isDefined(testClass1);
        assert.isNotNull(testClass1);
        assert.isObject(testClass1);
        return true;
      });
      it("The call to CIDS.getCNAME on the test object instance should have succeeded.", function() {
        assert.isNull(cidsResponse.error);
        assert.isDefined(cidsResponse.result);
        assert.isObject(cidsResponse.result);
        return true;
      });
      return it("The response.result should match expected control value.", function() {
        var expectedJSON;
        expectedJSON = '{"error":null,"result":{"cid":"onmnqPaPSWKDsC9c8GZaEg","cname":"Model","ref":{"y":"this is a test"}}}';
        assert.equal(JSON.stringify(cidsResponse), expectedJSON);
        return true;
      });
    });
    return true;
  });

}).call(this);
