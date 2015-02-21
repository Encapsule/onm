
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
  var Address, Model, classRegistry, xRIP_Parser, xRIP_parsePath, xRIP_parseVector;

  classRegistry = require('../../../common/onm-class-registry');

  Model = require('../../../onm-model');

  Address = require('../../../onm-address');

  xRIP_parsePath = require('./onm-xri-parse-path');

  xRIP_parseVector = require('./onm-xri-parse-vector');


  /*
      request = {
          model: required reference to an onm.Model object to use to decode the xRI string
          addressBase: reference to an onm.Address, undefined, or null
                       if xri specifies a path, addressBase is optional
                       if xri specifies a vector, addressBase must be undefined, or null
          xri: onm-format string. Supports path, relative path, URI, and LRI variants.
      }
      response = {
          error: null or string explaining why result === null
          result: onm.Address reference or null to indicate error
      }
   */

  xRIP_Parser = module.exports = function(request_) {
    var addressBase, errors, inBreakScope, model, parsePathResponse, parseVectorResponse, response, xri, xriCategory, xriTokens, xriType;
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
      if (!((request_.model != null) && request_.model)) {
        errors.unshift("Invalid request object missing required property 'model'.");
        break;
      }
      if (classRegistry.lookup[request_.model.onmClassType] !== 'Model') {
        errors.unshift("Invalid request object 'model' value type. Expected reference to onm.Model instance.");
        break;
      }
      if (!((request_.xri != null) && request_.xri)) {
        errors.unshift("Invalid request object missing required property 'xri'.");
        break;
      }
      xriType = Object.prototype.toString.call(request_.xri);
      if (xriType !== '[object String]') {
        errors.unshift("Invalid request object 'xri' value type '" + xriType + "'. Expected string reference.");
        break;
      }
      model = request_.model;
      xri = request_.xri;
      addressBase = (request_.addressBase != null) && request_.addressBase || void 0;
      xriTokens = xri.split(':');
      xriCategory = ((xriTokens.length === 1) && "path") || ((xriTokens.length > 1) && "vector") || "wat";
      switch (xriCategory) {
        case 'path':
          if ((addressBase != null) && addressBase) {
            if (classRegistry.lookup[addressBase.onmClassType] !== 'Address') {
              errors.unshift("Invalid request object 'addressBase' value. Expected onm.Address reference.");
              break;
            }
          }
          parsePathResponse = xRIP_parsePath({
            model: model,
            addressBase: addressBase,
            xriTokens: xriTokens
          });
          if (!parsePathResponse.error) {
            response.result = parsePathResponse.result;
          } else {
            errors.unshift(parsePathResponse.error);
          }
          break;
        case 'vector':
          if ((addressBase != null) && addressBase) {
            errors.unshift("Invalid request object sets 'addressBase' value in the context of a vector xRI parse.");
            break;
          }
          parseVectorResponse = xRIP_parseVector({
            model: model,
            xriTokens: xriTokens
          });
          if (!parseVectorResponse.error) {
            response.result = parseVectorResponse.result;
          } else {
            errors.unshift(parseVectorResponse.error);
          }
          break;
        default:
          errors.unshift("xRI string value is not even wrong.");
          break;
      }
    }
    if (errors.length) {
      if ((xri != null) && xri) {
        errors.unshift("xRIP.parse '" + xri + "' failed:");
      } else {
        errors.unshift("xRIP.parse failed:");
      }
      response.error = errors.join(" ");
    }
    return response;
  };

}).call(this);