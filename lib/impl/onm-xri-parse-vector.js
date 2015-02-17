
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
  var xRIP_LRIVectorParser, xRIP_URIVectorParser, xRIP_VectorParser;

  xRIP_LRIVectorParser = require('./onm-xri-parse-vector-lri');

  xRIP_URIVectorParser = require('./onm-xri-parse-vector-uri');


  /*
      request = {
          model: reference to the onm.Model to use as the decoding reference
          xriTokens: array of top-level xRI string tokens
      }
      response = {
          error: null or string explaining why result === null
          result: reference to an onm.Address or null
      }
   */

  xRIP_VectorParser = module.exports = function(request_) {
    var addressBase, errors, inBreakScope, response, vectorParseRequest, vectorParseResponse, vectorPrefixToken, xriTokens;
    errors = [];
    response = {
      error: null,
      result: null
    };
    xriTokens = request_.xriTokens;
    addressBase = request_.addressBase;
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      vectorPrefixToken = xriTokens.shift();
      vectorParseRequest = {
        addressBase: addressBase,
        xriTokens: xriTokens
      };
      switch (vectorPrefixToken) {
        case 'onm-uri':
          vectorParseResponse = xRIP_URIVectorParser(vectorParseRequest);
          break;
        case 'onm-lri':
          vectorParseResponse = xRIP_LRIVectorParser(vectorParseRequest);
          break;
        default:
          errors.unshift("invalid vector xRI type '" + vectorPrefixToken + "'. Expected either 'onm-uri', or 'onm-lri'.");
          break;
      }
      if (errors.length) {
        break;
      }
      if (!vectorParseResponse.error) {
        response.result = vectorParseResponse.result;
      } else {
        errors.unshift(vectorParseResponse.error);
      }
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
