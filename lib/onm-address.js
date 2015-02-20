
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
  var Address, AddressDetails, AddressToken, classRegistry,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  classRegistry = require('./common/onm-class-registry');

  AddressToken = require('./address/onm-address-token');

  module.exports = Address = (function() {
    Address.prototype.onmClassType = classRegistry.ids.Address;

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
      this.isParent = __bind(this.isParent, this);
      this.isEqual = __bind(this.isEqual, this);
      this.isRoot = __bind(this.isRoot, this);
      this.lri = __bind(this.lri, this);
      this.getHashString = __bind(this.getHashString, this);
      this.uri = __bind(this.uri, this);
      this.getHumanReadableString = __bind(this.getHumanReadableString, this);
      this.address = __bind(this.address, this);
      var exception;
      try {
        this.model = (model_ != null) && model_ || (function() {
          throw new Error("Missing required object model input parameter.");
        })();
        this.implementation = new AddressDetails(this, model_, tokenVector_);
        this.isComplete = (function(_this) {
          return function() {
            return _this.implementation.complete;
          };
        })(this);
        this.isQualified = (function(_this) {
          return function() {
            return !_this.implementation.keysRequired || _this.implementation.keysSpecified;
          };
        })(this);
        this.isResolvable = (function(_this) {
          return function() {
            return _this.isComplete() && _this.isQualified();
          };
        })(this);
        this.isCreatable = (function(_this) {
          return function() {
            return _this.isComplete() && _this.implementation.keysRequired && !_this.implementation.keysSpecified;
          };
        })(this);
      } catch (_error) {
        exception = _error;
        throw new Error("Address error: " + exception.message);
      }
    }


    /*
        request: {
            xri: onm-format resource identifier string variant (path, LRI, URI)
        }
        response: {
            error: null or string explaining why result === null
            address: onm.Address reference or null to indicate error
        }
        Note: paths are parsed relative to the namespace addressed by this.
        LRI and URI resource identifier string variants are always evaluated
        relative to model's anonymous namespace.
     */

    Address.prototype.address = function(request_) {
      var errors, inBreakScope, parseResponse, response, xri;
      errors = [];
      response = {
        error: null,
        result: null
      };
      inBreakScope = false;
      while (!inBreakScope) {
        inBreakScope = true;
        if (!((request_ != null) && request_)) {
          errors.unshift("Missing requirest request object in-parameter.");
          break;
        }
        xri = request_.xri;
        if (!((xri != null) && xri)) {
          response.result = this;
          break;
        }
        parseResponse = xRIP.parse({
          model: this.model,
          addressBase: this,
          xri: xri_
        });
        if (parseResponse.error) {
          errors.unshift(parseResponse.error);
          break;
        }
        response.result = parseResponse.result;
      }
      if (errors.length) {
        errors.unshift("onm.Address.address failed:");
        request.error = errors.join(' ');
      }
      return response;
    };


    /*
        request: {
            xri: onm-format resource identifier string variant (path, LRI, URI)
        }
        response: {
            error: null or string explaining why result === null
            address: onm.Address reference or null to indicate error
        }
        Note: paths are parsed relative to the namespace addressed by this.
        LRI and URI resource identifier string variants are always evaluated
        relative to model's anonymous namespace.
     */

    Address.prototype.getHumanReadableString = function() {
      console.log("onm v0.3: onm.Address.getHumanReadableString is deprecated. Use v0.3 onm.Address.uri API.");
      return this.uri();
    };

    Address.prototype.uri = function() {
      var addStringToken, exception_, hashString, index, stringTokens;
      try {
        if ((this.implementation.humanReadableString != null) && this.implementation.humanReadableString) {
          return this.implementation.humanReadableString;
        }
        index = 0;
        stringTokens = [];
        addStringToken = (function(_this) {
          return function(address_) {
            var key, model, tokenString;
            model = address_.getModel();
            tokenString = null;
            switch (model.namespaceType) {
              case 'root':
                return true;
              case 'component':
                key = address_.implementation.getLastToken().key;
                tokenString = (key != null) && key || '-';
                break;
              default:
                tokenString = model.jsonTag;
                break;
            }
            return stringTokens.push(tokenString);
          };
        })(this);
        this.visitParentAddressesAscending((function(_this) {
          return function(addressParent_) {
            return addStringToken(addressParent_);
          };
        })(this));
        addStringToken(this);
        hashString = "onm-uri:" + this.model.uuid;
        if (stringTokens.length) {
          hashString += ":" + (stringTokens.join('.'));
        }
        this.implementation.humanReadableString = hashString;
        return hashString;
      } catch (_error) {
        exception_ = _error;
        throw new Error("onm.Address.uri generate failed: " + exception.message);
      }
    };

    Address.prototype.getHashString = function() {
      console.log("onm v0.3: onm.Address.getHashString is deprecated. Use v0.3 onm.Address.lri API.");
      return this.lri();
    };

    Address.prototype.lri = function() {
      var exception_, hashString, index, stringTokens, token, _i, _len, _ref;
      try {
        if ((this.implementation.hashString != null) && this.implementation.hashString) {
          return this.implementation.hashString;
        }
        index = 0;
        stringTokens = [];
        _ref = this.implementation.tokenVector;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          token = _ref[_i];
          if (index++) {
            stringTokens.push((token.key != null) && ("" + token.key) || '-');
          }
          if (token.idComponent !== token.idNamespace) {
            stringTokens.push("" + token.idNamespace);
          }
        }
        hashString = "onm-lri:" + this.model.uuidVersion;
        if (stringTokens.length) {
          hashString += ":" + (stringTokens.join('.'));
        }
        this.implementation.hashString = hashString;
        return hashString;
      } catch (_error) {
        exception_ = _error;
        throw new Error("onm.Address.lri generate failed: " + exception.message);
      }
    };

    Address.prototype.isRoot = function() {
      var exception;
      try {
        return this.implementation.getLastToken().idNamespace === 0;
      } catch (_error) {
        exception = _error;
        throw new Error("CNMjs.Address.isRoot failure: " + exception.message);
      }
    };

    Address.prototype.isEqual = function(address_) {
      var exception, index, result, tokenA, tokenB;
      try {
        if (!((address_ != null) && address_)) {
          throw new Error("Missing address input parameter.");
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
        throw new Error("isEqual failure: " + exception.message);
      }
    };

    Address.prototype.isParent = function(address_) {
      var exception, index, lastToken, parentAddress, tokenA, tokenB;
      try {
        if (!((address_ != null) && address_)) {
          throw new Error("Missing address input parameter.");
        }
        if (this.implementation.tokenVector.length > address_.implementation.tokenVector.length) {
          return false;
        }
        if (this.isEqual(address_)) {
          return false;
        }
        lastToken = this.implementation.tokenVector.length - 1;
        index = 0;
        while (index < this.implementation.tokenVector.length) {
          tokenA = this.implementation.tokenVector[index];
          tokenB = address_.implementation.tokenVector[index];
          if (tokenA.isEqual(tokenB)) {
            if (index === lastToken) {
              return true;
            }
          } else {
            if (index !== lastToken) {
              return false;
            }
            parentAddress = address_.createParentAddress();
            while (parentAddress) {
              if (this.isEqual(parentAddress)) {
                return true;
              }
              parentAddress = parentAddress.createParentAddress();
            }
            return false;
          }
          index++;
        }
        return false;
      } catch (_error) {
        exception = _error;
        throw new Error("isParent failure: " + exception.message);
      }
    };

    Address.prototype.isSameType = function(address_) {
      var exception, result, testToken, thisToken;
      try {
        if (!((address_ != null) && address_)) {
          throw new Error("Missing address input parameter.");
        }
        thisToken = this.implementation.getLastToken();
        testToken = address_.implementation.getLastToken();
        result = thisToken.idNamespace === testToken.idNamespace;
        return result;
      } catch (_error) {
        exception = _error;
        throw new Error("isSameType failure: " + exception.message);
      }
    };

    Address.prototype.clone = function() {
      var exception;
      try {
        return new Address(this.model, this.implementation.tokenVector);
      } catch (_error) {
        exception = _error;
        throw new Error("clone failure: " + exception.message);
      }
    };

    Address.prototype.createParentAddress = function(generations_) {
      var descriptor, exception, generations, newAddress, newTokenVector, token, tokenSourceIndex;
      try {
        if (!this.implementation.tokenVector.length) {
          throw new Error("Invalid address contains no address tokens.");
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
              throw new Error("Internal error: exhausted token stack.");
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
        throw new Error("createParentAddress failure: " + exception.message);
      }
    };

    Address.prototype.createSubpathAddress = function(subpath_) {
      var archetypeDescriptor, archetypePathId, child, currentToken, exception, nd, ndNew, newAddress, newTokenVector, subpathToken, subpathTokens, _i, _j, _len, _len1, _ref;
      try {
        if (!((subpath_ != null) && subpath_)) {
          throw new Error("Missing subpath input parameter.");
        }
        newTokenVector = [];
        if (this.implementation.tokenVector.length > 1) {
          newTokenVector = this.implementation.tokenVector.slice(0, this.implementation.tokenVector.length - 1);
        }
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
              throw new Error("Invalid address token '" + subpathToken + "'.");
            }
            if (ndNew.namespaceType === 'component') {
              throw new Error("Internal error: components must be created within extension point namespaces. How did this happen?");
            }
            currentToken = new AddressToken(currentToken.model, currentToken.idExtensionPoint, currentToken.key, ndNew.id);
          } else {
            archetypePathId = nd.archetypePathId;
            archetypeDescriptor = this.model.implementation.getNamespaceDescriptorFromPathId(archetypePathId);
            if (subpathToken !== archetypeDescriptor.jsonTag) {
              throw new Error("Expected component name '" + archetypeDescriptor.jsonTag + "' but was given '" + subpathToken + "'.");
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
        throw new Error("createSubpathAddress failure: " + exception.message);
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
        throw new Error("createComponentAddress failure: " + exception.message);
      }
    };

    Address.prototype.createSubcomponentAddress = function() {
      var descriptor, exception, newToken;
      try {
        descriptor = this.implementation.getDescriptor();
        if (descriptor.namespaceType !== "extensionPoint") {
          throw new Error("Unable to determine subcomponent to create because this address does not specifiy an extension point namespace.");
        }
        newToken = new AddressToken(this.model, descriptor.id, void 0, descriptor.archetypePathId);
        return this.clone().implementation.pushToken(newToken);
      } catch (_error) {
        exception = _error;
        throw new Error("createSubcomponentAddress failure: " + exception.message);
      }
    };

    Address.prototype.getModel = function() {
      var exception;
      try {
        return this.implementation.getDescriptor().namespaceModelDeclaration;
      } catch (_error) {
        exception = _error;
        throw new Error("getModel failure: " + exception.message);
      }
    };

    Address.prototype.getPropertiesModel = function() {
      var exception;
      try {
        return this.implementation.getDescriptor().namespaceModelPropertiesDeclaration;
      } catch (_error) {
        exception = _error;
        throw new Error("getPropertiesModel failure: " + exception.message);
      }
    };

    Address.prototype.getComponentKey = function() {
      var exception;
      try {
        if (!this.isResolvable()) {
          throw new Error("You cannot obtain the component key of an unresolvable address.");
        }
        return this.implementation.getLastToken().key;
      } catch (_error) {
        exception = _error;
        throw new Error("getComponentKey failure: " + exception.message);
      }
    };

    Address.prototype.visitParentAddressesAscending = function(callback_) {
      var address, exception, _i, _len, _ref;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.parentAddressesAscending != null) && this.parentAddressesAscending)) {
          this.parentAddressesAscending = [];
          this.visitParentAddressesDescending((function(_this) {
            return function(address__) {
              _this.parentAddressesAscending.push(address__);
              return true;
            };
          })(this));
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
            throw new Error("Failure occurred inside your registered callback function implementation: " + exception.message);
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw new Error("visitParentAddressesAscending failure: " + exception.message);
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
            throw new Error("Failure occurred inside your registered callback function implementation: " + exception.message);
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw new Error("visitParentAddressesDescending failure: " + exception.message);
      }
    };

    Address.prototype.visitSubaddressesAscending = function(callback_) {
      var address, childAddressesToVisit, exception, traverse, _i, _len, _ref;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.subnamespaceAddressesAscending != null) && this.subnamespaceAddressesAscending)) {
          this.subnamespaceAddressesAscending = [];
          childAddressesToVisit = [];
          childAddressesToVisit.push(this);
          traverse = (function(_this) {
            return function(startAddress_) {
              if (startAddress_.getModel().namespaceType !== "extensionPoint") {
                return startAddress_.visitChildAddresses(function(childAddress_) {
                  _this.subnamespaceAddressesAscending.push(childAddress_);
                  return childAddressesToVisit.push(childAddress_);
                });
              }
            };
          })(this);
          while (childAddressesToVisit.length) {
            traverse(childAddressesToVisit.pop());
          }
        }
        _ref = this.subnamespaceAddressesAscending;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          address = _ref[_i];
          try {
            callback_(address);
          } catch (_error) {
            exception = _error;
            throw new Error("Failure occurred inside your registered callback function implementation: " + exception.message);
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw new Error("visitSubaddressesAscending failure: " + exception.message);
      }
    };

    Address.prototype.visitSubaddressesDescending = function(callback_) {
      var address, exception, _i, _len, _ref;
      try {
        if (!(callback_ && callback_)) {
          return false;
        }
        if (!((this.subnamespaceAddressesDescending != null) && this.subnamespaceAddressesDescending)) {
          this.subnamespaceAddressesDescending = [];
          this.visitSubaddressesAscending((function(_this) {
            return function(address__) {
              return _this.subnamespaceAddressesDescending.push(address__);
            };
          })(this));
          this.subnamespaceAddressesDescending.reverse();
        }
        _ref = this.subnamespaceAddressesDescending;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          address = _ref[_i];
          try {
            callback_(address);
          } catch (_error) {
            exception = _error;
            throw new Error("Failure occurred inside your registered callback function implementation: " + exception.message);
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw new Error("visitSubaddressesAscending failure: " + exception.message);
      }
    };

    Address.prototype.visitChildAddresses = function(callback_) {
      var childAddress, childDescriptor, exception, namespaceDescriptor, _i, _len, _ref;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        namespaceDescriptor = this.implementation.getDescriptor();
        if (namespaceDescriptor.namespaceType === 'extensionPoint') {
          return false;
        }
        _ref = namespaceDescriptor.children;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          childDescriptor = _ref[_i];
          childAddress = this.implementation.createSubpathIdAddress(childDescriptor.id);
          try {
            callback_(childAddress);
          } catch (_error) {
            exception = _error;
            throw new Error("Failure occurred inside your registered callback function implementation: " + exception.message);
          }
        }
        return true;
      } catch (_error) {
        exception = _error;
        throw new Error("visitChildAddresses failure: " + exception.message);
      }
    };

    Address.prototype.visitExtensionPointAddresses = function(callback_) {
      var address, addressComponent, exception, extensionPointAddress, extensionPointDescriptor, namespaceDescriptor, path, _i, _len, _ref, _ref1;
      try {
        if (!((callback_ != null) && callback_)) {
          return false;
        }
        if (!((this.extensionPointAddresses != null) && this.extensionPointAddresses)) {
          this.extensionPointAddresses = [];
          addressComponent = this.createComponentAddress();
          namespaceDescriptor = addressComponent.implementation.getDescriptor();
          _ref = namespaceDescriptor.extensionPoints;
          for (path in _ref) {
            extensionPointDescriptor = _ref[path];
            extensionPointAddress = this.implementation.createSubpathIdAddress(extensionPointDescriptor.id);
            if (this.isParent(extensionPointAddress)) {
              this.extensionPointAddresses.push(extensionPointAddress);
            }
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
        throw new Error("visitExtensionPointAddresses failure: " + exception.message);
      }
    };

    return Address;

  })();

  AddressDetails = require('./address/onm-address-details');

}).call(this);
