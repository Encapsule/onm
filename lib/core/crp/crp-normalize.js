
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
  var CIDS, crp;

  CIDS = require('../cids/cids');

  crp = {};

  crp.normalize = module.exports = function(request_) {
    var errors, inBreakScope, inputsType, normalizedRequest, optionsType, outputClassType, outputTypeType, requestType, response, verbType;
    errors = [];
    normalizedRequest = void 0;
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_ != null) && request_)) {
        errors.unshift("Missing required request object in-parameter.");
        break;
      }
      requestType = Object.prototype.toString.call(request_);
      if (requestType !== '[object Object]') {
        errors.unshift("Invalid request object type. Expected reference to '[object Object]'.");
        break;
      }
      normalizedRequest = {};
      if (!((request_.verb != null) && request_.verb)) {
        errors.unshift("Invalid request missing 'verb' property.");
        break;
      }
      verbType = Object.prototype.toString.call(request_.verb);
      if (verbType !== '[object String]') {
        errors.unshift("Invalid request 'verb' value type. Expected '[object String]'.");
        break;
      }
      normalizedRequest.verb = request_.verb;
      if (!((request_.outputType != null) && request_.outputType)) {
        errors.unshift("Invalid request object missing 'outputType' property.");
        break;
      }
      outputTypeType = Object.prototype.toString.call(request_.outputType);
      if (outputTypeType !== '[object String]') {
        errors.unshift("Invalid request object 'outputType' value type. Expected '[object String]'.");
        break;
      }
      outputClassType = CIDS.CIDfromCNAME(request_.outputType);
      if (!((outputClassType != null) && outputClassType)) {
        errors.unshift("Invalid request object 'outputType' value '" + request_.outputType + "' is invalid.");
        break;
      }
      normalizedRequest.outputType = request_.outputType;
      if ((request_.inputs != null) && request_.inputs) {
        inputsType = Object.prototype.toString.call(request_.inputs);
        if (inputsType !== '[object Array]') {
          errors.unshift("Invalid request object 'inputs' value type. Expected reference to '[object Array]].");
          break;
        }
      }
      normalizedRequest.inputs = (request_.inputs != null) && request_.inputs || [];
      if ((request_.options != null) && request_.options) {
        optionsType = Object.prototype.toString.call(request_.options);
        if (optionsType !== '[object Object]') {
          errors.unshift("Invalid request object 'options' value type. Expected reference to '[object Object]'.");
          break;
        }
      }
      normalizedRequest.options = (request_.options != null) && request_.options || {};
      response.result = normalizedRequest;
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
