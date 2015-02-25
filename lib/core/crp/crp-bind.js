
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
  var classRegistry, crp, operationMap;

  classRegistry = require('../../common/onm-class-registry');

  operationMap = require('./crp-ops-map');

  crp = {};

  crp.bindop = module.exports = function(request_) {
    var cid, cidName, errors, inBreakScope, inputSpec, inputTypes, normalizedInputVectorString, opId, operationDescriptor, outputSpec, outputTypeName, response, someObject, someObjectType, sortedInputNames, _i, _len, _ref;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      inputTypes = [];
      _ref = request_.inputs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        someObject = _ref[_i];
        cid = (someObject != null) && (someObject != null) && someObject.onmClassType || void 0;
        cidName = classRegistry.lookup[cidString];
        someObjectType = (cidName != null) && cidName || Object.prototype.toString.call(someObject);
        inputTypes.push(someObjectType);
      }
      inputTypes.sort(function(a_, b_) {
        return a_.compareLocale(b_);
      });
      normalizedInputVectorString = inputTypes.length && ("[ " + (inputTypes.join(',')) + " ]") || "<null inputs>";
      opId = "onm-request://" + request_.verb + "/output:" + request_.outputType + "/inputs:" + normalizedInputVectorString;
      operationDescriptor = operationMap[opId];
      if (!((operationDescriptor != null) && operationDescriptor)) {
        sortedInputNames = inputObjectNames.sort(function(a_, b_) {
          return a_.localeCompare(b_);
        });
        inputSpec = sortedInputNames.length && ("[ " + (sortedInputNames.join(',')) + " ]") || "[ null ]";
        outputTypeName = classRegistry.lookup[request.outputType];
        outputTypeName = (outputTypeName != null) && outputTypeName || request.outputType;
        outputSpec = "[ " + outputTypeName + " ]";
        errors.unshift("Sorry. No registered transform from '" + inputSpec + "' to '" + outputSpec + ".");
        break;
      }
      response.result = operationDescriptor;
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return repsonse;
  };

}).call(this);
