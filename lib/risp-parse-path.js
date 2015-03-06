
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
  var xRIP_PathParser, xRIP_ReadablePathParser;

  xRIP_ReadablePathParser = require('./risp-parse-path-readable');


  /*
      request = {
          model: required reference to an onm.Model
          addressBase: optional reference to an onm.Address
          xriTokens: array of top-level xRI string tokens (complete)
      }
      response = {
          error: null or string explaining why result === null
          result: reference to an onm.Address or null
      }
   */

  xRIP_PathParser = module.exports = function(request_) {
    var addressBase, ascending, errors, exception_, generations, inBreakScope, parseReadablePathResponse, pathToken, pathTokens, response, revisedPath, xriTokens, _i, _len;
    errors = [];
    response = {
      error: null,
      result: null
    };
    addressBase = request_.addressBase;
    xriTokens = request_.xriTokens;
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      pathTokens = xriTokens[0].split('.');
      generations = 0;
      ascending = false;
      for (_i = 0, _len = pathTokens.length; _i < _len; _i++) {
        pathToken = pathTokens[_i];
        if (pathToken === '//') {
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
        errors.unshift("Path contains illegal descent into the model's anonymous namespace.");
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
        pathTokens.shift(generations);
        xriTokens.shift();
        if (pathTokens.length) {
          revisedPath = ((pathTokens.length > 1) && (pathTokens.join('.'))) || pathTokens[0];
          xriTokens.unshift(revisedPath);
        }
      }
      parseReadablePathResponse = xRIP_ReadablePathParser({
        model: request_.model,
        addressBase: addressBase,
        xriTokens: xriTokens
      });
      if (!parseReadablePathResponse.error) {
        response.result = parseReadablePathResponse.result;
      } else {
        errors.unshift(parseReadablePathResponse.error);
      }
    }
    if (errors.length) {
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);
