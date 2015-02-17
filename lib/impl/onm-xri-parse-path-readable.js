
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
  var Address, AddressToken, xriReadablePathParser;

  AddressToken = require('./onm-address-token');

  Address = require('../onm-address');


  /*
      request = {
          model: reference to onm.Model
          addressBase: optional reference to an onm.Address
          xriTokens: array of top-level xRI string tokens (path should be xriTokens[0])
      }
      response = {
          error: null or string explaining why result === null
          result: reference to an onm.Address or null
      }
  
      If requrest.addressBase is undefined/null then the readable path is decoded relative to the model's
      anonymous namespace. Otherwise, readable path tokens are evaluated left-to-right using the namespace
      model specified by addressBase as the starting point of the path's namespace model walk.
   */

  xriReadablePathParser = module.exports = function(request_) {
    var action, addressBase, addressTokenVector, childDescriptor, currentAddressToken, currentToken, errors, generateNewToken, index, key, model, nsDescriptorCurrent, nsDescriptorNew, pathMetaString, pathString, pathToken, pathTokenIndex, pathTokens, response, sourceTokenVector, unparsedPath, validPath, xriTokens, _i, _j, _len, _len1, _ref;
    addressTokenVector = [];
    currentToken = null;
    action = null;
    errors = [];
    response = {
      error: null,
      result: null
    };
    xriTokens = request_.xriTokens;
    pathString = xriTokens.shift();
    pathTokens = (pathString != null) && pathString && pathString.length && pathString.split('.' || []);
    pathMetaString = xriTokens.length && xriTokens.join(':' || void 0);
    model = request_.model;
    addressBase = request_.addressBase;
    if (!pathTokens.length) {
      response.result = (addressBase != null) && addressBase || request_.model.createRootAddress();
      break;
    }
    if (!((addressBase != null) && addressBase)) {
      pathToken = pathTokens.shift();

      /*
          Reserved 1st path token values (and all component key positions in model ns walk)
      
          There are subtle degrees of freedom exposed by these options. Use them carefully.
      
          '*' - use an asterisk to indicate that the token should match the model's root
                namespace's declared 'jsonTag' value whatever it is. This is easy but
                completely ambiguous vs. specifying the jsonTag value literally. Or,
                using the strong URI or the stronger-yet LRI xRI forms onm provides.
      
          jsonTag - specify the model's root namespace 'jsonTag' value to make a somewhat
                ambigous but usually safe request to enter the model's address space.
      
          Prefer these colloquial forms for inner routines only that operate on base address
          references passed from outer routines that leverage the stricter URI and LRI xRI forms.
       */
      if (!((pathToken === '*') || (pathToken === model.jsonTag))) {
        errors.unshift("Expected either '*' or '" + model.jsonTag + "'.");
        errors.unshift("Path beginning with token '" + pathToken + "' cannot be parsed relative to this model's anonymous namespace.");
        break;
      }
      currentToken = new AddressToken(model, void 0, void 0, 0);
    } else {
      index = 0;
      sourceTokenVector = addressBase.implementation.tokenVector;
      while (index < (sourceTokenVector.length - 1)) {
        addressTokenVector.push(sourceTokenVector[index++].clone());
      }
      currentAddressToken = sourceTokenVector[sourceTokenVector.length - 1].clone();
    }
    pathTokenIndex = 0;
    for (_i = 0, _len = pathTokens.length; _i < _len; _i++) {
      pathToken = pathTokens[_i];
      if (errors.length) {
        break;
      }
      nsDescriptorCurrent = currentAddressToken.namespaceDescriptor;
      generateNewToken = (nsDescriptorCurrent.namespaceType === 'extensionPoint') && true || false;
      if (!generateNewToken) {
        nsDescriptorNew = null;
        _ref = nsDescriptorCurrent.children;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          childDescriptor = _ref[_j];
          if (pathToken === childDescriptor.jsonTag) {
            nsDescriptorNew = childDescriptor;
            break;
          }
        }
        if ((nsDescriptorNew == null) && nsDescriptorNew) {
          validPath = (pathTokens.slice(0, pathTokenIndex)).join('.');
          unparsedPath = (pathTokens.slice(pathTokenIndex + 1, pathTokens.length)).join('.');
          errors.unshift("Path token " + (pathTokenIndex + 1) + ": '" + validPath + "!" + pathToken + "!" + unparsedPath + "' not in modeled address space.");
          break;
        }
        currentAddressToken = new AddressToken(model, nsDescriptorCurrent.idExtensionPoint, nsDescriptorCurrent.key, nsDescriptorNew.id);
      } else {
        addressTokenVector.push(currentAddressToken);
        key = (!((pathToken === "+") || (pathToken === nsDescriptorCurrent.jsonTag))) && pathToken || void 0;
        currentAddressToken = new AddressToken(model, nsDescriptorCurrent.idNamespace, key, nsDescriptorCurrent.archetypePathId);
      }
    }
    addressTokenVector.push(currentAddressToken);
    response.result = new Address(model, addressTokenVector);
    if (errors.length) {
      response.error = errors.join(' ');
    } else if ((pathMetaString != null) && pathMetaString) {
      response.result.pathMetaString = pathMetaString;
    }
    return response;
  };

}).call(this);
