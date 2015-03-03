
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
  'use strict';
  var CIDS, cids, classid, cname;

  cids = {};

  cids.reserved = '__cid__';

  cids.available = [];

  cids.ids = {
    IRUT: 'onmRWMgVT-Gls0D99oo-9A',
    Model: 'onmnqPaPSWKDsC9c8GZaEg',
    Address: 'onm-jxccSVSMum1pxB7-RA',
    Store: 'onmJ854qRVarn0zv7arr1w',
    Namespace: 'onmPnVIeToa_1BxO8Y47gg',
    NSD: 'onm7f7BZTEONDSnfrSs6AA',
    ASM: 'onmN7AoERO-3jIhkVqkxEg',
    RAS: 'onmbrsKOR0iv8kZXzhXejw',
    DAO: 'onmP7n5uTxaLduPZF_Naig',
    RAL: 'onmthokETQuOMLrIDeegpw',
    RLP: 'onmESS9lSZukNLhQmCosyQ',
    RIS: 'onmf5Qt2RD2g30oDtsZD1g',
    DAB: 'onmCBeRAQFKhIokTJLTGfA',
    JSON: 'onmFMpxfSCaZO943sLfuxw',
    DATA: 'onmVNJZMQUKjDmocj6esPA'
  };

  cids.lookup = {};

  for (cname in cids.ids) {
    classid = cids.ids[cname];
    cids.lookup[classid] = cname;
    cids.available.push(cname);
  }

  CIDS = module.exports = {};

  CIDS.ids = cids.ids;

  CIDS.lookup = cids.lookup;


  /*
      request = {
          ref: reference to an object
          cname: CIDS-registered class name string
      }
      response = {
          error: null or a string explaining why result is null
          result: input object w/cids.reserved property set on its prototype
      }
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
      innerResponse = CIDS.getCID(request_.ref);
      if (!innerResponse.error) {
        errors.unshift("Object is already identified as '" + innerResponse.result.cname + "' with CID '" + innerResponse.result.cid + "'.");
        break;
      }
      if ((innerResponse.result.cid != null) && innerResponse.result.cid) {
        errors.unshift(innerResponse.error);
        break;
      }
      cid = cids.ids[request_.cname];
      if (!((cid != null) && cid)) {
        errors.unshift("Unknown object class name '" + request_.cname + "'. Registered in CIDS: [" + cids.available + "].");
        break;
      }
      console.log("onm.core.cids *** assigned: cname='" + request_.cname + "' cid='" + cid + "' ***");
      response.result = request_.ref.prototype[cids.reserved] = cid;
    }
    if (errors.length) {
      errors.unshift("CIDS.setCID failed:");
      response.error = errors.join(' ');
    }
    return response;
  };

  CIDS.getCID = function(object_) {
    var errors, inBreakScope, objectCID, objectCIDType, objectType, response;
    errors = [];
    response = {
      error: null,
      result: {
        cid: null,
        cname: null
      }
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((object_ != null) && object_)) {
        errors.unshift("Missing required object in-parameter.");
        break;
      }
      objectType = Object.prototype.toString.call(object_);
      if (objectType !== '[object Object]') {
        errors.unshift("Invalid request 'object' value type. Expected reference to '[object Object]'.");
        break;
      }
      response.result.cid = objectCID = object_[cids.reserved];
      if (!((objectCID != null) && objectCID)) {
        errors.unshift("Object is not identified with a CID value.");
        break;
      }
      objectCIDType = Object.prototype.toString.call(objectCID);
      if (objectCIDType !== '[object String]') {
        errors.unshift("INTERNAL ERROR: Object CID identifier is not an '[object String]' as expected!");
        break;
      }
      if (objectCID.length !== 22) {
        errors.unshift("INTERNAL ERROR: Object CID identifier is not a 22-character IRUT-format string as exepected!");
        break;
      }
      cname = CIDS.lookup[objectCID];
      if (!((cname != null) && cname)) {
        errors.unshift("Object is identified with an unknown CID value '" + objectCID + "'.");
        break;
      }
      response.result.cname = cname;
    }
    if (errors.length) {
      errors.unshift("CIDS.getCIDInfo:");
      response.error = errors.join(' ');
    }
    return response;
  };

  CIDS.assertCID = function(request_) {
    var cnameCheck, errors, getCIDResponse, inBreakScope, response;
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
        cnameCheck = cids.lookup[request_.cname];
        if (!((cnameCheck != null) && cnameCheck)) {
          errors.unshift("But, the request specifies an invalid 'cname' value '" + request_.cname + "'. Registered in CIDS: [" + cids.available + "].");
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
