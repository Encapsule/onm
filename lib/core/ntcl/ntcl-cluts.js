
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
    'jsCode:jsTypeString': ['[object Undefined]', '[object Null]', '[object Boolean]', '[object String]', '[object Number]', '[object Object]', '[object Array]', '[object Function]'],
    'jsCode:jsMoniker': ['jsUndefined', 'jsNull', 'jsBoolean', 'jsString', 'jsNumber', 'jsObject', 'jsArray', 'jsFunction'],
    'jsCode:jsonMoniker': [null, 'jsonNull', 'jsonBoolean', 'jsonString', 'jsonNumber', 'jsonObject', 'jsonArray', null]
  };

  clutsMaxIndex = cluts['jsCode:jsTypeString'].length;


  /*
      ... Is ironically quite agile ;)
      request = {
          uMoniker: string moniker of the source value (indicates its type)
          vMoniker: string moniker of the destination value (indicates its type)
          sourceValue: string moniker or integer index: integer [0, cluts.array.length-1]
      }
   */

  CLUTS.request = function(request_) {
    var errors, forwardLookup, inBreakScope, request, requestType, response, sourceValueType, table, tableKey;
    errors = [];
    response = {
      error: null,
      result: void 0
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_ != null) && request_)) {
        errors.unshift("Missing request object.");
        break;
      }
      requestType = Object.prototype.toString(request_);
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
      sourceValueType = Object.prototype.toString.call(request_.sourceValue);
      switch (sourceValueType) {
        case '[object Number]':
          if ((request_.index < 0) || (request_.index >= clutsMaxIndex)) {
            errors = "Invalid request 'sourceValue' value is numerically out of range.";
          }
          tableKey = "" + request.uMoniker + ":" + request.vMoniker;
          forwardLookup = true;
          break;
        case '[object String]':
          tableKey = "" + request.vMoniker + ":" + request.uMoniker;
          forwardLookup = false;
          break;
        default:
          errors.unshift("Invalid request 'sourceValue' value type '" + sourceValueType + "'. Expected reference to '[object String]', or '[object Number]'.");
          break;
      }
      if (errors.length) {
        break;
      }
      table = cluts[tableKey];
      if (!((table != null) && table)) {
        errors.unshift("Sorry. There is no conversion from from '" + request.sourceValue + "' of type '" + request.uMoniker + "' to value of type '" + request.vMoniker + ".");
        break;
      }
      response.result = table[request.sourceValue];
    }
    if (errors.length) {
      errors.unshift("CLUTS.request failed:");
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);
