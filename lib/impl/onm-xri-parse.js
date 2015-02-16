
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
  var Address, xRIP_Parser, xRIP_parsePath, xRIP_parseVector;

  Address = require('../onm-address');

  xRIP_parsePath = require('./onm-xri-parse-path');

  xRIP_parseVector = require('./onm-xri-parse-vector');

  xRIP_Parser = module.exports = function(request_) {
    var addressBase, errors, inBreakScope, parsePathResponse, parseVectorResponse, response, xri, xriCategory, xriTokens, xriType;
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
      if (!((request_.xri != null) && request_.xri)) {
        errors.unshift("Invalid request object missing required property 'xri'.");
        break;
      }
      xriType = Object.prototype.toString.call(request_.xri);
      if (xriType !== '[object String]') {
        errors.unshift("Invalid resource identifier type '" + xriType + "'. Expected '[object String]'.");
        break;
      }
      if (!((request_.addressBase != null) && request_.addressBase)) {
        errors.unshift("Invalid request object missing required property 'addressBase'.");
        break;
      }
      if (!(request_.addressBase instanceof Address)) {
        errors.unshift("Invalid base address object type '" + (typeof baseAddressType) + "'. Expected onm.Address reference.");
        break;
      }
      xri = request_.xri;
      addressBase = request_.addressBase;
      xriTokens = xri.split(':');
      xriCategory = (xriTokens.length > 1) && 'vector' || 'path';
      switch (xriCategory) {
        case 'path':
          parsePathResponse = xRIP_parsePath({
            addressBase: request_.addressBase,
            xri: xriTokens[0]
          });
          if (!parsePathResponse.error) {
            response.result = parsePathResponse.result;
          } else {
            errors.unshift(parsePathResponse.error);
          }
          break;
        case 'vector':
          parseVectorResponse = xRIP_parseVector({
            addressBase: request_.addressBase,
            xriTokens: xriTokens
          });
          if (!parseVectorResponse.error) {
            response.result = parseVectorResponse.result;
          } else {
            errors.unshift(parseVectorResponse.error);
          }
          break;
      }
    }
    if (errors.length) {
      errors.unshift("onm.xRIParser failed:");
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);
