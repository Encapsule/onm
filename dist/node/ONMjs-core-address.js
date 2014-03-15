/*
------------------------------------------------------------------------------

The MIT License (MIT)

Copyright (c) 2013 Encapsule Project
  
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
  var Address, AddressDetails, AddressToken,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  AddressToken = require('./ONMjs-core-address-token');

  AddressDetails = (function() {
    function AddressDetails(address_, model_, tokenVector_) {
      var exception, token, _i, _len, _ref,
        _this = this;
      try {
        this.address = ((address_ != null) && address_) || (function() {
          throw "Internal error missing address input parameter.";
        })();
        this.model = ((model_ != null) && model_) || (function() {
          throw "Internal error missing model input paramter.";
        })();
        this.getModelPath = function() {
          var exception, lastToken;
          try {
            if (!_this.tokenVector.length) {
              throw "Invalid address contains no address tokens.";
            }
            lastToken = _this.getLastToken();
            return lastToken.namespaceDescriptor.path;
          } catch (_error) {
            exception = _error;
            throw "getModelPath failure: " + exception;
          }
        };
        this.getModelDescriptorFromSubpath = function(subpath_) {
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
                  throw 'WAT';
                })();
                archetypeDescriptor = _this.model.implementation.getNamespaceDescriptorFromPathId(archetypePathId);
                if (token !== archetypeDescriptor.jsonTag) {
                  throw "Expected component name of '" + token + "' but instead found '" + archetypeDescriptor.jsonTag + "'.";
                }
                currentModelPath = archetypeDescriptor.path;
                currentDescriptor = archetypeDescriptor;
              }
            }
            console.log(currentModelPath);
            return currentDescriptor;
          } catch (_error) {
            exception = _error;
            throw "getModelDescriptorFromSubpath failure: " + exception;
          }
        };
        this.createSubpathIdAddress = function(pathId_) {
          var addressedComponentDescriptor, addressedComponentToken, exception, newAddress, newToken, newTokenVector, targetNamespaceDescriptor;
          try {
            if (!((pathId_ != null) && pathId_ > -1)) {
              throw "Missing namespace path ID input parameter.";
            }
            addressedComponentToken = _this.getLastToken();
            addressedComponentDescriptor = addressedComponentToken.componentDescriptor;
            targetNamespaceDescriptor = _this.model.implementation.getNamespaceDescriptorFromPathId(pathId_);
            if (targetNamespaceDescriptor.idComponent !== addressedComponentDescriptor.id) {
              throw "Invalid path ID specified does not resolve to a namespace in the same component as the source address.";
            }
            newToken = new AddressToken(_this.model, addressedComponentToken.idExtensionPoint, addressedComponentToken.key, pathId_);
            newTokenVector = _this.tokenVector.length > 0 && _this.tokenVector.slice(0, _this.tokenVector.length - 1) || [];
            newTokenVector.push(newToken);
            newAddress = new Address(_this.model, newTokenVector);
            return newAddress;
          } catch (_error) {
            exception = _error;
            throw "createSubpathIdAddress failure: " + exception;
          }
        };
        this.pushToken = function(token_) {
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
            throw "pushToken failure: " + exception;
          }
        };
        this.validateTokenPair = function(parentToken_, childToken_) {
          var exception;
          try {
            if (!((parentToken_ != null) && parentToken_ && (childToken_ != null) && childToken_)) {
              throw "Internal error: input parameters are not correct.";
            }
            if (!childToken_.keyRequired) {
              throw "Child token is invalid because it specifies a namespace in the root component.";
            }
            if (parentToken_.namespaceDescriptor.id !== childToken_.extensionPointDescriptor.id) {
              throw "Child token is invalid because the parent token does not select the required extension point namespace.";
            }
            if (!parentToken_.isQualified() && childToken_.isQualified()) {
              throw "Child token is invalid because the parent token is unqualified and the child is qualified.";
            }
            return true;
          } catch (_error) {
            exception = _error;
            throw "validateTokenPair the specified parent and child tokens are incompatible and cannot be used to form an address: " + exception;
          }
        };
        this.getLastToken = function() {
          var exception;
          try {
            if (!_this.tokenVector.length) {
              throw "Illegal call to getLastToken on uninitialized address class instance.";
            }
            return _this.tokenVector[_this.tokenVector.length - 1];
          } catch (_error) {
            exception = _error;
            throw "getLastToken failure: " + exception;
          }
        };
        this.getDescriptor = function() {
          var exception;
          try {
            return _this.getLastToken().namespaceDescriptor;
          } catch (_error) {
            exception = _error;
            throw "getDescriptor failure: " + exception;
          }
        };
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
        throw "AddressDetails failure: " + exception;
      }
    }

    return AddressDetails;

  })();

  module.exports = Address = (function() {
    function Address(model_, tokenVector_) {
      this.visitExtensionPointAddresses = __bind(this.visitExtensionPointAddresses, this);
      this.visitChildAddresses = __bind(this.visitChildAddresses, this);
      this.visitSubaddressesDescending = __bind(this.visitSubaddressesDescending, this);
      this.visitSubaddressesAscending = __bind(this.visitSubaddressesAscending, this);
      this.visitParentAddressesDescending = __bind(this.visitParentAddressesDescending, this);
      this.visitParentAddressesAscending = __bind(this.visitParentAddressesAscending, this);
      this.getComponentKey = __bind(this.getComponentKey, this);
      this.getPropertiesModel = __bind(this.getPropertiesModel, this);
      this.getModel = __bind(this.getModel, this);
      this.createSubcomponentAddress = __bind(this.createSubcomponentAddress, this);
      this.createComponentAddress = __bind(this.createComponentAddress, this);
      this.createSubpathAddress = __bind(this.createSubpathAddress, this);
      this.createParentAddress = __bind(this.createParentAddress, this);
      this.clone = __bind(this.clone, this);
      this.isSameType = __bind(this.isSameType, this);
      this.isEqual = __bind(this.isEqual, this);
      this.isRoot = __bind(this.isRoot, this);
      this.getHashString = __bind(this.getHashString, this);
      this.getHumanReadableString = __bind(this.getHumanReadableString, this);
      var exception,
        _this = this;
      try {
        this.model = (model_ != null) && model_ || (function() {
          throw "Missing required object model input parameter.";
        })();
        this.implementation = new AddressDetails(this, model_, tokenVector_);
        this.isComplete = function() {
          return _this.implementation.complete;
        };
        this.isQualified = function() {
          return !_this.implementation.keysRequired || _this.implementation.keysSpecified;
        };
        this.isResolvable = function() {
          return _this.isComplete() && _this.isQualified();
        };
        this.isCreatable = function() {
          return _this.isComplete() && _this.implementation.keysRequired && !_this.implementation.keysSpecified;
        };
      } catch (_error) {
        exception = _error;
        throw "Address error: " + exception;
      }
    }

    Address.prototype.getHumanReadableString = function() {
      var exception, humanReadableString, index, token, _i, _len, _ref;
      try {
        if ((this.implementation.humanReadableString != null) && this.implementation.humanReadableString) {
          return this.implementation.humanReadableString;
        }
        index = 0;
        humanReadableString = "";
        _ref = this.implementation.tokenVector;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          token = _ref[_i];
          if (!index) {
            humanReadableString += token.model.jsonTag;
          }
          if ((token.key != null) && token.key) {
            humanReadableString += "." + token.key;
          } else {
            if (token.idExtensionPoint > 0) {
              humanReadableString += ".-";
            }
          }
          if (token.idNamespace) {
            humanReadableString += "." + token.namespaceDescriptor.jsonTag;
          }
          index++;
        }
        this.implementation.humanReadableString = humanReadableString;
        return humanReadableString;
      } catch (_error) {
        exception = _error;
        throw "getHumanReadableString failure: " + exception;
      }
    };

    Address.prototype.getHashString = function() {
      var exception, hashSource, index, token, _i, _len, _ref;
      try {
        if ((this.implementation.hashString != null) && this.implementation.hashString) {
          return this.implementation.hashString;
        }
        index = 0;
        hashSource = "";
        _ref = this.implementation.tokenVector;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          token = _ref[_i];
          if (!index) {
            hashSource += "" + token.model.jsonTag;
          }
          if ((token.key != null) && token.key) {
            hashSource += "." + token.key;
          } else {
            if (token.idExtensionPoint > 0) {
              hashSource += ".-";
            }
          }
          if (token.idNamespace) {
            hashSource += "." + token.idNamespace;
          }
          index++;
        }
        this.implementation.hashString = encodeURIComponent(hashSource).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
        return this.implementation.hashString;
      } catch (_error) {
        exception = _error;
        throw "getHashString failure: " + exception;
      }
    };

    Address.prototype.isRoot = function() {
      var exception;
      try {
        return this.implementation.getLastToken().idNamespace === 0;
      } catch (_error) {
        exception = _error;
        throw "CNMjs.Address.isRoot failure: " + exception;
      }
    };

    Address.prototype.isEqual = function(address_) {
      var exception, index, result, tokenA, tokenB;
      try {
        if (!((address_ != null) && address_)) {
          throw "Missing address input parameter.";
        }
        if (this.implementation.tokenVector.length !== address_.implementation.tokenVector.length) {
          return false;
        }
        result = true;
        index = 0;
        while (index < this.implementation.tokenVector.length) {
          tokenA = this.implementation.tokenVector[index];
          tokenB = address_.implementation.tokenVector[index];
          if (!tokenA.isEqual(tokenB)) {
            result = false;
            break;
          }
          index++;
        }
        return result;
      } catch (_error) {
        exception = _error;
        throw "isEqual failure: " + exception;
      }
    };

    Address.prototype.isSameType = function(address_) {
      var exception, result, testToken, thisToken;
      try {
        if (!((address_ != null) && address_)) {
          throw "Missing address input parameter.";
        }
        thisToken = this.implementation.getLastToken();
        testToken = address_.implementation.getLastToken();
        result = thisToken.idNamespace === testToken.idNamespace;
        return result;
      } catch (_error) {
        exception = _error;
        throw "isSameType failure: " + exception;
      }
    };

    Address.prototype.clone = function() {
      var exception;
      try {
        return new Address(this.model, this.implementation.tokenVector);
      } catch (_error) {
        exception = _error;
        throw "clone failure: " + exception;
      }
    };

    Address.prototype.createParentAddress = function(generations_) {
      var descriptor, exception, generations, newAddress, newTokenVector, token, tokenSourceIndex;
      try {
        if (!this.implementation.tokenVector.length) {
          throw "Invalid address contains no address tokens.";
        }
        generations = (generations_ != null) && generations_ || 1;
        tokenSourceIndex = this.implementation.tokenVector.length - 1;
        token = this.implementation.tokenVector[tokenSourceIndex--];
        if (token.namespaceDescriptor.id === 0) {
          return void 0;
        }
        while (generations) {
          descriptor = token.namespaceDescriptor;
          if (descriptor.id === 0) {
            break;
          }
          if (descriptor.namespaceType !== "component") {
            token = new AddressToken(token.model, token.idExtensionPoint, token.key, descriptor.parent.id);
          } else {
            token = (tokenSourceIndex !== -1) && this.implementation.tokenVector[tokenSourceIndex--] || (function() {
              throw "Internal error: exhausted token stack.";
            })();
          }
          generations--;
        }
        newTokenVector = ((tokenSourceIndex < 0) && []) || this.implementation.tokenVector.slice(0, tokenSourceIndex + 1);
        newAddress = new Address(token.model, newTokenVector);
        newAddress.implementation.pushToken(token);
        return newAddress;
      } catch (_error) {
        exception = _error;
        throw "createParentAddress failure: " + exception;
      }
    };

    Address.prototype.createSubpathAddress = function(subpath_) {
      var archetypeDescriptor, archetypePathId, child, currentToken, exception, nd, ndNew, newAddress, newTokenVector, subpathToken, subpathTokens, _i, _j, _len, _len1, _ref;
      try {
        if (!((subpath_ != null) && subpath_)) {
          throw "Missing subpath input parameter.";
        }
        newTokenVector = this.implementation.tokenVector.slice(0, this.implementation.tokenVector.length - 1) || [];
        currentToken = this.implementation.getLastToken();
        subpathTokens = subpath_.split('.');
        for (_i = 0, _len = subpathTokens.length; _i < _len; _i++) {
          subpathToken = subpathTokens[_i];
          nd = currentToken.namespaceDescriptor;
          ndNew = void 0;
          if (nd.namespaceType !== 'extensionPoint') {
            _ref = nd.children;
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              child = _ref[_j];
              if (subpathToken === child.jsonTag) {
                ndNew = child;
                break;
              }
            }
            if (!((ndNew != null) && ndNew)) {
              throw "Invalid address token '" + subpathToken + "'.";
            }
            if (ndNew.namespaceType === 'component') {
              throw "Internal error: components must be created within extension point namespaces. How did this happen?";
            }
            currentToken = new AddressToken(currentToken.model, currentToken.idExtensionPoint, currentToken.key, ndNew.id);
          } else {
            archetypePathId = nd.archetypePathId;
            archetypeDescriptor = this.model.implementation.getNamespaceDescriptorFromPathId(archetypePathId);
            if (subpathToken !== archetypeDescriptor.jsonTag) {
              throw "Expected component name '" + archetypeDescriptor.jsonTag + "' but was given '" + subpathToken + "'.";
            }
            newTokenVector.push(currentToken);
            currentToken = new AddressToken(currentToken.model, currentToken.idNamespace, void 0, archetypePathId);
          }
        }
        newTokenVector.push(currentToken);
        newAddress = new Address(this.model, newTokenVector);
        return newAddress;
      } catch (_error) {
        exception = _error;
        throw "createSubpathAddress failure: " + exception;
      }
    };

    Address.prototype.createComponentAddress = function() {
      var descriptor, exception, newAddress;
      try {
        descriptor = this.implementation.getDescriptor();
        if (descriptor.isComponent) {
          return this.clone();
        }
        newAddress = this.implementation.createSubpathIdAddress(descriptor.idComponent);
        return newAddress;
      } catch (_error) {
        exception = _error;
        throw "createComponentAddress failure: " + exception;
      }
    };

    Address.prototype.createSubcomponentAddress = function() {
      var descriptor, exception, newToken;
      try {
        descriptor = this.implementation.getDescriptor();
        if (descriptor.namespaceType !== "extensionPoint") {
          throw "Unable to determine subcomponent to create because this address does not specifiy an extension point namespace.";
        }
        newToken = new AddressToken(this.model, descriptor.id, void 0, descriptor.archetypePathId);
        return this.clone().implementation.pushToken(newToken);
      } catch (_error) {
        exception = _error;
        throw "createSubcomponentAddress failure: " + exception;
      }
    };

    Address.prototype.getModel = function() {
      var exception;
      try {
        return this.implementation.getDescriptor().namespaceModelDeclaration;
      } catch (_error) {
        exception = _error;
        throw "getModel failure: " + exception;
      }
    };

    Address.prototype.getPropertiesModel = function() {
      var exception;
      try {
        return this.implementation.getDescriptor().namespaceModelPropertiesDeclaration;
      } catch (_error) {
        exception = _error;
        throw "getPropertiesModel failure: " + exception;
      }
    };

    Address.prototype.getComponentKey = function() {
      var exception;
      try {
        if (!this.isResolvable()) {
          throw "You cannot obtain the component key of an unresolvable address.";
        }
        return this.createComponentAddress().implementation.getLastToken().key;
      } catch (_error) {
        exception = _error;
        throw "getComponentKey failure: " + exception;
      }
    };

    Address.prototype.visitParentAddressesAscending = function(callback_) {
      var address, exception, _i, _len, _ref,
        _this = this;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.parentAddressesAscending != null) && this.parentAddressesAscending)) {
          this.parentAddressesAscending = [];
          this.visitParentAddressesDescending(function(address__) {
            _this.parentAddressesAscending.push(address__);
            return true;
          });
          this.parentAddressesAscending.reverse();
        }
        if (!this.parentAddressesAscending.length) {
          return false;
        }
        _ref = this.parentAddressesAscending;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          address = _ref[_i];
          try {
            callback_(address);
          } catch (_error) {
            exception = _error;
            throw "Failure occurred inside your registered callback function implementation: " + exception;
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw "visitParentAddressesAscending failure: " + exception;
      }
    };

    Address.prototype.visitParentAddressesDescending = function(callback_) {
      var address, exception, parent, _i, _len, _ref;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.parentAddressesDesending != null) && this.parentAddressesDesceding)) {
          this.parentAddressesDescending = [];
          parent = this.createParentAddress();
          while (parent) {
            this.parentAddressesDescending.push(parent);
            parent = parent.createParentAddress();
          }
        }
        if (!this.parentAddressesDescending.length) {
          return false;
        }
        _ref = this.parentAddressesDescending;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          address = _ref[_i];
          try {
            callback_(address);
          } catch (_error) {
            exception = _error;
            throw "Failure occurred inside your registered callback function implementation: " + exception;
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw "visitParentAddressesDescending failure: " + exception;
      }
    };

    Address.prototype.visitSubaddressesAscending = function(callback_) {
      var address, exception, namespaceDescriptor, subnamespaceAddress, subnamespacePathId, _i, _j, _len, _len1, _ref, _ref1;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.subnamespaceAddressesAscending != null) && this.subnamespaceAddressesAscending)) {
          this.subnamespaceAddressesAscending = [];
          namespaceDescriptor = this.implementation.getDescriptor();
          _ref = namespaceDescriptor.componentNamespaceIds;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            subnamespacePathId = _ref[_i];
            subnamespaceAddress = this.implementation.createSubpathIdAddress(subnamespacePathId);
            this.subnamespaceAddressesAscending.push(subnamespaceAddress);
          }
        }
        _ref1 = this.subnamespaceAddressesAscending;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          address = _ref1[_j];
          try {
            callback_(address);
          } catch (_error) {
            exception = _error;
            throw "Failure occurred inside your registered callback function implementation: " + exception;
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw "visitSubaddressesAscending failure: " + exception;
      }
    };

    Address.prototype.visitSubaddressesDescending = function(callback_) {
      var address, exception, _i, _len, _ref,
        _this = this;
      try {
        if (!(callback_ && callback_)) {
          return false;
        }
        if (!((this.subnamespaceAddressesDescending != null) && this.subnamespaceAddressesDescending)) {
          this.subnamespaceAddressesDescending = [];
          this.visitSubaddressesAscending(function(address__) {
            return _this.subnamespaceAddressesDescending.push(address__);
          });
          this.subnamespaceAddressesDescending.reverse();
        }
        _ref = this.subnamespaceAddressesDescending;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          address = _ref[_i];
          try {
            callback_(address);
          } catch (_error) {
            exception = _error;
            throw "Failure occurred inside your registered callback function implementation: " + exception;
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw "visitSubaddressesAscending failure: " + exception;
      }
    };

    Address.prototype.visitChildAddresses = function(callback_) {
      var childAddress, childDescriptor, exception, namespaceDescriptor, _i, _len, _ref;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        namespaceDescriptor = this.implementation.getDescriptor();
        _ref = namespaceDescriptor.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          childDescriptor = _ref[_i];
          childAddress = this.implementation.createSubpathIdAddress(childDescriptor.id);
          try {
            callback_(childAddress);
          } catch (_error) {
            exception = _error;
            throw "Failure occurred inside your registered callback function implementation: " + exception;
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw "visitChildAddresses failure: " + exception;
      }
    };

    Address.prototype.visitExtensionPointAddresses = function(callback_) {
      var address, exception, extensionPointAddress, extensionPointDescriptor, namespaceDescriptor, path, _i, _len, _ref, _ref1;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.extensionPointAddresses != null) && this.extensionPointAddresses)) {
          this.extensionPointAddresses = [];
          namespaceDescriptor = this.implementation.getDescriptor();
          _ref = namespaceDescriptor.extensionPoints;
          for (path in _ref) {
            extensionPointDescriptor = _ref[path];
            extensionPointAddress = this.implementation.createSubpathIdAddress(extensionPointDescriptor.id);
            this.extensionPointAddresses.push(extensionPointAddress);
          }
        }
        _ref1 = this.extensionPointAddresses;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          address = _ref1[_i];
          callback_(address);
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw "visitExtensionPointAddresses failure: " + exception;
      }
    };

    return Address;

  })();

}).call(this);
