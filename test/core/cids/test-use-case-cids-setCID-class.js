(function() {
  var CIDS, TestClass2, assert, chai, dirRequires;

  dirRequires = require('./dir-requires');

  CIDS = dirRequires.CIDS;

  chai = require('chai');

  assert = chai.assert;

  TestClass2 = (function() {
    function TestClass2(in_) {
      var cidsResponse;
      cidsResponse = CIDS.setCID({
        ref: this,
        cname: 'RAS'
      });
      console.log(JSON.stringify(cidsResponse));
    }

    return TestClass2;

  })();

  module.exports = TestClass2;

}).call(this);
