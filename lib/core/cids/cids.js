
/*
------------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2015 Encapsule Project
  
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

**** Encapsule Project :: Build better software with circuit models ****

OPEN SOURCES: http://github.com/Encapsule HOMEPAGE: http://Encapsule.org
BLOG: http://blog.encapsule.org TWITTER: https://twitter.com/Encapsule

------------------------------------------------------------------------------



------------------------------------------------------------------------------
 */


/* 
    Class Identification Subsystem (CIDS)

    CIDS defines a simple protocol for managing classes of in-memory JavaScript object resources at runtime.

    The object property name cids.reserverd reserved by CIDS for use as a Class Identifier (CID).

    The CID value assigend to an onm-format Internet Routable URI Token (IRUT) string.

    Comparison of the CID value of two objects for equality is the only meaningful discrimination semantic provided by CIDS.

    This is still useful however. Data (e.g. objects created by derived client code) that do not participate in CIDS will
    generally not be tagged with CID values. Internally, onm wraps just about every meaningful piece of client state
    in a CID-tagged object as it crosses the onm API surface and is validated. Additionally, all object generators within
    onm produce CID-tagged objects.

    CID are IRUT are globally unique so suitable for use as database indices alone, or in app-specific derived key scenarios.
 */

(function() {
  var CIDS, cnameTable;

  CIDS = module.exports = {};

  cnameTable = require('./cids-table');


  /*
      ----------------------------------------------------------------------
      request = {
          ref: reference to an object
          cname: CIDS-registered class name string
      }
      response = {
          error: null or a string explaining why result is null
          result: input object
      }
      ----------------------------------------------------------------------
   */

  CIDS.setCID = function(request_) {
    var cid, errors, inBreakScope, innerResponse, response;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_ != null) && request_)) {
        errors.unshift("Missing request object in-parameter.");
        break;
      }
      innerResponse = CIDS.getCID(request_.ref);
      if (!innerResponse.error) {
        errors.unshift("Object is already identified as '" + innerResponse.result.cname + "' with CID '" + innerResponse.result.cid + "'.");
        break;
      }
      cid = cnameTable.cname2cid[request_.cname];
      if (!((cid != null) && cid)) {
        errors.unshift("Unknown object class name '" + request_.cname + "'. Registered in CIDS: [" + cnameTable.cnames + "].");
        break;
      }
      console.log("onm.core.cids *** assigned: cname='" + request_.cname + "' cid='" + cid + "' ***");
      response.result = request_.ref[cnameTable.reservedPropertyName] = cid;
    }
    if (errors.length) {
      errors.unshift("CIDS.setCID:");
      response.error = errors.join(' ');
    }
    return response;
  };

  CIDS.getCID = function(ref_) {
    var cname, errors, inBreakScope, refType, response, responseCID, responseCIDType;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      refType = Object.prototype.toString.call(ref_);
      if (refType !== '[object Object]') {
        errors.unshift("Invalid request 'object' value type '" + refType + "'. Expected reference to '[object Object]'.");
        break;
      }
      responseCID = ref_[cnameTable.reservedPropertyName];
      if (!((responseCID != null) && responseCID)) {
        errors.unshift("Object appears not to be CID-identified.");
        break;
      }
      responseCIDType = Object.prototype.toString.call(responseCID);
      if (responseCIDType !== '[object String]') {
        errors.unshift("Object appears to be CID-identified with a value of type '" + responseCIDType + ". Expected '[object String]'.");
        break;
      }
      if (responseCID.length !== 22) {
        errors.unshift("Object appears to be CID-identified with an unknown, non-IRUT, string format.");
        break;
      }
      cname = cnameTable.cid2cname[responseCID];
      if (!((cname != null) && cname)) {
        errors.unshift("Object is identified with an unknown CID value '" + responseCID + "'.");
        break;
      }
      response.result.cname = cname;
    }
    if (errors.length) {
      errors.unshift("CIDS.getCID:");
      response.error = errors.join(' ');
    }
    return response;
  };

  CIDS.assertCID = function(request_) {
    var cidCheck, errors, getCIDResponse, inBreakScope, response;
    errors = [];
    response = {
      error: null,
      result: false
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      getCIDResponse = CIDS.getCID(request_.ref);
      if (getCIDResponse.error) {
        errors.unshift(getCIDResponse.error);
        break;
      }
      if (getCIDResponse.result.cname !== request_.cname) {
        cidCheck = cnameTable.cname2cid[request_.cname];
        if (!((cidCheck != null) && cidCheck)) {
          errors.unshift("But, the request specifies an invalid 'cname' value '" + request_.cname + "'. Registered in CIDS: [" + cnameTable.cnames + "].");
          errors.unshift("Target reference is a CID-identified resource '" + getCIDResponse.result.cname + "' with CID '" + getCIDResponse.result.cid + "'.");
          break;
        }
        errors.unshift("Target resource is a CID-identified '" + getCIDResponse.result.cname + "' not a '" + request_.cname + ".");
        break;
      }
      response.result = true;
    }
    if (errors.length) {
      errors.unshift("CIDS.assertCID failed:");
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
