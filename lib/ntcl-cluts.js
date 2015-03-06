
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
    CLUTS alerts and prevents clumsy type-related JavaScript/JSON programming
    errors by normalizing testing of JavaScript references and free conversion
    among several different identifier formats used through onm core and exposed
    publicly in, for example, the ASM for NSD's.
 */

(function() {
  'use strict';
  var CLUTS, cluts;

  cluts = {};

  cluts.jsCodes = {
    jsUndefined: 0,
    jsNull: 1,
    jsBoolean: 2,
    jsString: 3,
    jsNumber: 4,
    jsObject: 5,
    jsArray: 6,
    jsFunction: 7
  };

  cluts.dimensions = ['jsReference', 'jsCode', 'jsTypeString', 'jsMoniker', 'jsonMoniker'];

  cluts.jsTypeString = ['[object Undefined]', '[object Null]', '[object Boolean]', '[object String]', '[object Number]', '[object Object]', '[object Array]', '[object Function]'];

  cluts.jsMoniker = ['jsUndefined', 'jsNull', 'jsBoolean', 'jsString', 'jsNumber', 'jsObject', 'jsArray', 'jsFunction'];

  cluts.jsonMoniker = [null, 'jsonNull', 'jsonBoolean', 'jsonString', 'jsonNumber', 'jsonObject', 'jsonArray', null];

  cluts.jsCodeMax = cluts.jsCodes.jsFunction + 1;

  Object.freeze(cluts);

  CLUTS = module.exports = {};

  CLUTS.dimensions = cluts.dimensions;

  CLUTS.jsCodes = cluts.jsCodes;


  /*
      request = {
          to: string moniker of the destination value (indicates its type)
          from: string moniker of the destination value (indicates its type)
          value: JavaScript reference expected to refer to a value of type to
      }
      response = {
          error: null or string explaining by result is null
          result: integer in range 0 to 7 inclusive (jsCode) or string (jsStringType, jsMoniker, jsonMoniker) or null to indicate error
      }
   */

  CLUTS.request = function(request_) {
    var errors, forwardLookup, inBreakScope, jsCode, lookupResult, request, requestType, response, rewriteRequest, table, valueType;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_ != null) && request_)) {
        errors.unshift("Missing request object.");
        break;
      }
      requestType = Object.prototype.toString.call(request_);
      if (requestType !== '[object Object]') {
        errors.unshift("Invalid request value type. Expected reference to '[object Object]'.");
        break;
      }
      request = {};
      if (!((request_.from != null) && request_.from)) {
        errors.unshift("Invalid request missing 'from' property.");
        break;
      }
      requestType = Object.prototype.toString.call(request_.from);
      if (requestType !== '[object String]') {
        errors.unshift("Invalid request 'from' value type. Expected reference to '[object String]'.");
        break;
      }
      request.from = request_.from;
      if (!((request_.to != null) && request_.to)) {
        errors.unshift("Invalid request missing 'to' property.");
        break;
      }
      requestType = Object.prototype.toString.call(request_.to);
      if (requestType !== '[object String]') {
        errors.unshift("Invalid request 'to' value type. Expected reference to '[object String]'.");
        break;
      }
      request.to = request_.to;
      valueType = Object.prototype.toString.call(request_.value);
      forwardLookup = true;
      rewriteRequest = void 0;
      switch (request.from) {
        case 'jsReference':
          rewriteRequest = {
            to: request.to,
            from: 'jsTypeString',
            value: Object.prototype.toString.call(request_.value)
          };
          forwardLookup = false;
          break;
        case 'jsCode':
          if (valueType !== '[object Number]') {
            errors.unshift("Invalid request 'value' type. Expected reference to '[object Number]'.");
            break;
          }
          if ((request_.value < 0) || (request_.value >= cluts.jsCodeMax)) {
            errors.unshift("Invalid request 'value' '" + request_.value + "' is not a valid 'jsCode' value.");
          }
          break;
        case 'jsMoniker' || 'jsonMoniker' || 'jsTypeString':
          if (valueType !== '[object String]') {
            errors.unshift("Invalid request 'value' type. Expected reference to '[object String]'.");
          }
          forwardLookup = false;
          break;
        default:
          errors.unshift("[" + cluts.dimensions + "].");
          errors.unshift("Invalid request 'from' value '" + request.from + "' is not a valid dimension string. Valid dimensions:");
          break;
      }
      if (errors.length) {
        errors.unshift("Invalid '" + request.from + "' to '" + request.to + "' conversion request.");
        break;
      }
      if (!((rewriteRequest != null) && rewriteRequest)) {
        request.value = request_.value;
      } else {
        request = rewriteRequest;
      }
      table = cluts[forwardLookup && request.to || request.from];
      if (!((table != null) && table)) {
        errors.unshift("[" + cluts.dimensions + "].");
        errors.unshift("No conversion operator from '" + request.from + "' to '" + request.to + "'. Valid dimensions:");
        break;
      }
      if (forwardLookup) {
        lookupResult = table[request.value];
      } else {
        lookupResult = table.indexOf(request.value);
        if (lookupResult === -1) {
          errors.unshift("[" + cluts.dimensions + "].");
          errors.unshift("Invalid request 'value' specifies unknown " + request.to + " '" + request.value + "'. Valid dimensions:");
          break;
        }
        if (request.to !== 'jsCode') {
          table = cluts[request.to];
          if (!((table != null) && table)) {
            errors.unshift("[" + cluts.dimensions + "].");
            errors.unshift("No conversion from dimension '" + request.from + "' to '" + request.to + "' available. Valid dimensions:");
            break;
          }
          jsCode = lookupResult;
          lookupResult = table[jsCode];
          if (!((lookupResult != null) && lookupResult)) {
            errors.unshift("No coversion from dimension '" + request.from + "' to '" + request.to + "' for value '" + request.value + "'.");
            break;
          }
        }
      }
      response.result = lookupResult;
    }
    if (errors.length) {
      errors.unshift("CLUTS.request failed:");
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);
