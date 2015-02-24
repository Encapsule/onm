
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
  var Address, AddressDetails, AddressToken;

  AddressToken = require('./onm-address-token');

  Address = require('../../onm-address');

  module.exports = AddressDetails = (function() {
    function AddressDetails(address_, model_, tokenVector_) {
      var exception, token, _i, _len, _ref;
      try {
        this.address = ((address_ != null) && address_) || (function() {
          throw new Error("Internal error missing address input parameter.");
        })();
        this.model = ((model_ != null) && model_) || (function() {
          throw new Error("Internal error missing model input paramter.");
        })();
        this.getModelPath = (function(_this) {
          return function() {
            var exception, lastToken;
            try {
              if (!_this.tokenVector.length) {
                throw new Error("Invalid address contains no address tokens.");
              }
              lastToken = _this.getLastToken();
              return lastToken.namespaceDescriptor.path;
            } catch (_error) {
              exception = _error;
              throw new Error("getModelPath failure: " + exception.message);
            }
          };
        })(this);
        this.getModelDescriptorFromSubpath = (function(_this) {
          return function(subpath_) {
            var archetypeDescriptor, archetypePathId, currentDescriptor, currentModelPath, exception, subpathTokens, token, _i, _len;
            try {
              currentModelPath = _this.getModelPath();
              currentDescriptor = _this.getLastToken().namespaceDescriptor;
              subpathTokens = subpath_.split('.');
              for (_i = 0, _len = subpathTokens.length; _i < _len; _i++) {
                token = subpathTokens[_i];
                if (currentDescriptor.namespaceType !== "extensionPoint" || currentDescriptor.children.length) {
                  currentModelPath += "." + token;
                  currentDescriptor = _this.model.implementation.getNamespaceDescriptorFromPath(currentModelPath);
                } else {
                  archetypePathId = (currentDescriptor.archetypePathId != null) && currentDescriptor.archetypePathId || (function() {
                    throw new Error('WAT');
                  })();
                  archetypeDescriptor = _this.model.implementation.getNamespaceDescriptorFromPathId(archetypePathId);
                  if (token !== archetypeDescriptor.jsonTag) {
                    throw new Error("Expected component name of '" + token + "' but instead found '" + archetypeDescriptor.jsonTag + "'.");
                  }
                  currentModelPath = archetypeDescriptor.path;
                  currentDescriptor = archetypeDescriptor;
                }
              }
              return currentDescriptor;
            } catch (_error) {
              exception = _error;
              throw new Error("getModelDescriptorFromSubpath failure: " + exception.message);
            }
          };
        })(this);
        this.createSubpathIdAddress = (function(_this) {
          return function(pathId_) {
            var addressedComponentDescriptor, addressedComponentToken, exception, newAddress, newToken, newTokenVector, targetNamespaceDescriptor;
            try {
              if (!((pathId_ != null) && pathId_ > -1)) {
                throw new Error("Missing namespace path ID input parameter.");
              }
              addressedComponentToken = _this.getLastToken();
              addressedComponentDescriptor = addressedComponentToken.componentDescriptor;
              targetNamespaceDescriptor = _this.model.implementation.getNamespaceDescriptorFromPathId(pathId_);
              if (targetNamespaceDescriptor.idComponent !== addressedComponentDescriptor.id) {
                throw new Error("Invalid path ID specified does not resolve to a namespace in the same component as the source address.");
              }
              newToken = new AddressToken(_this.model, addressedComponentToken.idExtensionPoint, addressedComponentToken.key, pathId_);
              newTokenVector = _this.tokenVector.length > 0 && _this.tokenVector.slice(0, _this.tokenVector.length - 1) || [];
              newTokenVector.push(newToken);
              newAddress = new Address(_this.model, newTokenVector);
              return newAddress;
            } catch (_error) {
              exception = _error;
              throw new Error("createSubpathIdAddress failure: " + exception.message);
            }
          };
        })(this);
        this.pushToken = (function(_this) {
          return function(token_) {
            var exception, parentToken;
            try {
              if (_this.tokenVector.length) {
                parentToken = _this.tokenVector[_this.tokenVector.length - 1];
                _this.validateTokenPair(parentToken, token_);
              }
              _this.tokenVector.push(token_.clone());
              if (token_.componentDescriptor.id === 0) {
                _this.complete = true;
              }
              if (token_.keyRequired) {
                _this.keysRequired = true;
              }
              if (!token_.isQualified()) {
                _this.keysSpecified = false;
              }
              _this.humanReadableString = void 0;
              _this.hashString = void 0;
              return _this.address;
            } catch (_error) {
              exception = _error;
              throw new Error("pushToken failure: " + exception.message);
            }
          };
        })(this);
        this.validateTokenPair = function(parentToken_, childToken_) {
          var exception;
          try {
            if (!((parentToken_ != null) && parentToken_ && (childToken_ != null) && childToken_)) {
              throw new Error("Internal error: input parameters are not correct.");
            }
            if (parentToken_.namespaceDescriptor.id !== childToken_.extensionPointDescriptor.id) {
              throw new Error("Child token is invalid because the parent token does not select the required extension point namespace.");
            }
            return true;
          } catch (_error) {
            exception = _error;
            throw new Error("validateTokenPair the specified parent and child tokens are incompatible and cannot be used to form an address: " + exception.message);
          }
        };
        this.getLastToken = (function(_this) {
          return function() {
            var exception;
            try {
              if (!_this.tokenVector.length) {
                throw new Error("Illegal call to getLastToken on uninitialized address class instance.");
              }
              return _this.tokenVector[_this.tokenVector.length - 1];
            } catch (_error) {
              exception = _error;
              throw new Error("getLastToken failure: " + exception.message);
            }
          };
        })(this);
        this.getDescriptor = (function(_this) {
          return function() {
            var exception;
            try {
              return _this.getLastToken().namespaceDescriptor;
            } catch (_error) {
              exception = _error;
              throw new Error("getDescriptor failure: " + exception.message);
            }
          };
        })(this);
        this.tokenVector = [];
        this.parentExtensionPointId = -1;
        this.complete = false;
        this.keysRequired = false;
        this.keysSpecified = true;
        _ref = (tokenVector_ != null) && tokenVector_ || [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          token = _ref[_i];
          this.pushToken(token);
        }
        this.parentAddressesAscending = void 0;
        this.parentAddressesDescending = void 0;
        this.subnamespaceAddressesAscending = void 0;
        this.subnamespaceAddressesDescending = void 0;
        this.subcomponentAddressesAscending = void 0;
        this.subcomponentsAddressesDescending = void 0;
        this.humanReadableString = void 0;
        this.hashString = void 0;
      } catch (_error) {
        exception = _error;
        throw new Error("AddressDetails failure: " + exception.message);
      }
    }

    return AddressDetails;

  })();

}).call(this);
