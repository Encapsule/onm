
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
  var Address, xri;

  Address = require('../onm-address');

  xri = module.exports = {};

  xri.parse = function(request_) {
    var addressBase, addressBaseType, errors, exception_, generations, inBreakScope, response, token, unresolvedPath, xriCategory, xriTokens1, xriTokens2, xriType, _i, _len;
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
      addressBaseType = Object.prototype.toString.call(request_.addressBase);
      if (!(request_.addressBase instanceof Address)) {
        errors.unshift("Invalid base address object type '" + baseAddressType + "'. Expected onm.Address reference.");
        break;
      }
      xri = request_.xri;
      addressBase = request_.addressBase;
      xriTokens1 = xri.split(':');
      xriCategory = ((xriTokens1.length >= 2) && (xriTokens1.length <= 3)) && 'vector' || 'path';
      switch (xriCategory) {
        case 'path':
          xriTokens2 = xriTokens1[0].split(".");
          generations = 0;
          for (_i = 0, _len = xriTokens2.length; _i < _len; _i++) {
            token = xriTokens2[_i];
            if (token === '//') {
              generations++;
            } else {
              break;
            }
          }
          if (generations) {
            try {
              addressBase = addressBase.createParentAddress(generations);
              if (!((addressBase != null) && baseAddress)) {
                errors.unshift("Invalid relative path xRI. Cannot descend below root namespace.");
                break;
              }
            } catch (_error) {
              exception_ = _error;
              errors.unshift(exception_.message);
              break;
            }
          }
          if (!(xriTokens2.length - generations)) {
            response.result = addressBase;
          } else {
            try {
              unresolvedPath = (xriTokens2.slice(generations, xriTokens2.length)).join('.');
              if (addressBase.isRoot()) {
                response.result = addressBase.model.createPathAddress(unresolvedPath);
              } else {
                response.result = addressBase.createSubpathAddress(unresolvedPath);
              }
            } catch (_error) {
              exception_ = _error;
              errors.unshift(exception_.message);
            }
          }
          break;
        case 'vector':
          switch (xriTokens1[0]) {
            case 'onm-uri':
              try {
                response.result = addressBase.model.addressFromURI(xri);
              } catch (_error) {
                exception_ = _error;
                errors.unshift(exception_.message);
              }
              break;
            case 'onm-lri':
              try {
                response.result = addressBase.model.addressFromLRI(xri);
              } catch (_error) {
                exception_ = _error;
                errors.unshift(exception_.message);
              }
              break;
            default:
              errors.unshift("Invalid xRI vector type '" + xriTokens1[0] + "'. Expected either 'onm-uri', or 'onm-lri'.");
              break;
          }
      }
    }
    if (errors.length) {
      errors.unshift("onm.xRIParser failed:");
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);
