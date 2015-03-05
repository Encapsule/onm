
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
  var CIDS, xRIP_ReadablePathGenerator;

  CIDS = require('../../cids/cids');


  /*
      request = {
          address: onm.Address reference
          uriFormat: optional boolean flag (defaults to false)
      }
      response = {
          error: null or string explaining why result === null
          result: onm-format readable path string, undefined (if uriFormat), or null to indicate error
      }
      Note: If specified, request.uriFormat indicates that the routine should not include
      a token for the base namespace of the address (i.e. the root address). xRIP_URIVectorGenerator
      requires this functionality.
   */

  xRIP_ReadablePathGenerator = module.exports = function(request_) {
    var cidsResponse, errors, evaluateAddress, inBreakScope, index, pathTokens, response, uriFormat;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_ != null) && request_)) {
        errors.unshift = "Missing requires request object in-parameter.";
        break;
      }
      if (!((request_.address != null) && request_.address)) {
        errors.unshift = "Invalid request object missing required property 'address'.";
        break;
      }
      cidsResponse = CIDS.assertCNAME({
        ref: request_.address,
        cname: 'Address'
      });
      if (cidsResponse.error) {
        errors.unshift(cidsResponse.error);
        break;
      }
      uriFormat = (request_.uriFormat != null) && request_.uriFormat || false;
      index = 0;
      pathTokens = [];
      evaluateAddress = function(parentAddress_) {
        var key, model;
        if (!(uriFormat && index++)) {
          return false;
        }
        model = parentAddress_.getModel();
        if (model.namespaceType !== 'component') {
          pathTokens.push(model.jsonTag);
          return true;
        }
        key = parentAddress_.implementation.getLastToken().key;
        return pathTokens.push((key != null) && key || model.jsonTag);
      };
      request_.address.visitParentAddressesAscending(evaluateAddress);
      evaluateAddress(request_.address);
      if (!pathTokens.length) {
        if (!uriFormat) {
          errors.unshfit("Internal error: pathTokens array is empty?");
        }
        break;
      }
      response.result = ((pathTokens.length > 1) && (pathTokens.join('.'))) || pathTokens[0];
    }
    if (errors.length) {
      errors.unshift("xRIP.generate.vector.uri failed:");
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
