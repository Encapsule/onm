
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
  var CLUTS, cluts, clutsMaxIndex;

  CLUTS = module.exports = {};

  cluts = {
    jsTypeString: ['[object Undefined]', '[object Null]', '[object Boolean]', '[object String]', '[object Number]', '[object Object]', '[object Array]', '[object Function]'],
    jsMoniker: ['jsUndefined', 'jsNull', 'jsBoolean', 'jsString', 'jsNumber', 'jsObject', 'jsArray', 'jsFunction'],
    jsonMoniker: [null, 'jsonNull', 'jsonBoolean', 'jsonString', 'jsonNumber', 'jsonObject', 'jsonArray', null]
  };

  clutsMaxIndex = cluts.jsTypeString.length;


  /*
      CLUTS is not clutzy.
      request = {
          uMoniker: string moniker of the source value (indicates its type)
          vMoniker: string moniker of the destination value (indicates its type)
          value: JavaScript reference expected to refer to a value of type uMoniker
      }
   */

  CLUTS.request = function(request_) {
    var errors, forwardLookup, inBreakScope, jsCode, lookupResult, request, requestType, response, rewriteRequest, skipLookup, table, valueType;
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
      if (!((request_.uMoniker != null) && request_.uMoniker)) {
        errors.unshift("Invalid request missing 'uMoniker' property.");
        break;
      }
      requestType = Object.prototype.toString.call(request_.uMoniker);
      if (requestType !== '[object String]') {
        errors.unshift("Invalid request 'uMoniker' value type. Expected reference to '[object String]'.");
        break;
      }
      request.uMoniker = request_.uMoniker;
      if (!((request_.vMoniker != null) && request_.vMoniker)) {
        errors.unshift("Invalid request missing 'vMoniker' property.");
        break;
      }
      requestType = Object.prototype.toString.call(request_.vMoniker);
      if (requestType !== '[object String]') {
        errors.unshift("Invalid request 'vMoniker' value type. Expected reference to '[object String]'.");
        break;
      }
      request.vMoniker = request_.vMoniker;
      if (request.uMoniker === request.vMoniker) {
        errors.unshift("Conversion request to convert '" + request.uMoniker + "' to reference of itself is invalid.");
        break;
      }
      valueType = Object.prototype.toString.call(request_.value);
      forwardLookup = true;
      rewriteRequest = void 0;
      switch (request.uMoniker) {
        case 'jsReference':
          console.log("HIT REWRITE REQUEST CODE PATH");
          rewriteRequest = {
            uMoniker: 'jsTypeString',
            vMoniker: request.vMoniker,
            value: Object.prototype.toString.call(request_.value)
          };
          forwardLookup = false;
          break;
        case 'jsCode':
          if (valueType !== '[object Number]') {
            errors.unshift("Invalid request 'value' type. Expected reference to '[object Number]'.");
            break;
          }
          if ((request_.value < 0) || (request_.value >= clutsMaxIndex)) {
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
          errors.unshift("Invalid request 'uMoniker' value '" + request.uMoniker + "' is not a recognized onm type alias string.");
          break;
      }
      if (errors.length) {
        errors.unshift("In request to convert of '" + request.uMoniker + "' to '" + request.vMoniker + "':");
        break;
      }
      skipLookup = !forwardLookup && request.vMoniker !== 'jsCode';
      if (!((rewriteRequest != null) && rewriteRequest)) {
        request.value = request_.value;
      } else {
        console.log("REWRITING REQUEST.");
        request = rewriteRequest;
      }
      table = cluts[forwardLookup && request.vMoniker || request.uMoniker];
      if (!((table != null) && table)) {
        errors.unshift("No conversion operator from '" + request.uMoniker + "' to '" + request.vMoniker + "'.");
        break;
      }
      console.log("STARTING LOOKUP on table '" + (JSON.stringify(table)) + "'");
      if (forwardLookup) {
        lookupResult = table[request.value];
        console.log("FORWARD LOOKUP by index value '" + request.value + "' returned '" + lookupResult + "'.");
      } else {
        lookupResult = table.indexOf(request.value);
        if (lookupResult === -1) {
          errors.unshift("Invalid request 'value' specifies unknown " + request.uMoniker + " '" + request.value + "'.");
          break;
        }
        console.log("REVERSE LOOKUP by '" + request.value + "' returned '" + lookupResult + "'.");
        if (request.vMoniker !== 'jsCode') {
          table = cluts[request.vMoniker];
          if (!((table != null) && table)) {
            errors.unshift("No conversion operator from '" + request.uMoniker + "' to '" + request.vMoniker + "'.");
            break;
          }
          jsCode = lookupResult;
          lookupResult = table[jsCode];
          if (!((lookupResult != null) && lookupResult)) {
            errors.unshift("Cannot convert value '" + request.value + "' of type '" + request.uMoniker + "' to type '" + request.vMoniker + "'.");
            break;
          }
          console.log("FORWARD LOOKUP by index value '" + jsCode + "' returned '" + lookupResult + "'.");
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
