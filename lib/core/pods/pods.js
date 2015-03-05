
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

(function() {
  var CIDS, NTCL, PODS;

  CIDS = require('../cids/cids');

  NTCL = require('../ntcl/ntcl');

  PODS = module.exports = {};

  PODS.wrapXPOD = function(value_, constrainToJavaScriptType_, onmClassName_) {
    var cidsResponse, errors, inBreakScope, response, valueNativeType;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((value_ != null) && value_)) {
        errors.unshift("Missing required value in-parameter.");
        break;
      }
      valueNativeType = Object.prototype.toString.call(value_);
      if (valueNativeType !== constrainToJavaScriptType_) {
        errors.unshift("Invalid request value type '" + valueNativeType + ". Expected reference to '" + constrainToJavaScriptType_ + "'.");
        break;
      }
      cidsResponse = CIDS.setCID({
        ref: {
          value: value_
        },
        cname: onmClassName_
      });
      if (cidsResponse.error) {
        errors.unshift(cidsResponse.error);
        break;
      }
    }
    if (errors.length) {
      response.error = errors.join(' ');
    } else {
      response.result = cidsResponse.result;
    }
    return response;
  };

  PODS.wrapDAB = function(dabString_) {
    var response;
    response = PODS.wrapXPOD(dabString_, '[object String]', 'DAB');
    if (response.error) {
      response.error = "onm.wrapDAB: " + response.error;
    }
    return response;
  };

  PODS.wrapDATA = function(dataObject_) {
    var response;
    response = PODS.wrapXPOD(dataObject_, '[object Object]', 'DATA');
    if (response.error) {
      response.error = "onm.wrapDATA: " + response.error;
    }
    return response;
  };

  PODS.wrapJSON = function(jsonString_) {
    var response;
    response = PODS.wrapXPOD(jsonString_, '[object String]', 'JSON');
    if (response.error) {
      response.error = "onm.wrapJSON: " + response.error;
    }
    return response;
  };

  PODS.wrapRIS = function(risString_) {
    var response;
    response = PODS.wrapXPOD(risString_, '[object String]', 'RIS');
    if (response.error) {
      response.error = "onm.wrapRIS: " + response.error;
    }
    return response;
  };

}).call(this);
