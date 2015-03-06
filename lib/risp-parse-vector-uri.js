
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
  var xRIP_ReadablePathParser, xRIP_URIVectorParser;

  xRIP_ReadablePathParser = require('./risp-parse-path-readable');


  /*
      request = {
          model: reference to an onm.Model
          xriTokens: array of top-level xRI string tokens (minus vector prefix token)
      }
      response = {
          error: null or string explaining why result === null
          result: reference to an onm.Address or null
      }
   */

  xRIP_URIVectorParser = module.exports = function(request_) {
    var errors, inBreakScope, model, parseReadablePathResponse, response, uriEncodedModelId, xriTokens;
    errors = [];
    response = {
      error: null,
      result: null
    };
    xriTokens = request_.xriTokens;
    model = request_.model;
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      uriEncodedModelId = xriTokens.shift();
      if (uriEncodedModelId !== model.uuid) {
        errors.unshift("URI in address space '" + uriEncodedModelId + "' cannot be decoded using model '" + model.uuid + ":" + model.uuidVersion + "'.");
        break;
      }
      if (!xriTokens.length) {
        response.result = request_.model.address("*");
        break;
      }
      parseReadablePathResponse = xRIP_ReadablePathParser({
        model: request_.model,
        xriTokens: xriTokens,
        uriFormat: true
      });
      if (!parseReadablePathResponse.error) {
        response.result = parseReadablePathResponse.result;
      } else {
        errors.unshift(parseReadablePathResponse.error);
      }
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
