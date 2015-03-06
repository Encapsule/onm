
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
  var CIDS, cnameTable, normalizeCNAMERequest;

  CIDS = module.exports = {};

  cnameTable = require('./cids-table');


  /*
      ----------------------------------------------------------------------
      CIDS.setCID (on Object reference from CNAME)
  
      request = {
          ref: reference to an object
          cname: CIDS-registered class name string
      }
      response = {
          error: null or a string explaining why result is null
          result: { cid: string, cname: string: ref: request_.ref } or null to indicate error
      }
      ----------------------------------------------------------------------
   */

  CIDS.setCID = function(request_) {
    var cid, cnameResponse, errors, inBreakScope, nr, propertyName, request, response;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      nr = normalizeCNAMERequest(request_);
      if (nr.error) {
        errors.unshift(nr.error);
        break;
      }
      request = nr.result;
      cnameResponse = CIDS.getCNAME(request.ref);
      if (!cnameResponse.error) {
        errors.unshift("Object is already identified as '" + cnameResponse.result.cname + "' with CID '" + cnameResponse.result.cid + "'.");
        break;
      }
      cid = cnameTable.cname2cid[request.cname];
      if (!((cid != null) && cid)) {
        errors.unshift("Unknown object class name '" + request.cname + "'. Registered in CIDS: [" + cnameTable.cnames + "].");
        break;
      }
      propertyName = cnameTable.reservedPropertyName;
      request.ref[propertyName] = cid;
      response.result = {
        cid: cid,
        cname: request.cname,
        ref: request.ref
      };
    }
    if (errors.length) {
      errors.unshift("CIDS.setCID:");
      response.error = errors.join(' ');
    }
    return response;
  };


  /*
      ----------------------------------------------------------------------
      CIDS.getCNAME (on Object reference)
  
      ref_: reference to an object or function to inspect
      response = {
          error: null or a string explaining why result is null
          result: { cid: string, cname: string: ref: request_.ref } or null to indicate error
      }
      ----------------------------------------------------------------------
   */

  CIDS.getCNAME = function(ref_) {
    var errors, inBreakScope, refType, response, responseCID, responseCIDType, responseCNAME;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((ref_ != null) && ref_)) {
        errors.unshift("Bad request missing required JavaScript reference in-parameter.");
        break;
      }
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
        errors.unshift("Object appears to be CID-identified with an unknown string format. Expected 22-character IRUT.");
        break;
      }
      responseCNAME = cnameTable.cid2cname[responseCID];
      if (!((responseCNAME != null) && responseCNAME)) {
        errors.unshift("Object is identified with an unknown CID value '" + responseCID + "'.");
        break;
      }
      response.result = {
        cid: responseCID,
        cname: responseCNAME,
        ref: ref_
      };
    }
    if (errors.length) {
      errors.unshift("CIDS.getCNAME:");
      response.error = errors.join(' ');
    }
    return response;
  };


  /*
      ----------------------------------------------------------------------
      CIDS.assertCNAME (on Object reference is CNAME)
  
      request = {
          ref: reference to an object
          cname: CIDS-registered class name string
      }
      response = {
          error: null or a string explaining why result is null
          result: { cid: string, cname: string: ref: request_.ref } or null to indicate error
      }
      ----------------------------------------------------------------------
   */

  CIDS.assertCNAME = function(request_) {
    var cidCheck, errors, getCNAMEResponse, inBreakScope, nr, request, response;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      nr = normalizeCNAMERequest(request_);
      if (nr.error) {
        errors.unshift(nr.error);
        break;
      }
      request = nr.result;
      getCNAMEResponse = CIDS.getCNAME(request.ref);
      if (getCNAMEResponse.error) {
        errors.unshift(getCNAMEResponse.error);
        break;
      }
      if (getCNAMEResponse.result.cname !== request.cname) {
        cidCheck = cnameTable.cname2cid[request.cname];
        if (!((cidCheck != null) && cidCheck)) {
          errors.unshift("Invalid request 'cname' value '" + request.cname + "'. Registered in CIDS: [" + cnameTable.cnames + "].");
          break;
        }
        errors.unshift("Target asserted to be a '" + request.cname + "' is actually a '" + getCNAMEResponse.result.cname + "' resource.");
        break;
      }
      response.result = {
        cid: getCNAMEResponse.result.cid,
        cname: request.cname,
        ref: request.ref
      };
    }
    if (errors.length) {
      errors.unshift("CIDS.assertCNAME:");
      response.error = errors.join(' ');
    }
    return response;
  };

  CIDS.CNAMEfromCID = function(cid_) {
    return cnameTable.cid2cname[cid_];
  };

  CIDS.CIDfromCNAME = function(cname_) {
    return cnameTable.cname2cid[cname_];
  };

  normalizeCNAMERequest = function(request_) {
    var cnameType, errors, inBreakScope, refType, reqType, response;
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
      reqType = Object.prototype.toString.call(request_);
      if (reqType !== '[object Object]') {
        errors.unshift("Invalid 'request' type '" + reqType + "'. Expected '[object Object]'.");
        break;
      }
      refType = Object.prototype.toString.call(request_.ref);
      if (refType !== '[object Object]') {
        errors.unshift("Invalid request 'ref' value type '" + refType + "'. Expected '[object Object]'.");
        break;
      }
      cnameType = Object.prototype.toString.call(request_.cname);
      if (cnameType !== '[object String]') {
        errors.unshift("Invalid request 'cname' value type '" + cnameType + "'. Expected '[object String].");
        break;
      }
      response.result = request_;
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);