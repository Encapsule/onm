
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
  var Address, AddressToken, xRIP_LRIVectorParser;

  Address = require('../../../onm-address');

  AddressToken = require('../../../address/onm-address-token');


  /*
      request = {
          model: reference to onm.Model
          xriTokens: array of top-level xRI string tokens (minus vector prefix token)
      }
      response = {
          error: null or string explaining why result === null
          result: reference to an onm.Address or null
      }
   */

  xRIP_LRIVectorParser = module.exports = function(request_) {
    var addressTokenCurrent, addressTokenVector, errors, exception_, hashPath, hashPathTokens, hashToken, inBreakScope, key, lriEncodedModelVersionId, model, nsDescriptorComponent, nsDescriptorCurrent, outsideAddressSpaceError, response, xriTokens;
    errors = [];
    response = {
      error: null,
      result: null
    };
    model = request_.model;
    xriTokens = request_.xriTokens;
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      lriEncodedModelVersionId = xriTokens.shift();
      if (lriEncodedModelVersionId !== model.uuidVersion) {
        errors.unshift("LRI in address space '" + lriEncodedModelVersionId + "' cannot be decoded using model '" + model.uuid + ":" + model.uuidVersion + "'.");
        break;
      }
      if (!xriTokens.length) {
        response.result = model.address("*");
        break;
      }
      hashPath = xriTokens.shift();
      hashPathTokens = hashPath.split('.');
      addressTokenVector = [];
      addressTokenCurrent = new AddressToken(model, void 0, void 0, 0);
      while (hashPathTokens.length) {
        hashToken = hashPathTokens.shift();
        outsideAddressSpaceError = false;
        nsDescriptorCurrent = addressTokenCurrent.namespaceDescriptor;
        switch (nsDescriptorCurrent.namespaceType) {
          case 'extensionPoint':
            nsDescriptorComponent = model.implementation.getNamespaceDescriptorFromPathId(nsDescriptorCurrent.archetypePathId);
            switch (hashToken) {
              case nsDescriptorComponent.jsonTag:
                key = void 0;
                break;
              case '+':
                key = void 0;
                break;
              default:
                key = hashToken;
                break;
            }
            addressTokenVector.push(addressTokenCurrent);
            try {
              addressTokenCurrent = new AddressToken(model, addressTokenCurrent.idNamespace, key, nsDescriptorComponent.id);
            } catch (_error) {
              exception_ = _error;
              outsideAddressSpaceError = true;
            }
            break;
          default:
            try {
              addressTokenCurrent = new AddressToken(model, addressTokenCurrent.idExtensionPoint, addressTokenCurrent.key, parseInt(hashToken));
            } catch (_error) {
              exception_ = _error;
              outsideAddressSpaceError = true;
            }
            break;
        }
        if (outsideAddressSpaceError) {
          errors.unshift("LRI identifies a namespace resource outside the declared address space of model '" + model.uuid + ":" + model.uuidVersion + " address space.");
          break;
        }
      }
      if (errors.length) {
        break;
      }
      addressTokenVector.push(addressTokenCurrent);
      response.result = new Address(model, addressTokenVector);
    }
    if (errors.length) {
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
