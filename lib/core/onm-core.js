
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
  var DAOS, JNSP, RASP, RISP, RLTP, classRegistry, onm, operationMap, wrapType;

  classRegistry = require('../common/onm-class-registry');

  operationMap = require('./onm-core-operation-map');

  DAOS = require('./doas/doas');

  JNSP = require('./jnsp/jnsp');

  RASP = require('./rasp/rasp');

  RISP = require('./risp/risp');

  RLTP = require('./rltp/rltp');


  /* Largely Misunderstood Addressable Object (LMAO) is onm core's main request processor. */

  onm = module.exports = {};


  /*
      request = {
          input: [] // an array of one or more onm core objects to use as context for the request
          outputType: // the onm class type of the requested output
          options: {} // operation-specific options object
      }
      response: {
          error: null // or a string explaining why result is null
          result: null // to indicate an error or the requested onm core object if successful
      }
   */

  onm.request = function(request_) {
    var coreObject, errors, inBreakScope, inputObjectNames, inputSpec, inputType, onmClassType, opID, opTokens, operationDescriptor, optionsType, outputSpec, outputTypeType, requestType, response, sortedInputNames, _i, _len, _ref;
    errors = [];
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
        errors = "Invalid request type. Expected reference to '[object Object]'.";
        break;
      }
      if (!((request_.inputs != null) && request_.inputs)) {
        errors.unshift("Invalid request object missing 'input' property.");
        break;
      }
      inputType = Object.prototype.toString.call(request_.input);
      if (inputType !== '[object Array]') {
        errors.unshift("Invalid request object 'input' value type. Expected reference to '[object Array]].");
        break;
      }
      optionsType = Object.prototype.toString.call(request_.options);
      if ((request_.options != null) && request_.options && optionsType !== '[object Object]') {
        errors.unshift("Invalid request object 'options' value type. Expected reference to '[object Object]'.");
        break;
      }
      if (!((request_.outputType != null) && request_.outputType)) {
        errors.unshift("Invalid request object missing 'outputType' property.");
        break;
      }
      outputTypeType = Object.prototype.toString.call(request_.outputType);
      if (outputTypeType !== '[object String]') {
        errors.unshift("Invalid request object 'outputType' value type. Expected '[object String]'.");
        break;
      }
      inputObjectNames = [];
      _ref = request_.inputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        coreObject = _ref[_i];
        onmClassType = classRegistry.lookup(coreObject.onmClassType);
        if (!((onmClassType != null) && onmClassType)) {
          errors.unshift("Invalid request object 'inputs' array contains illegal, non-onm, object type '" + (Object.prototype.toString.call(coreObject)) + "'.");
          break;
        }
        inputObjectNames.push(onmClassType);
      }
      if (errors.length) {
        break;
      }
      opTokens = request_.inputs.sort(function(a_, b_) {
        return a_.localeCompare(b_);
      });
      opID = "" + request_.outputType + "<=" + (opTokens.join(':'));
      operationDescriptor = operationMap[opId];
      if (!((operationDescriptor != null) && operationDescriptor)) {
        sortedInputNames = inputObjectNames.sort(function(a_, b_) {
          return a_.localeCompare(b_);
        });
        inputSpec = "[ " + (sortedInputNames.join(',')) + " ]";
        outputSpec = "[ " + classRegistry.lookup[request_.outputType] + " ]";
        errors.unshift("Sorry. No registered transform from '" + inputSpec + "' to '" + outputSpec + ".");
        break;
      }
    }
    if (errors.length) {
      errors.unshift("onm.request failed:");
      result.error = errors.join(' ');
    }
    return response;
  };

  wrapType = function(value_, expectedNativeType, onmClassName) {
    var classId, errors, inBreakScope, response, valueNativeType;
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
      if (valueNativeType !== expectedNativeType) {
        errors.unshift("Invalid request value type '" + valueNativeType + ". Expected reference to '" + expectedNativeType_ + "'.");
        break;
      }
      classId = classRegistry.ids[onmClassName];
      if ((classId == null) && classId) {
        errors.unshift("Invalid request specifies unknown wrapper type '" + onmClassName + "'.");
        break;
      }
      response.result = {
        onmClassType: classId,
        value: value_
      };
    }
    if (errors.length) {
      result.error = errors.join(' ');
    }
    return response;
  };

  onm.wrapDAB = function(dabString_) {
    var response;
    response = wrapType(dabString_, '[object String]', 'DAB');
    if (response.error) {
      response.error = "onm.wrapDAB: " + response.error;
    }
    return response;
  };

  onm.wrapDATA = function(dataObject_) {
    var response;
    response = wrapType(dataObject_, '[object Object]', 'DATA');
    if (response.error) {
      response.error = "onm.wrapDATA: " + response.error;
    }
    return response;
  };

  onm.wrapJSON = function(jsonString_) {
    var response;
    response = wrapType(jsonString_, '[object String]', 'JSON');
    if (response.error) {
      response.error = "onm.wrapJSON: " + response.error;
    }
    return response;
  };

  onm.wrapRIS = function(risString_) {
    var response;
    response = wrapType(risString_, '[object String]', 'RIS');
    if (response.error) {
      response.error = "onm.wrapRIS: " + response.error;
    }
    return response;
  };

}).call(this);
