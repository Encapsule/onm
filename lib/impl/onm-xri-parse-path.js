
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
    request = {
        model: required reference to an onm.Model
        addressBase: optional reference to an onm.Address
        xri: a string that the caller asserts is an onm-format path string.
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }
 */

(function() {
  var xRIP_PathParser;

  xRIP_PathParser = module.exports = function(request_) {
    var addressBase, ascending, errors, exception_, generations, inBreakScope, response, rootNamespaceName, token, unresolvedPath, xriTokens2, _i, _len;
    errors = [];
    response = {
      error: null,
      result: null
    };
    addressBase = request_.addressBase;
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      xriTokens2 = request_.xri.split('.');
      generations = 0;
      ascending = false;
      for (_i = 0, _len = xriTokens2.length; _i < _len; _i++) {
        token = xriTokens2[_i];
        if (token === '//') {
          if (ascending) {
            errors.unshift("Path contains illegal namespace descent after ascent.");
            break;
          } else {
            generations++;
          }
        } else {
          ascending = true;
        }
      }
      if (errors.length) {
        break;
      }
      if (generations && ((!((addressBase != null) && addressBase)) || ((addressBase.implementation.getDescriptor().parentPathIdVector.length - generations) < 0))) {
        errors.unshift("Path contains illegal descent below the model's root namespace.");
        break;
      }
      if (generations && (addressBase != null) && addressBase) {
        try {
          addressBase = addressBase.createParentAddress(generations);
          if (!((addressBase != null) && baseAddress)) {
            errors.unshift("Internal error evaluating requested " + generations + "-level namespace descent.");
            break;
          }
        } catch (_error) {
          exception_ = _error;
          errors.unshift("Internal error evaluating requested " + generations + "-level namespace descent.");
          break;
        }
        if (!(xriTokens2.length - generations)) {
          response.result = addressBase;
          break;
        }
      }
      if (!((addressBase != null) && addressBase)) {
        if (!xriTokens2.length) {
          errors.unshift("Null path cannot be resolved against the model's anonymous.");
          break;
        }
        addressBase = request_.model.createRootAddress();
        token = xriTokens2.shift();
        rootNamespaceName = addressBase.implementation.getDescriptor().jsonTag;
        if (token !== rootNamespaceName) {
          errors.unshift("'" + addressBase.model.uuid + ":" + addressBase.model.uuidVersion + "'.");
          errors.unshift("Expected name '" + rootNamespaceName + "' to enter address space ");
          errors.unshift("Invalid root namespace name '" + token + "'.");
          break;
        }
      }
      try {
        unresolvedPath = (xriTokens2.slice(generations, xriTokens2.length)).join('.');
        response.result = addressBase.createSubpathAddress(unresolvedPath);
      } catch (_error) {
        exception_ = _error;
        errors.unshift(exception_.message);
        errors.unshift("Path identifies a resource outside the model's address space.");
        break;
      }
    }
    if (errors.length) {
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);
