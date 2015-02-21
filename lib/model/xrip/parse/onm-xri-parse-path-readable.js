
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

  Address = require('../../../onm-address');

  AddressToken = require('../../../address/onm-address-token');


  /*
      request = {
          model: reference to onm.Model
          addressBase: optional reference to an onm.Address
          xriTokens: array of top-level xRI string tokens (path should be xriTokens[0])
          uriFormat: false (default) true to indicate that path omits the root namespace name
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
    var action, addressBase, addressTokenVector, childDescriptor, childStrings, currentAddressToken, currentToken, detailLevelMessage, errors, generateNewToken, inBreakScope, index, key, model, nsDescriptorCurrent, nsDescriptorNew, pathMetaString, pathString, pathToken, pathTokenIndex, pathTokens, response, sourceTokenVector, topLevelMessage, unparsedPath, uriFormat, validPath, xriTokens, _i, _j, _len, _len1, _ref, _ref1;
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
    pathMetaString = (xriTokens.length && xriTokens.join(':')) || void 0;
    model = request_.model;
    addressBase = request_.addressBase;
    uriFormat = (request_.uriFormat != null) && request_.uriFormat || false;
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!pathTokens.length) {
        response.result = (addressBase != null) && addressBase || request_.model.createRootAddress();
        break;
      }
      pathTokenIndex = 0;
      if (!((addressBase != null) && addressBase)) {
        if (!uriFormat) {
          pathToken = pathTokens[pathTokenIndex++];

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
        }
        currentAddressToken = new AddressToken(model, void 0, void 0, 0);
      } else {
        index = 0;
        sourceTokenVector = addressBase.implementation.tokenVector;
        while (index < (sourceTokenVector.length - 1)) {
          addressTokenVector.push(sourceTokenVector[index++].clone());
        }
        currentAddressToken = sourceTokenVector[sourceTokenVector.length - 1].clone();
      }
      while (pathTokenIndex < pathTokens.length) {
        pathToken = pathTokens[pathTokenIndex++];
        if (errors.length) {
          break;
        }
        nsDescriptorCurrent = currentAddressToken.namespaceDescriptor;
        generateNewToken = (nsDescriptorCurrent.namespaceType === 'extensionPoint') && true || false;
        if (!generateNewToken) {
          nsDescriptorNew = null;
          _ref = nsDescriptorCurrent.children;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            childDescriptor = _ref[_i];
            if (pathToken === childDescriptor.jsonTag) {
              nsDescriptorNew = childDescriptor;
              break;
            }
          }
          if (!((nsDescriptorNew != null) && nsDescriptorNew)) {
            validPath = pathTokenIndex && ("" + ((pathTokens.slice(0, pathTokenIndex - 1)).join('.')) + ".") || '';
            unparsedPath = (pathTokenIndex < pathTokens.length) && ("." + ((pathTokens.slice(pathTokenIndex, pathTokens.length)).join('.'))) || '';
            topLevelMessage = "Path token " + pathTokenIndex + ", '" + validPath + ">>>" + pathToken + "<<<" + unparsedPath + "', vectors outside model's address space.";
            if (!nsDescriptorCurrent.children.length) {
              detailLevelMessage = "Hint: parent namespace '" + nsDescriptorCurrent.jsonTag + "' is a leaf namespace with no declared children.";
            } else {
              detailLevelMessage = "Hint: parent namespace '" + nsDescriptorCurrent.jsonTag + "' declares child namespace(s):";
              childStrings = [];
              _ref1 = nsDescriptorCurrent.children;
              for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
                childDescriptor = _ref1[_j];
                childStrings.unshift(" '" + childDescriptor.jsonTag + "' of type '" + childDescriptor.namespaceType + "'");
              }
              detailLevelMessage += "" + (childStrings.join(',')) + ".";
            }
            errors.unshift(detailLevelMessage);
            errors.unshift(topLevelMessage);
            break;
          }
          currentAddressToken = new AddressToken(model, currentAddressToken.idExtensionPoint, currentAddressToken.key, nsDescriptorNew.id);
        } else {
          addressTokenVector.push(currentAddressToken);
          key = (!((pathToken === "+") || (pathToken === nsDescriptorCurrent.jsonTag))) && pathToken || void 0;
          currentAddressToken = new AddressToken(model, nsDescriptorCurrent.id, key, nsDescriptorCurrent.archetypePathId);
        }
      }
      if (!errors.length) {
        addressTokenVector.push(currentAddressToken);
        response.result = new Address(model, addressTokenVector);
      }
    }
    if (errors.length) {
      response.error = errors.join(' ');
    } else if ((pathMetaString != null) && pathMetaString) {
      response.result.pathMetaString = pathMetaString;
    }
    return response;
  };

}).call(this);
