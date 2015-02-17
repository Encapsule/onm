
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
        addressBase: reference to an onm.Address
        xriTokens: array of top-level xRI string tokens (minus vector prefix token)
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }
 */

(function() {
  var xRIP_URIVectorParser;

  xRIP_URIVectorParser = module.exports = function(request_) {
    var addressBase, errors, exception_, inBreakScope, response, uriEncodedModelId, xriTokens;
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
      uriEncodedModelId = xriTokens.shift();
      if (uriEncodedModelId !== addressBase.model.uuid) {
        errors.unshift("URI in address space '" + uriEncodedModelId + "' cannot be decoded using model '" + addressBase.model.uuid + ":" + addressBase.model.uuidVersion + "'.");
        break;
      }
      if (!xriTokens.length) {
        response.result = addressBase;
        break;
      }
      try {
        response.result = addressBase.model.addressFromURI(xri);
      } catch (_error) {
        exception_ = _error;
        errors.unshift(exception_.message);
      }
      break;
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
