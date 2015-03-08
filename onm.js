module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	////
	/*
	  Object Namespace Manager (onm)

	  Copyright (C) 2015 Encapsule Project (http://encapsule.org)

	  License: MIT (https://github.com/Encapsule/onm/blob/master/LICENSE)

	  Source: https://github.com/Encapsule/onm

	  Issues: https://github.com/Encapsule/onm/issues

	  Designed and implemented by Christopher D. Russell

	  Ongoing development of onm and other derived Encapsule Project
	  repositories is funded through consulting engagements. Please
	  follow @Encapsule on Twitter and GitHub and get in touch if we
	  can help you with that awesome thing you're building.

	*/


	/*
	  v0.2
	  +-------------+---------------+
	  | onm.Address | onm.Namespace |
	  +-------------+---------------+
	  | onm.Model   | onm.Store     |
	  +-------------+---------------+

	*/
	module.exports.Model = __webpack_require__(7);
	module.exports.Address = __webpack_require__(1);
	module.exports.Store = __webpack_require__(20);
	module.exports.Namespace = __webpack_require__(8);


	/*
	  v1.0
	  +----------------+---------------+
	  | onm.Coordinate | onm.Location  |
	  +----------------+---------------+
	  | onm.Map        | onm.Region    |
	  +----------------+---------------+

	*/


	/*
	  +-----+-----+
	  | RAL | RLP |
	  +-- --+-----+
	  | RAS | DAO |
	  +-----+ ----+
	*/


	/*
	  Utility and test exports.
	*/
	module.exports.intrinsics = __webpack_require__(6);
	module.exports.util = __webpack_require__(4);

	/*
	  'node-uuid' package convenience export for clients who need need access
	  to binary UUID, or standard hex string UUID representation vs. equivalent
	  compressed IRUT string format provided by onm RISP.
	*/
	module.exports.uuid = __webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, AddressDetails, AddressToken, CIDS, xRIP,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  CIDS = __webpack_require__(2);

	  AddressToken = __webpack_require__(3);

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
	      this.isParent = __bind(this.isParent, this);
	      this.isEqual = __bind(this.isEqual, this);
	      this.isRoot = __bind(this.isRoot, this);
	      this.lri = __bind(this.lri, this);
	      this.getHashString = __bind(this.getHashString, this);
	      this.uri = __bind(this.uri, this);
	      this.getHumanReadableString = __bind(this.getHumanReadableString, this);
	      this.address = __bind(this.address, this);
	      var cidsResponse, exception;
	      try {
	        cidsResponse = CIDS.setCID({
	          ref: this,
	          cname: 'Address'
	        });
	        if (cidsResponse.error) {
	          throw new Error(cidsResponse.error);
	        }
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

	    Address.prototype.address = function(xri_) {
	      var errors, inBreakScope, parseResponse, response;
	      errors = [];
	      response = {
	        error: null,
	        result: null
	      };
	      inBreakScope = false;
	      while (!inBreakScope) {
	        inBreakScope = true;
	        if (!((xri_ != null) && xri_)) {
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
	        response.error = errors.join(' ');
	      }
	      if (response.error) {
	        throw new Error(response.error);
	      }
	      return response.result;
	    };

	    Address.prototype.getHumanReadableString = function() {
	      console.log("onm v0.3: onm.Address.getHumanReadableString is deprecated. Use v0.3 onm.Address.uri API.");
	      return this.uri();
	    };

	    Address.prototype.uri = function() {
	      var errors, generatorResponse, inBreakScope, response;
	      errors = [];
	      response = {
	        error: null,
	        result: null
	      };
	      inBreakScope = false;
	      while (!inBreakScope) {
	        inBreakScope = true;
	        generatorResponse = xRIP.generate({
	          address: this,
	          format: 'uri'
	        });
	        if (generatorResponse.error) {
	          errors.unshift(generatorResponse.error);
	          break;
	        }
	        response.result = generatorResponse.result;
	      }
	      if (errors.length) {
	        errors.unshift("onm.Address.uri failed:");
	        response.error = errors.join(' ');
	      }
	      if (errors.length) {
	        throw new Error(response.error);
	      }
	      return response.result;
	    };

	    Address.prototype.getHashString = function() {
	      console.log("onm v0.3: onm.Address.getHashString is deprecated. Use v0.3 onm.Address.lri API.");
	      return this.lri();
	    };

	    Address.prototype.lri = function() {
	      var errors, generatorResponse, inBreakScope, response;
	      errors = [];
	      response = {
	        error: null,
	        result: null
	      };
	      inBreakScope = false;
	      while (!inBreakScope) {
	        inBreakScope = true;
	        generatorResponse = xRIP.generate({
	          address: this,
	          format: 'lri'
	        });
	        if (generatorResponse.error) {
	          errors.unshift(generatorResponse.error);
	          break;
	        }
	        response.result = generatorResponse.result;
	      }
	      if (errors.length) {
	        errors.unshift("onm.Address.lri failed:");
	        response.error = errors.join(' ');
	      }
	      if (errors.length) {
	        throw new Error(response.error);
	      }
	      return response.result;
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
	      var errors, inBreakScope, parseResponse, response;
	      console.log("onm.Address.createSubpathAddress is deprecated in v0.3. Use onm.Address.address API.");
	      errors = [];
	      response = {
	        error: null,
	        result: null
	      };
	      inBreakScope = false;
	      while (!inBreakScope) {
	        inBreakScope = true;
	        parseResponse = xRIP.parse({
	          model: this.model,
	          addressBase: this,
	          xri: subpath_
	        });
	        if (parseResponse.error) {
	          errors.unshift(parseResponse.error);
	          break;
	        }
	        response.result = parseResponse.result;
	      }
	      if (errors.length) {
	        errors.unshift("onm.Address.createSubpathAddress failed:");
	        response.error = errors.join(' ');
	      }
	      if (response.error) {
	        throw new Error(response.error);
	      }
	      return response.result;
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

	  AddressDetails = __webpack_require__(17);

	  xRIP = __webpack_require__(9);

	}).call(this);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
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


	/* 
	    Class Identification Subsystem (CIDS)

	    CIDS defines a simple protocol for managing classes of in-memory JavaScript object resources at runtime.

	    The object property name cids.reserverd reserved by CIDS for use as a Class Identifier (CID).

	    The CID value assigend to an onm-format Internet Routable URI Token (IRUT) string.

	    Comparison of the CID value of two objects for equality is the only meaningful discrimination semantic provided by CIDS.

	    This is still useful however. Data (e.g. objects created by derived client code) that do not participate in CIDS will
	    generally not be tagged with CID values. Internally, onm wraps just about every meaningful piece of client state
	    in a CID-tagged object as it crosses the onm API surface and is validated. Additionally, all object generators within
	    onm produce CID-tagged objects.

	    CID are IRUT are globally unique so suitable for use as database indices alone, or in app-specific derived key scenarios.
	 */

	(function() {
	  var CIDS, cnameTable, normalizeCNAMERequest;

	  CIDS = module.exports = {};

	  cnameTable = __webpack_require__(16);


	  /*
	      ----------------------------------------------------------------------
	      CIDS.setCID (on Object reference from CNAME)
	  
	      request = {
	          ref: reference to an object
	          cname: CIDS-registered class name string
	      }
	      response = {
	          error: null or a string explaining why result is null
	          result: { cid: string, cname: string: ref: request_.ref } or null to indicate error
	      }
	      ----------------------------------------------------------------------
	   */

	  CIDS.setCID = function(request_) {
	    var cid, cnameResponse, errors, inBreakScope, nr, propertyName, request, response;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      nr = normalizeCNAMERequest(request_);
	      if (nr.error) {
	        errors.unshift(nr.error);
	        break;
	      }
	      request = nr.result;
	      cnameResponse = CIDS.getCNAME(request.ref);
	      if (!cnameResponse.error) {
	        errors.unshift("Object is already identified as '" + cnameResponse.result.cname + "' with CID '" + cnameResponse.result.cid + "'.");
	        break;
	      }
	      cid = cnameTable.cname2cid[request.cname];
	      if (!((cid != null) && cid)) {
	        errors.unshift("Unknown object class name '" + request.cname + "'. Registered in CIDS: [" + cnameTable.cnames + "].");
	        break;
	      }
	      propertyName = cnameTable.reservedPropertyName;
	      request.ref[propertyName] = cid;
	      response.result = {
	        cid: cid,
	        cname: request.cname,
	        ref: request.ref
	      };
	    }
	    if (errors.length) {
	      errors.unshift("CIDS.setCID:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };


	  /*
	      ----------------------------------------------------------------------
	      CIDS.getCNAME (on Object reference)
	  
	      ref_: reference to an object or function to inspect
	      response = {
	          error: null or a string explaining why result is null
	          result: { cid: string, cname: string: ref: request_.ref } or null to indicate error
	      }
	      ----------------------------------------------------------------------
	   */

	  CIDS.getCNAME = function(ref_) {
	    var errors, inBreakScope, refType, response, responseCID, responseCIDType, responseCNAME;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      if (!((ref_ != null) && ref_)) {
	        errors.unshift("Bad request missing required JavaScript reference in-parameter.");
	        break;
	      }
	      refType = Object.prototype.toString.call(ref_);
	      if (refType !== '[object Object]') {
	        errors.unshift("Invalid request 'object' value type '" + refType + "'. Expected reference to '[object Object]'.");
	        break;
	      }
	      responseCID = ref_[cnameTable.reservedPropertyName];
	      if (!((responseCID != null) && responseCID)) {
	        errors.unshift("Object appears not to be CID-identified.");
	        break;
	      }
	      responseCIDType = Object.prototype.toString.call(responseCID);
	      if (responseCIDType !== '[object String]') {
	        errors.unshift("Object appears to be CID-identified with a value of type '" + responseCIDType + ". Expected '[object String]'.");
	        break;
	      }
	      if (responseCID.length !== 22) {
	        errors.unshift("Object appears to be CID-identified with an unknown string format. Expected 22-character IRUT.");
	        break;
	      }
	      responseCNAME = cnameTable.cid2cname[responseCID];
	      if (!((responseCNAME != null) && responseCNAME)) {
	        errors.unshift("Object is identified with an unknown CID value '" + responseCID + "'.");
	        break;
	      }
	      response.result = {
	        cid: responseCID,
	        cname: responseCNAME,
	        ref: ref_
	      };
	    }
	    if (errors.length) {
	      errors.unshift("CIDS.getCNAME:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };


	  /*
	      ----------------------------------------------------------------------
	      CIDS.assertCNAME (on Object reference is CNAME)
	  
	      request = {
	          ref: reference to an object
	          cname: CIDS-registered class name string
	      }
	      response = {
	          error: null or a string explaining why result is null
	          result: { cid: string, cname: string: ref: request_.ref } or null to indicate error
	      }
	      ----------------------------------------------------------------------
	   */

	  CIDS.assertCNAME = function(request_) {
	    var cidCheck, errors, getCNAMEResponse, inBreakScope, nr, request, response;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      nr = normalizeCNAMERequest(request_);
	      if (nr.error) {
	        errors.unshift(nr.error);
	        break;
	      }
	      request = nr.result;
	      getCNAMEResponse = CIDS.getCNAME(request.ref);
	      if (getCNAMEResponse.error) {
	        errors.unshift(getCNAMEResponse.error);
	        break;
	      }
	      if (getCNAMEResponse.result.cname !== request.cname) {
	        cidCheck = cnameTable.cname2cid[request.cname];
	        if (!((cidCheck != null) && cidCheck)) {
	          errors.unshift("Invalid request 'cname' value '" + request.cname + "'. Registered in CIDS: [" + cnameTable.cnames + "].");
	          break;
	        }
	        errors.unshift("Target asserted to be a '" + request.cname + "' is actually a '" + getCNAMEResponse.result.cname + "' resource.");
	        break;
	      }
	      response.result = {
	        cid: getCNAMEResponse.result.cid,
	        cname: request.cname,
	        ref: request.ref
	      };
	    }
	    if (errors.length) {
	      errors.unshift("CIDS.assertCNAME:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	  CIDS.CNAMEfromCID = function(cid_) {
	    return cnameTable.cid2cname[cid_];
	  };

	  CIDS.CIDfromCNAME = function(cname_) {
	    return cnameTable.cname2cid[cname_];
	  };

	  normalizeCNAMERequest = function(request_) {
	    var cnameType, errors, inBreakScope, refType, reqType, response;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      if (!((request_ != null) && request_)) {
	        errors.unshift("Missing request object in-parameter.");
	        break;
	      }
	      reqType = Object.prototype.toString.call(request_);
	      if (reqType !== '[object Object]') {
	        errors.unshift("Invalid 'request' type '" + reqType + "'. Expected '[object Object]'.");
	        break;
	      }
	      refType = Object.prototype.toString.call(request_.ref);
	      if (refType !== '[object Object]') {
	        errors.unshift("Invalid request 'ref' value type '" + refType + "'. Expected '[object Object]'.");
	        break;
	      }
	      cnameType = Object.prototype.toString.call(request_.cname);
	      if (cnameType !== '[object String]') {
	        errors.unshift("Invalid request 'cname' value type '" + cnameType + "'. Expected '[object String].");
	        break;
	      }
	      response.result = request_;
	    }
	    if (errors.length) {
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var AddressToken,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  module.exports = AddressToken = (function() {
	    function AddressToken(model_, idExtensionPoint_, key_, idNamespace_) {
	      this.isRoot = __bind(this.isRoot, this);
	      this.isQualified = __bind(this.isQualified, this);
	      this.isEqual = __bind(this.isEqual, this);
	      this.clone = __bind(this.clone, this);
	      var exception, keyRequired;
	      try {
	        this.model = (model_ != null) && model_ || (function() {
	          throw new Error("Missing object model input parameter.");
	        })();
	        if (idNamespace_ == null) {
	          throw new Error("Missing target namespace ID input parameter.");
	        }
	        this.idNamespace = idNamespace_;
	        this.namespaceDescriptor = model_.implementation.getNamespaceDescriptorFromPathId(idNamespace_);
	        this.idComponent = this.namespaceDescriptor.idComponent;
	        this.componentDescriptor = model_.implementation.getNamespaceDescriptorFromPathId(this.idComponent);
	        keyRequired = this.componentDescriptor.id > 0;
	        this.key = keyRequired && (key_ != null) && key_ || void 0;
	        this.keyRequired = keyRequired && (this.key != null) && this.key && true || false;
	        this.idExtensionPoint = -1;
	        this.extensionPointDescriptor = void 0;
	        if (this.idComponent !== 0) {
	          if (!((idExtensionPoint_ != null) && idExtensionPoint_ && (idExtensionPoint_ !== -1))) {
	            throw new Error("Missing required idExtensionPoint in-parameter value.");
	          }
	          this.idExtensionPoint = idExtensionPoint_;
	          if (idExtensionPoint_ !== -1) {
	            this.extensionPointDescriptor = this.model.implementation.getNamespaceDescriptorFromPathId(this.idExtensionPoint);
	            if (this.extensionPointDescriptor.namespaceType !== 'extensionPoint') {
	              throw new Error("Invalid extension point namespace ID '" + idExtensionPoint + " specified '" + this.idExtensionPoint_ + "'. Actually a r '" + this.extensionPointDescriptor.namespaceType + ".");
	            }
	          }
	        }
	        return;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("AddressToken failure: " + exception);
	      }
	    }

	    AddressToken.prototype.clone = function() {
	      return new AddressToken(this.model, (this.extensionPointDescriptor != null) && this.extensionPointDescriptor && this.extensionPointDescriptor.id || -1, this.key, this.namespaceDescriptor.id);
	    };

	    AddressToken.prototype.isEqual = function(token_) {
	      var exception, result;
	      try {
	        if (!((token_ != null) && token_)) {
	          throw new Error("Missing token input parameter.");
	        }
	        result = (this.idNamespace === token_.idNamespace) && (this.key === token_.key) && (this.idExtensionPoint === token_.idExtensionPoint);
	        return result;
	      } catch (_error) {
	        exception = _error;
	        throw "isEqual failure: " + exception;
	      }
	    };

	    AddressToken.prototype.isQualified = function() {
	      return !this.keyRequired || ((this.key != null) && this.key) || false;
	    };

	    AddressToken.prototype.isRoot = function() {
	      return !this.componentId;
	    };

	    return AddressToken;

	  })();

	}).call(this);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
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
	Low-level library routines inspired by (and often copied) from http://coffeescriptcookbook.com
	------------------------------------------------------------------------------
	 */

	(function() {
	  var UTIL;

	  UTIL = module.exports = {};

	  UTIL.uuidNull = "00000000-0000-0000-0000-000000000000";

	  UTIL.clone = function(object_) {
	    var exception, flags, key, newInstance;
	    try {
	      if ((object_ == null) || typeof object_ !== 'object') {
	        return object_;
	      }
	      if (object_ instanceof Date) {
	        return new Date(object_.getTime());
	      }
	      if (object_ instanceof RegExp) {
	        flags = '';
	        if (object_.global != null) {
	          flags += 'g';
	        }
	        if (object_.ignoreCase != null) {
	          flags += 'i';
	        }
	        if (object_.multiline != null) {
	          flags += 'm';
	        }
	        if (object_.sticky != null) {
	          flags += 'y';
	        }
	        return new RegExp(object_.source, flags);
	      }
	      newInstance = new object_.constructor();
	      for (key in object_) {
	        newInstance[key] = UTIL.clone(object_[key]);
	      }
	      return newInstance;
	    } catch (_error) {
	      exception = _error;
	      throw new Error("onm.UTIL.clone FATAL: " + exception.message);
	    }
	  };

	  UTIL.dictionaryLength = function(dictionary_) {
	    var exception;
	    try {
	      return Object.keys(dictionary_).length;
	    } catch (_error) {
	      exception = _error;
	      throw new Error("dictionaryLength: " + exception.message);
	    }
	  };

	  UTIL.getEpochTime = function() {
	    return Math.round(new Date().getTime() / 1000.0);
	  };

	}).call(this);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = require("node-uuid");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  module.exports = {};

	  module.exports.jsonObject = {
	    ___label: "Unmodeled JSON Object",
	    ___description: "onm intrinsic data model for an unmodeled namespace (i.e. named object w/no declared properties, or subnamespaces).",
	    uuid: "fc544082-dfcc-4513-9855-954fbb1f7485",
	    uuidVersion: "4b237807-29ce-44de-8771-941b96397b5c",
	    jsonTag: "jsonObject"
	  };

	}).call(this);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, AddressToken, CIDS, Model, ModelDetails, helperFunctions, intrinsicDataModels, uuid, xRIP,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  CIDS = __webpack_require__(2);

	  helperFunctions = __webpack_require__(4);

	  intrinsicDataModels = __webpack_require__(6);

	  Address = __webpack_require__(1);

	  AddressToken = __webpack_require__(3);

	  ModelDetails = __webpack_require__(18);

	  xRIP = __webpack_require__(9);

	  uuid = __webpack_require__(5);

	  module.exports = Model = (function() {
	    function Model(objectModelDeclaration_) {
	      this.toJSON = __bind(this.toJSON, this);
	      this.isEqual = __bind(this.isEqual, this);
	      this.getSemanticBindings = __bind(this.getSemanticBindings, this);
	      this.createAddressFromHashString = __bind(this.createAddressFromHashString, this);
	      this.addressFromLRI = __bind(this.addressFromLRI, this);
	      this.createAddressFromHumanReadableString = __bind(this.createAddressFromHumanReadableString, this);
	      this.addressFromURI = __bind(this.addressFromURI, this);
	      this.createPathAddress = __bind(this.createPathAddress, this);
	      this.createRootAddress = __bind(this.createRootAddress, this);
	      this.address = __bind(this.address, this);
	      var cidsResponse, exception;
	      try {
	        cidsResponse = CIDS.setCID({
	          ref: this,
	          cname: 'Model'
	        });
	        if (cidsResponse.error) {
	          throw new Error(cidsResponse.error);
	        }
	        this.implementation = new ModelDetails(this, (objectModelDeclaration_ != null) && objectModelDeclaration_ || intrinsicDataModels.jsonObject);
	      } catch (_error) {
	        exception = _error;
	        throw new Error("onm.Model constructor failed: " + exception.message);
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
	     */

	    Model.prototype.address = function(xri_) {
	      var parseResponse;
	      parseResponse = xRIP.parse({
	        model: this,
	        xri: xri_
	      });
	      if (parseResponse.error) {
	        throw new Error("onm.Model.address failed: " + parseResponse.error);
	      }
	      return parseResponse.result;
	    };

	    Model.prototype.createRootAddress = function() {
	      var exception;
	      console.warn("onm.Model.createRootAddress is deprecated in onm v0.3. Use onm.Model.address API.");
	      try {
	        return new Address(this, [new AddressToken(this, void 0, void 0, 0)]);
	      } catch (_error) {
	        exception = _error;
	        throw new Error("createRootAddress failure: " + exception.message);
	      }
	    };

	    Model.prototype.createPathAddress = function(path_) {
	      var errors, response;
	      console.warn("onm.Model.createPathAddress is deprecated in onm v0.3. Use onm.Model.address API.");
	      errors = [];
	      response = xRIP.parse({
	        model: this,
	        xri: path_
	      });
	      if (response.error) {
	        throw new Error("onm.Model.createPathAddress failed: " + response.error);
	      }
	      return response.result;
	    };

	    Model.prototype.addressFromURI = function(uri_) {
	      var errors, response;
	      console.warn("onm.Model.addressFromURI is deprecated in onm v0.3. Use onm.Model.address API.");
	      errors = [];
	      response = xRIP.parse({
	        model: this,
	        xri: uri_
	      });
	      if (response.error) {
	        throw new Error("onm.Model.addressFromURI failed: " + response.error);
	      }
	      return response.result;
	    };

	    Model.prototype.createAddressFromHumanReadableString = function(humanReadableString_) {
	      console.warn("onm.Model.createAddressFromHashString is deprecated in onm v0.3. Use onm.Model.address API.");
	      return this.addressFromURI(humanReadableString_);
	    };

	    Model.prototype.addressFromLRI = function(lri_) {
	      var errors, response;
	      console.warn("onm.Model.addressFromLRI is deprecated in onm v0.3. Use v0.3 onm.Model.address API.");
	      errors = [];
	      response = xRIP.parse({
	        model: this,
	        xri: lri_
	      });
	      if (response.error) {
	        throw new Error("onm.Model.addressFromLRI failed: " + response.error);
	      }
	      return response.result;
	    };

	    Model.prototype.createAddressFromHashString = function(hash_) {
	      console.log("onm v0.3: onm.Model.createAddressFromHashString is deprecated. Use v0.3 onm.Model.addressFromLRI API.");
	      return this.addressFromLRI(hash_);
	    };

	    Model.prototype.getSemanticBindings = function() {
	      var exception;
	      try {
	        return this.implementation.semanticBindings;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("getSemanticBindings failure: " + exception.message);
	      }
	    };

	    Model.prototype.isEqual = function(model_, strict_) {
	      var exception, strict;
	      try {
	        if (!((model_ != null) && model_ && (model_ instanceof Model))) {
	          throw new Error("Missing or invalid onm.Model instance reference specified.");
	        }
	        strict = (!((strict_ != null) && strict_) && true) || (strict_ === true) || false;
	        return (!strict && (this.uuid === model_.uuid)) || ((this.uuid === model_.uuid) && (this.uuidVersion === model_.uuidVersion));
	      } catch (_error) {
	        exception = _error;
	        throw new Error("isEqual failure: " + exception.message);
	      }
	    };

	    Model.prototype.toJSON = function(replacer_, space_) {
	      var exception_;
	      try {
	        return JSON.stringify(this.implementation.objectModelDeclaration, replacer_, space_);
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Model.toJSON failed: " + exception_.message);
	      }
	    };

	    return Model;

	  })();

	}).call(this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, AddressToken, CIDS, Namespace, NamespaceDetails, addressResolver,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  CIDS = __webpack_require__(2);

	  AddressToken = __webpack_require__(3);

	  Address = __webpack_require__(1);

	  addressResolver = __webpack_require__(13);

	  NamespaceDetails = (function() {
	    function NamespaceDetails(namespace_, store_, resolvedAddressContext_) {
	      var exception;
	      try {
	        this.dataReference = addressResolver.getResolvedNamedObjectReference(resolvedAddressContext_);
	        this.resolvedTokenArray = addressResolver.getResolvedTokenVector(resolvedAddressContext_);
	        this.getResolvedToken = (function(_this) {
	          return function() {
	            return _this.resolvedTokenArray.length && _this.resolvedTokenArray[_this.resolvedTokenArray.length - 1] || void 0;
	          };
	        })(this);
	        this.resolvedAddress = void 0;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("NamespaceDetails failure: " + exception.message);
	      }
	    }

	    return NamespaceDetails;

	  })();

	  module.exports = Namespace = (function() {
	    function Namespace(store_, resolvedAddressContext_) {
	      this.visitExtensionPointSubcomponents = __bind(this.visitExtensionPointSubcomponents, this);
	      this.getExtensionPointSubcomponentCount = __bind(this.getExtensionPointSubcomponentCount, this);
	      this.update = __bind(this.update, this);
	      this.toJSON = __bind(this.toJSON, this);
	      this.nsComponent = __bind(this.nsComponent, this);
	      this.nsOpen = __bind(this.nsOpen, this);
	      this.nsCreate = __bind(this.nsCreate, this);
	      this.nsAccess = __bind(this.nsAccess, this);
	      this.namespace = __bind(this.namespace, this);
	      this.lri = __bind(this.lri, this);
	      this.uri = __bind(this.uri, this);
	      this.raddress = __bind(this.raddress, this);
	      this.caddress = __bind(this.caddress, this);
	      this.address = __bind(this.address, this);
	      this.getResolvedAddress = __bind(this.getResolvedAddress, this);
	      this.getComponentKey = __bind(this.getComponentKey, this);
	      this.ckey = __bind(this.ckey, this);
	      this.model = __bind(this.model, this);
	      this.data = __bind(this.data, this);
	      this.name = __bind(this.name, this);
	      var cidsResponse, exception;
	      try {
	        cidsResponse = CIDS.setCID({
	          ref: this,
	          cname: 'Namespace'
	        });
	        if (cidsResponse.error) {
	          throw new Error(cidsResponse.error);
	        }
	        if (!((store_ != null) && store_)) {
	          throw new Error("Missing object store input parameter.");
	        }
	        this.store = store_;
	        this.implementation = new NamespaceDetails(this, store_, resolvedAddressContext_);
	      } catch (_error) {
	        exception = _error;
	        throw new Error("onm.Namespace constructor failed: " + exception.message);
	      }
	    }

	    Namespace.prototype.name = function() {
	      var exception;
	      try {
	        return this.implementation.getResolvedToken().namespaceDescriptor.jsonTag;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("onm.Namespace.name failed: " + exception.message);
	      }
	    };

	    Namespace.prototype.data = function(data_) {
	      var exception_;
	      try {
	        if ((data_ != null) && data_) {
	          this.namespace({
	            operation: 'access',
	            rl: this.address(),
	            data: data_
	          });
	        }
	        return this.implementation.dataReference;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.data failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.model = function() {
	      var exception_;
	      try {
	        return this.address().getModel();
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.model failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.ckey = function() {
	      var exception_;
	      try {
	        return this.implementation.getResolvedToken().key;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.ckey failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.getComponentKey = function() {
	      console.log("onm v0.3: onm.Namespace.getComponentKey is deprecated. Use v0.3 onm.Namespace.ckey API.");
	      return this.key();
	    };

	    Namespace.prototype.getResolvedAddress = function() {
	      console.log("onm v0.3: onm.Namespace.getResolvedAddress has been deprecated. Use v0.3 onm.Namespace.address API.");
	      return this.address();
	    };

	    Namespace.prototype.address = function(rprls_) {
	      var descendGenerations, exception_, prlsToken, rprlsAscend, rprlsTokens, rprlsType, targetAddress, _i, _len;
	      try {
	        targetAddress = this.implementation.resolvedAddress;
	        if (!((targetAddress != null) && targetAddress)) {
	          targetAddress = this.implementation.resolvedAddress = new Address(this.store.model, this.implementation.resolvedTokenArray);
	        }
	        if (!((rprls_ != null) && rprls_)) {
	          return targetAddress;
	        }
	        rprlsType = Object.prototype.toString.call(rprls_);
	        if (rprlsType !== '[object String]') {
	          throw new Error("Invalid type '" + rprsType + "'. Expected '[object String]'.");
	        }
	        rprlsTokens = rprls_.split('.');
	        descendGenerations = 0;
	        for (_i = 0, _len = rprlsTokens.length; _i < _len; _i++) {
	          prlsToken = rprlsTokens[_i];
	          if (prlsToken === '//') {
	            descendGenerations++;
	          } else {
	            break;
	          }
	        }
	        rprlsAscend = rprlsTokens.join(descendGenerations, rprlsTokens.length, '.');
	        if (descendGenerations) {
	          targetAddress = targetAddress.createParentAddress(descendGenerations);
	        }
	        return targetAddress.createSubpathAddress(rprlsAscend);
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.address failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.caddress = function() {
	      var exception_;
	      try {
	        return this.address().createComponentAddress();
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.caddress failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.raddress = function() {
	      var exception_;
	      try {
	        return this.store.address();
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.raddress faled: " + exception_.message);
	      }
	    };

	    Namespace.prototype.uri = function() {
	      var exception_;
	      try {
	        return this.address().uri();
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.uri failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.lri = function() {
	      var exception_;
	      try {
	        return this.address().lri();
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.lri failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.namespace = function(request_) {
	      var exception_, message, request, rlType;
	      try {
	        if (!((request_ != null) && request_)) {
	          return this;
	        }
	        request = {
	          operation: (request_.operation != null) && request_.operation || 'access',
	          address: void 0,
	          data: (request_.data != null) && request_.data
	        };
	        if (!((request_.rl != null) && request_.rl)) {
	          request.address = this.address();
	        } else {
	          if (request_.rl instanceof Address) {
	            request.address = request_.rl;
	          } else {
	            try {
	              request.address = this.address(request_.rl);
	            } catch (_error) {
	              exception_ = _error;
	              try {
	                request.address = this.store.address(request_.rl);
	              } catch (_error) {
	                exception_ = _error;
	                rlType = Object.prototype.toString.call(request_.rl);
	                switch (rlType) {
	                  case '[object String]':
	                    message = "Invalid resource locator '" + request_.rl + "'. Not in model address space.";
	                    break;
	                  default:
	                    message = "Unrecognized resource locator type '" + (typeof request_.rl) + "'.";
	                    break;
	                }
	                throw new Error(message);
	              }
	            }
	          }
	        }
	        return this.store.namespace({
	          operation: request.operation,
	          rl: request.rl,
	          data: request.data
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.namespace failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.nsAccess = function(rl_, data_) {
	      var exception_;
	      try {
	        return this.namespace({
	          operaton: 'access',
	          rl: rl_,
	          data: data_
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.nsAccess failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.nsCreate = function(rl_, data_) {
	      var exception_;
	      try {
	        return this.namespace({
	          operation: 'create',
	          rl: rl_,
	          data: data_
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.nsCreate failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.nsOpen = function(rl_, data_) {
	      try {
	        return this.namespace({
	          operation: 'open',
	          rl: rl_,
	          data: data_
	        });
	      } catch (_error) {
	        throw new Error("onm.Namespace.nsOpen failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.nsComponent = function(data_) {
	      var exception_;
	      try {
	        return this.namespace({
	          operation: 'open',
	          rl: this.caddress(),
	          data: data_
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.nsComponent failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.toJSON = function(replacer_, space_) {
	      var exception_, resultJSON, space;
	      try {
	        space = (space_ != null) && space_ || 0;
	        resultJSON = JSON.stringify(this.implementation.dataReference, replacer_, space);
	        if (!((resultJSON != null) && resultJSON)) {
	          throw new Error("Namespace data is corrupt. Unable to serialize to JSON.");
	        }
	        return resultJSON;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.toJSON serialization failed on address '" + (this.address().uri()) + "' with detail: " + exception_.message);
	      }
	    };

	    Namespace.prototype.update = function() {
	      var address, containingComponentNotified, count, descriptor, exception, semanticBindings, updateAction, _results;
	      try {
	        address = this.address();
	        semanticBindings = this.store.model.getSemanticBindings();
	        updateAction = (semanticBindings != null) && semanticBindings && (semanticBindings.update != null) && semanticBindings.update || void 0;
	        if ((updateAction != null) && updateAction) {
	          updateAction(this.implementation.dataReference);
	          address.visitParentAddressesDescending((function(_this) {
	            return function(address__) {
	              var dataReference;
	              dataReference = _this.store.openNamespace(address__).data();
	              return updateAction(dataReference);
	            };
	          })(this));
	        }
	        count = 0;
	        containingComponentNotified = false;
	        _results = [];
	        while ((address != null) && address) {
	          descriptor = address.implementation.getDescriptor();
	          if (count === 0) {
	            this.store.implementation.reifier.dispatchCallback(address, "onNamespaceUpdated", void 0);
	          } else {
	            this.store.implementation.reifier.dispatchCallback(address, "onSubnamespaceUpdated", void 0);
	          }
	          if (descriptor.namespaceType === "component" || descriptor.namespaceType === "root") {
	            if (!containingComponentNotified) {
	              this.store.implementation.reifier.dispatchCallback(address, "onComponentUpdated", void 0);
	              containingComponentNotified = true;
	            } else {
	              this.store.implementation.reifier.dispatchCallback(address, "onSubcomponentUpdated", void 0);
	            }
	          }
	          address = address.createParentAddress();
	          _results.push(count++);
	        }
	        return _results;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("onm.Namespace.update failed: " + exception.message);
	      }
	    };

	    Namespace.prototype.getExtensionPointSubcomponentCount = function() {
	      var componentCount, exception_, resolvedToken;
	      try {
	        resolvedToken = this.implementation.getResolvedToken();
	        if (!((resolvedToken != null) && resolvedToken)) {
	          throw new Error("Internal error: unable to resolve token.");
	        }
	        componentCount = 0;
	        if (resolvedToken.namespaceDescriptor.namespaceType === "extensionPoint") {
	          componentCount = Object.keys(this.implementation.dataReference).length;
	        }
	        return componentCount;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Namespace.getExtensionPointSubcomponentCount failed: " + exception_.message);
	      }
	    };

	    Namespace.prototype.visitExtensionPointSubcomponents = function(callback_) {
	      var address, exception, key, object, resolvedToken, token, _ref;
	      try {
	        resolvedToken = this.implementation.getResolvedToken();
	        if (!((resolvedToken != null) && resolvedToken)) {
	          throw new Error("Internal error: unable to resolve token.");
	        }
	        if (resolvedToken.namespaceDescriptor.namespaceType !== "extensionPoint") {
	          throw new Error("You may only visit the subcomponents of an extension point namespace.");
	        }
	        _ref = this.implementation.dataReference;
	        for (key in _ref) {
	          object = _ref[key];
	          address = this.address().clone();
	          token = new AddressToken(this.store.model, resolvedToken.idNamespace, key, resolvedToken.namespaceDescriptor.archetypePathId);
	          address.implementation.pushToken(token);
	          try {
	            callback_(address);
	          } catch (_error) {
	            exception = _error;
	            throw new Error("Failure occurred inside your callback function implementation: " + exception.message);
	          }
	        }
	        return true;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("onm.Namespace.visitExtensionPointSubcomponents failed: " + exception.message);
	      }
	    };

	    return Namespace;

	  })();

	}).call(this);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	
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


	/* Resource Identifier String Processor (RISP) */

	(function() {
	  var RISP;

	  RISP = module.exports = {

	    /*
	        request = {
	            address: reference to onm.Address to convert or undefined for 'irut' request
	            format: string (one of 'readable', 'hash', 'lri', or 'uri', 'irut')
	        }
	        response = {
	            error: null or string explaining why result === null
	            result: onm-format path xRI string
	        }
	     */
	    generate: __webpack_require__(26),

	    /*
	        request = {
	            addressBase: reference to onm.Address
	            xri: onm-format xRI string (path, relative path, LRI, or URI)
	        }
	        > response = xRIP.parse(request);
	        response = {
	            error: null or string explaining why result === null
	            result: reference to onm.Address or null
	        }
	     */
	    parse: __webpack_require__(31)
	  };

	}).call(this);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	
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


	/*
	    request = {
	        address: onm.Address reference
	    }
	    response = {
	        error: null or string explaining why result === null
	        result: onm-format path hash string, undefined iff address is root, or null to indicate error
	    }
	 */

	(function() {
	  var xRIP_HashPathGenerator;

	  xRIP_HashPathGenerator = module.exports = function(request_) {
	    var addressToken, firstToken, hashTokens, response, _i, _len, _ref;
	    response = {
	      error: null,
	      result: null
	    };
	    hashTokens = [];
	    firstToken = true;
	    _ref = request_.address.implementation.tokenVector;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      addressToken = _ref[_i];
	      if (!firstToken) {
	        hashTokens.push((addressToken.key != null) && addressToken.key || "+");
	      }
	      if (addressToken.idComponent !== addressToken.idNamespace) {
	        hashTokens.push("" + addressToken.idNamespace);
	      }
	      firstToken = false;
	    }
	    response.result = hashTokens.length && (hashTokens.join('.')) || void 0;
	    return response;
	  };

	}).call(this);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	
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

	  CIDS = __webpack_require__(2);


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


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	
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

	  Address = __webpack_require__(1);

	  AddressToken = __webpack_require__(3);


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
	    var action, addressBase, addressTokenVector, childDescriptor, childStrings, currentAddressToken, currentToken, detailLevelMessage, errors, generateNewToken, inBreakScope, index, key, model, nsDescriptorCurrent, nsDescriptorNew, pathMetaString, pathString, pathToken, pathTokenIndex, pathTokens, response, sourceTokenVector, targetComponentName, topLevelMessage, unparsedPath, uriFormat, validPath, xriTokens, _i, _j, _len, _len1, _ref, _ref1;
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
	        response.result = (addressBase != null) && addressBase || request_.model.address("*");
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
	          targetComponentName = (model.implementation.getNamespaceDescriptorFromPathId(nsDescriptorCurrent.archetypePathId)).jsonTag;
	          key = void 0;
	          key = !((pathToken === "+") || (pathToken === targetComponentName)) && pathToken || void 0;
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


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, addressResolver, componentResolver, helperFunctions;

	  helperFunctions = __webpack_require__(4);

	  Address = __webpack_require__(1);

	  componentResolver = __webpack_require__(33);

	  module.exports = addressResolver = {};

	  addressResolver.resolve = function(options_) {
	    var changeEvent, componentResolutionContext, componentResolveOptions, componentsEvaluated, currentToken, dataChangeEventJournal, evaluatedTokenQueue, exception_, inputOptionsValid, message, norv, onResultVector, parentDataReference, pendingComponentResolutionOptions, pendingSubcomponent, resolvedAddressString, resolvedComponentVector, resolvedComponentWorkQueue, sourceTokenQueue, targetAddressString, token, unresolvedAddressString, _i, _j, _len, _len1, _ref, _ref1;
	    inputOptionsValid = false;
	    try {
	      if (!((options_ != null) && options_)) {
	        throw new Error("Missing options input parameter.");
	      }
	      if (!((options_.parentDataReference != null) && options_.parentDataReference)) {
	        throw new Error("Missing options.parentDataReference parameter.");
	      }
	      if (!((options_.address != null) && options_.address)) {
	        throw new Error("Missing options.address parameter.");
	      }
	      if (!((options_.strategy != null) && options_.strategy)) {
	        throw new Error("Missing options.strategy parameter.");
	      }
	      if (!((options_.strategy === 'open') || (options_.strategy === 'create') || (options_.strategy === 'negotiate'))) {
	        throw new Error("Unrecognized options.strategy value.");
	      }
	      inputOptionsValid = true;
	      resolvedComponentVector = [];
	      dataChangeEventJournal = [];
	      sourceTokenQueue = [];
	      evaluatedTokenQueue = [];
	      _ref = options_.address.implementation.tokenVector;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        token = _ref[_i];
	        sourceTokenQueue.push(token.clone());
	      }
	      resolvedComponentWorkQueue = [];
	      currentToken = sourceTokenQueue.shift();
	      componentResolveOptions = {
	        strategy: (sourceTokenQueue.length === 0) && options_.strategy || 'negotiate',
	        parentDataReference: options_.parentDataReference,
	        addressToken: currentToken,
	        semanticBindingsReference: options_.address.model.getSemanticBindings(),
	        propertyAssignmentObject: (sourceTokenQueue.length === 0) && options_.propertyAssignmentObject || {},
	        onVector: true
	      };
	      componentResolutionContext = {
	        input: componentResolveOptions,
	        output: componentResolver.resolve(componentResolveOptions)
	      };
	      resolvedComponentWorkQueue.push(componentResolutionContext);
	      componentsEvaluated = 0;
	      while (resolvedComponentWorkQueue.length) {
	        componentResolutionContext = resolvedComponentWorkQueue.shift();
	        _ref1 = componentResolutionContext.output.dataChangeEventJournal;
	        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
	          changeEvent = _ref1[_j];
	          dataChangeEventJournal.push(changeEvent);
	        }
	        onResultVector = (componentResolutionContext.input.onVector != null) && componentResolutionContext.input.onVector || false;
	        if (onResultVector) {
	          resolvedComponentVector.push(componentResolutionContext);
	          evaluatedTokenQueue.push(componentResolutionContext.input.addressToken);
	        }
	        if ((!onResultVector) || (sourceTokenQueue.length === 0)) {
	          while (componentResolutionContext.output.pendingSubcomponentStack.length) {
	            pendingSubcomponent = componentResolutionContext.output.pendingSubcomponentStack.pop();
	            pendingSubcomponent.onVector = false;
	            resolvedComponentWorkQueue.push({
	              input: pendingSubcomponent,
	              output: componentResolver.resolve(pendingSubcomponent)
	            });
	          }
	          continue;
	        }
	        if (componentResolutionContext.input.addressToken.namespaceDescriptor.namespaceType !== 'extensionPoint') {
	          throw new Error("Internal consistency check error: expected the most-recently resolved component namespace type to be an extension point.");
	        }
	        if (componentResolutionContext.input.addressToken.idNamespace !== sourceTokenQueue[0].idExtensionPoint) {
	          throw new Error("Internal consistency check error: unexpected component found at the head of the source token queue.");
	        }
	        if (componentResolutionContext.output.pendingSubcomponentStack.length && (sourceTokenQueue.length !== 1)) {
	          throw new Error("Internal consistency check error: unexpected pending subcomponent stack size. should be empty.");
	        }
	        norv = componentResolutionContext.output.namedObjectResolutionVector;
	        parentDataReference = norv[norv.length - 1].output.namespaceDataReference;
	        if (!componentResolutionContext.output.pendingSubcomponentStack.length) {
	          currentToken = sourceTokenQueue.shift();
	          componentResolveOptions = {
	            strategy: (sourceTokenQueue.length === 0) && options_.strategy || 'negotiate',
	            parentDataReference: parentDataReference,
	            addressToken: currentToken,
	            semanticBindingsReference: options_.address.model.getSemanticBindings(),
	            propertyAssignmentObject: (sourceTokenQueue.length === 0) && options_.propertyAssignmentObject || {},
	            onVector: true
	          };
	          resolvedComponentWorkQueue.push({
	            input: componentResolveOptions,
	            output: componentResolver.resolve(componentResolveOptions)
	          });
	        } else {
	          while (componentResolutionContext.output.pendingSubcomponentStack.length) {
	            pendingComponentResolutionOptions = componentResolutionContext.output.pendingSubcomponentStack.pop();
	            pendingComponentResolutionOptions.onVector = true;
	            pendingComponentResolutionOptions.propertyAssignmentObject = (sourceTokenQueue.length === 0) && options_.propertyAssignmentObject || {};
	            resolvedComponentWorkQueue.push({
	              input: pendingComponentResolutionOptions,
	              output: componentResolver.resolve(pendingComponentResolutionOptions)
	            });
	          }
	        }
	      }
	      if (sourceTokenQueue.length) {
	        throw new Error("Internal consistency check error: unexpected address resolver exit with non-empty source token queue.");
	      }
	      if (resolvedComponentVector.length !== options_.address.implementation.tokenVector.length) {
	        throw new Error("Internal consistency check error: unexpected address resolver exit with too few resolved components.");
	      }
	      return {
	        resolvedComponentVector: resolvedComponentVector,
	        dataChangeEventJournal: dataChangeEventJournal
	      };
	    } catch (_error) {
	      exception_ = _error;
	      if (!inputOptionsValid) {
	        message = "addressResolver failed in function prologue: " + exception_.message;
	      } else {
	        targetAddressString = options_.address.uri();
	        resolvedAddressString = evaluatedTokenQueue.length && (new Address(options_.address.model, evaluatedTokenQueue).uri()) || '';
	        unresolvedAddressString = targetAddressString.substring(resolvedAddressString.length, targetAddressString.length);
	        message = "addressResolver.resolve failed to resolve '" + resolvedAddressString + ">>" + unresolvedAddressString + "<<' via strategy '" + options_.strategy + "':: " + exception_.message;
	      }
	      throw new Error(message);
	    }
	  };

	  addressResolver.getResolvedNamedObjectReference = function(resolvedAddressObject_) {
	    var exception_, resolvedComponentContext, resolvedComponentCount;
	    try {
	      if (!((resolvedAddressObject_ != null) && resolvedAddressObject_)) {
	        throw new Error("Missing resolved address context object in-parameter.");
	      }
	      resolvedComponentCount = resolvedAddressObject_.resolvedComponentVector.length;
	      if (!resolvedComponentCount) {
	        throw new Error("Cannot extract a named object reference from resolved address context object because it contains no resolved components.");
	      }
	      resolvedComponentContext = resolvedAddressObject_.resolvedComponentVector[resolvedComponentCount - 1];
	      return componentResolver.getResolvedNamedObjectReference(resolvedComponentContext);
	    } catch (_error) {
	      exception_ = _error;
	      throw new Error("addressResolver.getResolvedNamedObjectReference failed: " + exception_.message);
	    }
	  };

	  addressResolver.getResolvedTokenVector = function(resolvedAddressObject_) {
	    var exception_, resolvedComponentContext, resolvedTokenVector, _i, _len, _ref;
	    try {
	      resolvedTokenVector = [];
	      if (!((resolvedAddressObject_ != null) && resolvedAddressObject_)) {
	        throw new Error("Missing resolved address context object in-parameter.");
	      }
	      _ref = resolvedAddressObject_.resolvedComponentVector;
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        resolvedComponentContext = _ref[_i];
	        resolvedTokenVector.push(componentResolver.getResolvedToken(resolvedComponentContext));
	      }
	      return resolvedTokenVector;
	    } catch (_error) {
	      exception_ = _error;
	      throw new Error("addressResolver.getResolvedTokenVector failed: " + exception_.message);
	    }
	  };

	}).call(this);


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var helperFunctions, namedObjectResolverContext;

	  helperFunctions = __webpack_require__(4);

	  module.exports = namedObjectResolverContext = {};

	  namedObjectResolverContext.initializeContextObject = function(options_) {
	    var context;
	    return context = {
	      input: {
	        strategy: (options_.strategy != null) && options_.strategy || 'error',
	        parentDataReference: options_.parentDataReference,
	        targetNamespaceDescriptor: options_.targetNamespaceDescriptor,
	        targetNamespaceKey: options_.targetNamespaceKey,
	        semanticBindingsReference: options_.semanticBindingsReference,
	        propertyAssignmentObject: (options_.propertyAssignmentObject != null) && options_.propertyAssignmentObject && helperFunctions.clone(options_.propertyAssignmentObject) || {}
	      },
	      output: {
	        strategyFollowed: 'error',
	        namespaceEffectiveKey: null,
	        namespaceDataReference: null,
	        dataChangeEventJournal: [],
	        pendingResolutionStack: [],
	        resolvedId: -1
	      }
	    };
	  };

	  namedObjectResolverContext.checkValidContextInput = function(options_) {
	    var results, setInvalid, strategyValid;
	    results = {
	      valid: true,
	      reason: 'okay'
	    };
	    setInvalid = function(reason_) {
	      results.valid = false;
	      results.reason = reason_;
	      return results;
	    };
	    while (true) {
	      if (!((options_ != null) && options_)) {
	        setInvalid("Missing options in-parameter.");
	        break;
	      }
	      if (!((options_.parentDataReference != null) && options_.parentDataReference)) {
	        setInvalid("Missing parent data object reference.");
	        break;
	      }
	      if (!((options_.targetNamespaceDescriptor != null) && options_.targetNamespaceDescriptor)) {
	        setInvalid("Missing target namespace descriptor object reference.");
	        break;
	      }
	      if (!((options_.targetNamespaceDescriptor.jsonTag != null) && options_.targetNamespaceDescriptor.jsonTag)) {
	        setInvalid("Specified target namespace descriptor object appears invalid.");
	        break;
	      }
	      if (!((options_.strategy != null) && options_.strategy && (options_.strategy.length != null) && options_.strategy.length)) {
	        setInvalid("Missing resolution strategy specification.");
	        break;
	      }
	      strategyValid = true;
	      switch (options_.strategy) {
	        case 'open':
	          break;
	        case 'create':
	          break;
	        case 'negotiate':
	          break;
	        default:
	          strategyValid = false;
	          break;
	      }
	      if (!strategyValid) {
	        setInvalid("Unrecognized resolution strategy specified.");
	        break;
	      }
	      if ((options_.targetNamespaceKey != null) && options_.targetNamespaceKey) {
	        if (!((options_.targetNamespaceKey.length != null) && options_.targetNamespaceKey.length)) {
	          setInvalid("Invalid target namespace key specified.");
	        }
	      }
	      if (!((options_.semanticBindingsReference != null) && options_.semanticBindingsReference)) {
	        setInvalid("Missing semantic bindings reference.");
	        break;
	      }
	      if (!((options_.propertyAssignmentObject != null) && options_.propertyAssignmentObject)) {
	        setInvalid("Missing property assignment object.");
	        break;
	      }
	      break;
	    }
	    return results.valid;
	  };

	  namedObjectResolverContext.checkValidContextOutput = function(results_) {
	    var results, setInvalid;
	    results = {
	      valid: true,
	      reason: 'okay'
	    };
	    setInvalid = function(reason_) {
	      results.valid = false;
	      results.reason = reason_;
	      return results;
	    };
	    while (true) {
	      if (!((results_ != null) && results_)) {
	        setInvalid("Missing results");
	        break;
	      }
	      if (!((results_.resolvedId != null) && (results_.resolvedId >= 0))) {
	        setInvalid("Invalid resolved namespace model ID.");
	        break;
	      }
	      if (!((results_.namespaceEffectiveKey != null) && results_.namespaceEffectiveKey && (results_.namespaceEffectiveKey.length != null) && results_.namespaceEffectiveKey.length)) {
	        setInvalid("Invalid namespaceEffectiveKey");
	        break;
	      }
	      if (!((results_.namespaceDataReference != null) && results_.namespaceDataReference)) {
	        setInvalid("Invalid namespaceDataReference");
	        break;
	      }
	      if (!((results_.pendingResolutionStack != null) && results_.pendingResolutionStack && Array.isArray(results_.pendingResolutionStack))) {
	        setInvalid("Invalid pendingResolutionStack");
	        break;
	      }
	      if (!((results_.strategyFollowed != null) && results_.strategyFollowed)) {
	        setInvalid("Invalid strategyFollowed");
	        break;
	      }
	      if (!((results_.dataChangeEventJournal != null) && results_.dataChangeEventJournal && Array.isArray(results_.dataChangeEventJournal))) {
	        setInvalid("Invalid dataChangeEventJournal");
	        break;
	      }
	      switch (results_.strategyFollowed) {
	        case 'open':
	          break;
	        case 'create':
	          break;
	        default:
	          setInvalid("Invalid strategyFollowed value '" + results_.strategyFollowed + "'.");
	          break;
	      }
	      break;
	    }
	    return results.valid;
	  };

	}).call(this);


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var propertyPolicyCommon, typeLUT;

	  module.exports = propertyPolicyCommon = {};

	  typeLUT = {
	    '[object Null]': true,
	    '[object Boolean]': true,
	    '[object String]': true,
	    '[object Number]': true,
	    '[object Object]': true,
	    '[object Array]': true
	  };

	  propertyPolicyCommon.checkValidPropertyValue = function(value_) {
	    var check;
	    check = typeLUT[Object.prototype.toString.call(value_)];
	    return (check != null) && check || false;
	  };

	  propertyPolicyCommon.checkValidNamedObject = function(object_) {
	    return (Object.prototype.toString.call(object_) === '[object Object]') || false;
	  };

	}).call(this);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  'use strict';
	  var cid, cname, cnameTable;

	  cnameTable = {};

	  cnameTable.reservedPropertyName = '__cid__';

	  cnameTable.cnames = [];

	  cnameTable.cname2cid = {
	    IRUT: 'onmRWMgVT-Gls0D99oo-9A',
	    Model: 'onmnqPaPSWKDsC9c8GZaEg',
	    Address: 'onm-jxccSVSMum1pxB7-RA',
	    Store: 'onmJ854qRVarn0zv7arr1w',
	    Namespace: 'onmPnVIeToa_1BxO8Y47gg',
	    NSD: 'onm7f7BZTEONDSnfrSs6AA',
	    ASM: 'onmN7AoERO-3jIhkVqkxEg',
	    RAS: 'onmbrsKOR0iv8kZXzhXejw',
	    DAO: 'onmP7n5uTxaLduPZF_Naig',
	    RAL: 'onmthokETQuOMLrIDeegpw',
	    RLP: 'onmESS9lSZukNLhQmCosyQ',
	    RIS: 'onmf5Qt2RD2g30oDtsZD1g',
	    DAB: 'onmCBeRAQFKhIokTJLTGfA',
	    JSON: 'onmFMpxfSCaZO943sLfuxw',
	    DATA: 'onmVNJZMQUKjDmocj6esPA'
	  };

	  cnameTable.cid2cname = {};

	  for (cname in cnameTable.cname2cid) {
	    cid = cnameTable.cname2cid[cname];
	    cnameTable.cid2cname[cid] = cname;
	    cnameTable.cnames.push(cname);
	  }

	  Object.freeze(cnameTable);

	  module.exports = cnameTable;

	}).call(this);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	
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

	  AddressToken = __webpack_require__(3);

	  Address = __webpack_require__(1);

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


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, AddressToken, LUID, ModelDetails, UTIL, intrinsicDataModels, uuid, xRIP;

	  UTIL = __webpack_require__(4);

	  if (!((UTIL != null) && UTIL)) {
	    throw new Error("Failed to load helper functions");
	  }

	  if (!((UTIL.clone != null) && UTIL.clone)) {
	    throw new Error("Why are we missing the clone function?");
	  }

	  intrinsicDataModels = __webpack_require__(6);

	  Address = __webpack_require__(1);

	  AddressToken = __webpack_require__(3);

	  xRIP = __webpack_require__(9);

	  uuid = __webpack_require__(5);

	  LUID = 1;

	  module.exports = ModelDetails = (function() {
	    function ModelDetails(model_, objectModelDeclaration_) {
	      var buildOMDescriptorFromLayout, defaultSemanticBindings, exception;
	      try {
	        this.model = ((model_ != null) && model_) || (function() {
	          throw new Error("Internal error missing model input parameter.");
	        })();
	        buildOMDescriptorFromLayout = (function(_this) {
	          return function(ONMD_, path_, parentDescriptor_, componentDescriptor_, parentPathIdVector_, parentPathExtensionPointIdVector_) {
	            var archetypeDescriptor, componentDescriptor, description, exception, id, label, namespaceProperties, namespaceType, objectModelDescriptorReference, parentPathExtensionPoints, path, pathReference, processArchetypeDeclaration, subNamespace, tag, thisDescriptor, updatedParentPathExtensionPointIdVector, _i, _len, _ref;
	            try {
	              if (!((ONMD_ != null) && ONMD_)) {
	                throw new Error("Missing object model layout object input parameter! If you specified the namespace declaration via object reference, check the validity of the reference.");
	              }
	              if (!((ONMD_.jsonTag != null) && ONMD_.jsonTag)) {
	                throw new Error("Missing required namespace declaration property 'jsonTag'.");
	              }
	              tag = (ONMD_.jsonTag != null) && ONMD_.jsonTag || (function() {
	                throw new Error("Namespace declaration missing required `jsonTag` property.");
	              })();
	              path = (path_ != null) && path_ && ("" + path_ + "." + tag) || tag;
	              label = (ONMD_.____label != null) && ONMD_.____label || ONMD_.jsonTag;
	              description = (ONMD_.____description != null) && ONMD_.____description || "no description provided";
	              id = _this.countDescriptors++;
	              namespaceType = ((ONMD_.namespaceType != null) && ONMD_.namespaceType) || (!id && (ONMD_.namespaceType = "root")) || (function() {
	                throw new Error("Internal error unable to determine namespace type.");
	              })();
	              parentPathExtensionPoints = void 0;
	              if ((parentPathExtensionPointIdVector_ != null) && parentPathExtensionPointIdVector_) {
	                parentPathExtensionPoints = UTIL.clone(parentPathExtensionPointIdVector_);
	              } else {
	                parentPathExtensionPoints = [];
	              }
	              namespaceProperties = (ONMD_.namespaceProperties != null) && ONMD_.namespaceProperties || {};
	              thisDescriptor = _this.objectModelDescriptorById[id] = {
	                "archetypePathId": -1,
	                "children": [],
	                "componentNamespaceIds": [],
	                "description": description,
	                "extensionPointReferenceIds": [],
	                "id": id,
	                "idComponent": id,
	                "isComponent": false,
	                "jsonTag": tag,
	                "label": label,
	                "namespaceType": namespaceType,
	                "namespaceModelDeclaration": ONMD_,
	                "namespaceModelPropertiesDeclaration": namespaceProperties,
	                "parent": parentDescriptor_,
	                "parentPathExtensionPoints": parentPathExtensionPoints,
	                "parentPathIdVector": [],
	                "path": path
	              };
	              _this.objectModelPathMap[path] = thisDescriptor;
	              if ((parentDescriptor_ != null) && parentDescriptor_) {
	                parentDescriptor_.children.push(thisDescriptor);
	                thisDescriptor.parentPathIdVector = UTIL.clone(parentDescriptor_.parentPathIdVector);
	                thisDescriptor.parentPathIdVector.push(parentDescriptor_.id);
	              }
	              if (_this.rankMax < thisDescriptor.parentPathIdVector.length) {
	                _this.rankMax = thisDescriptor.parentPathIdVector.length;
	              }
	              componentDescriptor = void 0;
	              switch (namespaceType) {
	                case "extensionPoint":
	                  if (!((componentDescriptor_ != null) && componentDescriptor_)) {
	                    throw new Error("Internal error: componentDescriptor_ should be defined.");
	                  }
	                  thisDescriptor.idComponent = componentDescriptor_.id;
	                  componentDescriptor = componentDescriptor_;
	                  componentDescriptor.extensionPoints[path] = thisDescriptor;
	                  processArchetypeDeclaration = void 0;
	                  archetypeDescriptor = void 0;
	                  if ((ONMD_.componentArchetype != null) && ONMD_.componentArchetype) {
	                    processArchetypeDeclaration = true;
	                    archetypeDescriptor = ONMD_.componentArchetype;
	                  } else if ((ONMD_.componentArchetypePath != null) && ONMD_.componentArchetypePath) {
	                    processArchetypeDeclaration = false;
	                    pathReference = ONMD_.componentArchetypePath;
	                    objectModelDescriptorReference = _this.objectModelPathMap[pathReference];
	                    if (!((objectModelDescriptorReference != null) && objectModelDescriptorReference)) {
	                      throw new Error("Extension point namespace '" + path + "' component archetype '" + pathReference + "' was not found and is invalid.");
	                    }
	                    if (objectModelDescriptorReference.namespaceType !== "component") {
	                      throw new Error("Extension point namespace '" + path + "' declares component archetype '" + pathReference + "' which is not a 'component' namespace type.");
	                    }
	                    objectModelDescriptorReference.extensionPointReferenceIds.push(thisDescriptor.id);
	                    thisDescriptor.children.push(objectModelDescriptorReference);
	                    thisDescriptor.archetypePathId = objectModelDescriptorReference.id;
	                    _this.countExtensionReferences++;
	                  } else {
	                    throw new Error("Cannot process extension point declaration because its corresponding extension archetype is missing from the object model declaration.");
	                  }
	                  updatedParentPathExtensionPointIdVector = UTIL.clone(parentPathExtensionPoints);
	                  updatedParentPathExtensionPointIdVector.push(id);
	                  _this.countExtensionPoints++;
	                  if (processArchetypeDeclaration) {
	                    buildOMDescriptorFromLayout(archetypeDescriptor, path, thisDescriptor, componentDescriptor, thisDescriptor.parentPathIdVector, updatedParentPathExtensionPointIdVector);
	                  }
	                  break;
	                case "component":
	                  thisDescriptor.isComponent = true;
	                  thisDescriptor.extensionPoints = {};
	                  parentDescriptor_.archetypePathId = id;
	                  componentDescriptor = thisDescriptor;
	                  _this.countExtensions++;
	                  _this.countComponents++;
	                  break;
	                case "root":
	                  if ((componentDescriptor_ != null) || componentDescriptor) {
	                    throw new Error("Internal error: componentDescriptor_ should be undefined.");
	                  }
	                  thisDescriptor.isComponent = true;
	                  thisDescriptor.extensionPoints = {};
	                  componentDescriptor = thisDescriptor;
	                  _this.countComponents++;
	                  break;
	                case "child":
	                  if (!((componentDescriptor_ != null) && componentDescriptor_)) {
	                    throw new Error("Internal error: componentDescriptor_ should be defined.");
	                  }
	                  thisDescriptor.idComponent = componentDescriptor_.id;
	                  componentDescriptor = componentDescriptor_;
	                  _this.countChildren++;
	                  break;
	                default:
	                  throw new Error("Unrecognized namespace type '" + namespaceType + "' in object model namespace declaration.");
	              }
	              _this.objectModelDescriptorById[thisDescriptor.idComponent].componentNamespaceIds.push(thisDescriptor.id);
	              if (!((ONMD_.subNamespaces != null) && ONMD_.subNamespaces)) {
	                return true;
	              }
	              _ref = ONMD_.subNamespaces;
	              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	                subNamespace = _ref[_i];
	                buildOMDescriptorFromLayout(subNamespace, path, thisDescriptor, componentDescriptor, thisDescriptor.parentPathIdVector, parentPathExtensionPoints);
	              }
	              return true;
	            } catch (_error) {
	              exception = _error;
	              throw new Error("buildOMDescriptorFromLayout failure on path '" + path_ + "'. Details: " + exception.message);
	            }
	          };
	        })(this);
	        this.getNamespaceDescriptorFromPathId = (function(_this) {
	          return function(pathId_) {
	            var exception, objectModelDescriptor;
	            try {
	              if (!(pathId_ != null)) {
	                throw new Error("Missing path ID parameter!");
	              }
	              if ((pathId_ < 0) || (pathId_ >= _this.objectModelDescriptorById.length)) {
	                throw new Error("Out of range path ID '" + pathId_ + " cannot be resolved.");
	              }
	              objectModelDescriptor = _this.objectModelDescriptorById[pathId_];
	              if (!((objectModelDescriptor != null) && objectModelDescriptor)) {
	                throw new Error("Cannot resolve path ID `" + pathId_ + "` in data model '" + _this.objectModelDescriptorById[0].jsonTag + "'.");
	              }
	              return objectModelDescriptor;
	            } catch (_error) {
	              exception = _error;
	              throw new Error("getNamespaceDescriptorFromPathId failure: " + exception.message);
	            }
	          };
	        })(this);
	        this.getNamespaceDescriptorFromPath = (function(_this) {
	          return function(path_) {
	            var exception;
	            try {
	              return _this.getNamespaceDescriptorFromPathId(_this.getPathIdFromPath(path_));
	            } catch (_error) {
	              exception = _error;
	              throw new Error("getNamespaceDescriptorFromPath failure: " + exception.message);
	            }
	          };
	        })(this);
	        this.getPathIdFromPath = (function(_this) {
	          return function(path_) {
	            var exception, objectModelDescriptor, objectModelPathId;
	            try {
	              if (!((path_ != null) && path_)) {
	                throw new Error("Missing object model path parameter!");
	              }
	              objectModelDescriptor = _this.objectModelPathMap[path_];
	              if (!((objectModelDescriptor != null) && objectModelDescriptor)) {
	                throw new Error("Path '" + path_ + "' is not in the '" + _this.model.jsonTag + "' model's address space.");
	              }
	              objectModelPathId = objectModelDescriptor.id;
	              if (objectModelPathId == null) {
	                throw new Error("Internal error: Invalid object model descriptor doesn't support id property for path '" + objectModelPath_ + "'.");
	              }
	              return objectModelPathId;
	            } catch (_error) {
	              exception = _error;
	              throw new Error("getPathIdFromPath fail: " + exception.message);
	            }
	          };
	        })(this);
	        this.getPathFromPathId = (function(_this) {
	          return function(pathId_) {
	            var exception, objectModelDescriptor, path;
	            try {
	              objectModelDescriptor = _this.getNamespaceDescriptorFromPathId(pathId_);
	              if (!((objectModelDescriptor != null) && objectModelDescriptor)) {
	                throw new Error("Internal error: Can't find object descriptor for valid path ID '" + pathId_ + ".");
	              }
	              path = objectModelDescriptor.path;
	              if (!((path != null) && path)) {
	                throw new Error("Internal error: Invalid object model descriptor doesn't support path property for path '" + objectModelPath_ + "'.");
	              }
	              return path;
	            } catch (_error) {
	              exception = _error;
	              throw new Error("getPathFromPathId fail: " + exception.message);
	            }
	          };
	        })(this);
	        this.createAddressFromPathId = function(pathId_) {
	          var descriptor, exception, newAddress, parentPathId, pathIds, targetDescriptor, token, _i, _len;
	          try {
	            if (pathId_ == null) {
	              throw new Error("Missing path input parameter.");
	            }
	            targetDescriptor = this.getNamespaceDescriptorFromPathId(pathId_);
	            newAddress = new Address(this.model);
	            token = void 0;
	            pathIds = UTIL.clone(targetDescriptor.parentPathIdVector);
	            pathIds.push(targetDescriptor.id);
	            for (_i = 0, _len = pathIds.length; _i < _len; _i++) {
	              parentPathId = pathIds[_i];
	              descriptor = this.getNamespaceDescriptorFromPathId(parentPathId);
	              if (descriptor.namespaceType === "component") {
	                newAddress.implementation.pushToken(token);
	              }
	              token = new AddressToken(this.model, descriptor.idExtensionPoint, void 0, descriptor.id);
	            }
	            newAddress.implementation.pushToken(token);
	            return newAddress;
	          } catch (_error) {
	            exception = _error;
	            throw new Error("getAddressFromPathId failure: " + exception.message);
	          }
	        };
	        this.resetKeyGenerator = function() {
	          LUID = 1;
	          return this.model;
	        };
	        if (!((objectModelDeclaration_ != null) && objectModelDeclaration_)) {
	          throw new Error("Missing object model delcaration input parameter!");
	        }
	        if (!((objectModelDeclaration_.jsonTag != null) && objectModelDeclaration_.jsonTag)) {
	          throw new Error("Missing required root namespace property 'jsonTag'.");
	        }
	        this.model.jsonTag = objectModelDeclaration_.jsonTag;
	        this.model.label = (objectModelDeclaration_.____label != null) && objectModelDeclaration_.____label || objectModelDeclaration_.jsonTag;
	        this.model.description = (objectModelDeclaration_.____description != null) && objectModelDeclaration_.____description || "<no description provided>";
	        this.model.uuid = (objectModelDeclaration_.uuid != null) && objectModelDeclaration_.uuid || (function() {
	          throw new Error("Data model declaration missing required root namespace property 'uuid'.");
	        })();
	        this.model.uuidVersion = (objectModelDeclaration_.uuidVersion != null) && objectModelDeclaration_.uuidVersion || (function() {
	          throw new Error("Data model declaration missing required root namespace property 'uuidVersion'.");
	        })();
	        this.objectModelDeclaration = UTIL.clone(objectModelDeclaration_);
	        Object.freeze(this.objectModelDeclaration);
	        if (!((this.objectModelDeclaration != null) && this.objectModelDeclaration)) {
	          throw new Error("Failed to deep copy (clone) source object model declaration.");
	        }
	        this.objectModelPathMap = {};
	        this.objectModelDescriptorById = [];
	        this.countDescriptors = 0;
	        this.countComponents = 0;
	        this.countExtensionPoints = 0;
	        this.countExtensions = 0;
	        this.countExtensionReferences = 0;
	        this.countChildren = 0;
	        this.rankMax = 0;
	        buildOMDescriptorFromLayout(objectModelDeclaration_);
	        if (this.countExtensionPoints !== this.countExtensions + this.countExtensionReferences) {
	          throw new Error("Layout declaration error: extension point and extension descriptor counts do not match. countExtensionPoints=" + this.countExtensionPoints + " countExtensions=" + this.countExtensions);
	        }
	        if (this.countComponents !== this.countExtensionPoints + 1 - this.countExtensionReferences) {
	          throw new Error("Layout declaration error: component count should be " + ("extension count + 1 - extension references. componentCount=" + this.countComponents + " ") + (" countExtensions=" + this.countExtensions + " extensionReferences=" + this.countExtensionReferences));
	        }
	        Object.freeze(this.objectModelPathMap);
	        Object.freeze(this.objectModelDescriptorById);
	        defaultSemanticBindings = {
	          componentKeyGenerator: 'internalUuid',
	          namespaceVersion: 'disabled'
	        };
	        this.semanticBindings = {};
	        this.componentKeyGenerator = 'internalUuid';
	        this.namespaceVersioning = 'disabled';
	        if ((this.objectModelDeclaration.semanticBindings != null) && this.objectModelDeclaration.semanticBindings) {
	          if ((this.objectModelDeclaration.semanticBindings.componentKeyGenerator != null) && this.objectModelDeclaration.semanticBindings.componentKeyGenerator) {
	            this.componentKeyGenerator = this.objectModelDeclaration.semanticBindings.componentKeyGenerator;
	          }
	          if ((this.objectModelDeclaration.semanticBindings.namespaceVersioning != null) && this.objectModelDeclaration.semanticBindings.namespaceVersioning) {
	            this.namespaceVersioning = this.objectModelDeclaration.semanticBindings.namespaceVersioning;
	          }
	        }
	        switch (this.componentKeyGenerator) {
	          case "internalLuid":
	            this.semanticBindings.getUniqueKey = (function(_this) {
	              return function() {
	                return "" + (LUID++);
	              };
	            })(this);
	            break;
	          case "internalUuid":
	            this.semanticBindings.getUniqueKey = (function(_this) {
	              return function() {
	                return uuid.v4();
	              };
	            })(this);
	            break;
	          default:
	            throw new Error("Unrecognized componentKeyGenerator='" + this.componentKeyGenerator + ".'");
	        }
	        switch (this.namespaceVersioning) {
	          case "disabled":
	            if ((this.semanticBindings.update != null) && this.semanticBindings.update) {
	              delete this.semanticBindings.update;
	            }
	            break;
	          case "internalSimple":
	            this.semanticBindings.update = function(data_) {
	              if (data_.revision != null) {
	                return data_.revision++;
	              }
	            };
	            break;
	          case "internalAdvanced":
	            this.semanticBindings.update = function(data_) {
	              if (data_.revision != null) {
	                data_.revision++;
	              }
	              if (data_.uuidRevision != null) {
	                data_.uuidRevision = uuid.v4();
	              }
	              if (data_.revisionTime != null) {
	                return data_.revisionTime = UTIL.getEpochTime();
	              }
	            };
	            break;
	          case "external":
	            break;
	          default:
	            throw new Error("Unrecognized namespaceVersionion=`" + this.namespaceUpdateRevision + "'");
	        }
	      } catch (_error) {
	        exception = _error;
	        throw new Error("onm.Model.implementation failed: " + exception.message);
	      }
	    }

	    return ModelDetails;

	  })();

	}).call(this);


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Namespace, StoreReifier, helperFunctions;

	  helperFunctions = __webpack_require__(4);

	  Namespace = __webpack_require__(8);

	  module.exports = StoreReifier = (function() {
	    function StoreReifier(objectStore_) {
	      var exception;
	      try {
	        this.store = objectStore_;
	        this.dispatchCallback = (function(_this) {
	          return function(address_, callbackName_, observerId_) {
	            var callbackFunction, callbackInterface, exception, exceptionMessage, observerId, _ref, _results;
	            try {
	              if ((observerId_ != null) && observerId_) {
	                callbackInterface = _this.store.implementation.observers[observerId_];
	                if (!((callbackInterface != null) && callbackInterface)) {
	                  throw new Error("Internal error: unable to resolve observer ID to obtain callback interface.");
	                }
	                callbackFunction = callbackInterface[callbackName_];
	                if ((callbackFunction != null) && callbackFunction) {
	                  try {
	                    return callbackFunction(_this.store, observerId_, address_);
	                  } catch (_error) {
	                    exception = _error;
	                    throw new Error("An error occurred in the '" + callbackName_ + "' method of your observer interface: " + exception.message);
	                  }
	                }
	              } else {
	                _ref = _this.store.implementation.observers;
	                _results = [];
	                for (observerId in _ref) {
	                  callbackInterface = _ref[observerId];
	                  callbackFunction = callbackInterface[callbackName_];
	                  if ((callbackFunction != null) && callbackFunction) {
	                    try {
	                      _results.push(callbackFunction(_this.store, observerId, address_));
	                    } catch (_error) {
	                      exception = _error;
	                      throw new Error("An error occurred in the '" + callbackName_ + "' method of your observer interface: " + exception.message);
	                    }
	                  } else {
	                    _results.push(void 0);
	                  }
	                }
	                return _results;
	              }
	            } catch (_error) {
	              exception = _error;
	              exceptionMessage = "dispatchCallback failure while processing " + ("address='" + (address_.getHumanReadableString()) + "', callback='" + callbackName_ + "', observer='" + ((observerId_ != null) && observerId_ || "[broadcast all]") + "': " + exception.message);
	              throw new Error(exceptionMessage);
	            }
	          };
	        })(this);
	        this.reifyStoreComponent = (function(_this) {
	          return function(address_, observerId_) {
	            var dispatchCallback, exception;
	            try {
	              if (!((address_ != null) && address_)) {
	                throw new Error("Internal error: Missing address input parameter.");
	              }
	              if (!helperFunctions.dictionaryLength(_this.store.implementation.observers)) {
	                return;
	              }
	              dispatchCallback = _this.dispatchCallback;
	              dispatchCallback(address_, "onComponentCreated", observerId_);
	              address_.visitSubaddressesAscending(function(addressSubnamespace_) {
	                return dispatchCallback(addressSubnamespace_, "onNamespaceCreated", observerId_);
	              });
	              return true;
	            } catch (_error) {
	              exception = _error;
	              throw new Error("reifyStoreComponent failure: " + exception.message);
	            }
	          };
	        })(this);
	        this.unreifyStoreComponent = (function(_this) {
	          return function(address_, observerId_) {
	            var dispatchCallback, exception;
	            try {
	              if (!((address_ != null) && address_)) {
	                throw new Error("Internal error: Missing address input parameter.");
	              }
	              if (!helperFunctions.dictionaryLength(_this.store.implementation.observers)) {
	                return;
	              }
	              dispatchCallback = _this.dispatchCallback;
	              address_.visitSubaddressesDescending(function(addressSubnamespace_) {
	                return dispatchCallback(addressSubnamespace_, "onNamespaceRemoved", observerId_);
	              });
	              dispatchCallback(address_, "onComponentRemoved", observerId_);
	              return true;
	            } catch (_error) {
	              exception = _error;
	              throw new Error("unreifyStoreComponent failure: " + exception.message);
	            }
	          };
	        })(this);
	        this.reifyStoreExtensions = (function(_this) {
	          return function(address_, observerId_, undoFlag_) {
	            var dispatchCallback, exception;
	            try {
	              if (!((address_ != null) && address_)) {
	                throw new Error("Internal error: Missing address input parameter.");
	              }
	              if (!helperFunctions.dictionaryLength(_this.store.implementation.observers)) {
	                return;
	              }
	              dispatchCallback = _this.dispatchCallback;
	              return address_.visitExtensionPointAddresses(function(addressExtensionPoint_) {
	                var extensionPointNamespace;
	                extensionPointNamespace = new Namespace(_this.store, addressExtensionPoint_);
	                extensionPointNamespace.visitExtensionPointSubcomponents(function(addressSubcomponent_) {
	                  if (!undoFlag_) {
	                    _this.reifyStoreComponent(addressSubcomponent_, observerId_);
	                    _this.reifyStoreExtensions(addressSubcomponent_, observerId_, false);
	                  } else {
	                    _this.reifyStoreExtensions(addressSubcomponent_, observerId_, true);
	                    _this.unreifyStoreComponent(addressSubcomponent_, observerId_);
	                  }
	                  return true;
	                });
	                return true;
	              });
	            } catch (_error) {
	              exception = _error;
	              throw new Error("reifyStoreExtensions failure: " + exception.message);
	            }
	          };
	        })(this);
	      } catch (_error) {
	        exception = _error;
	        throw new Error("StoreReifier constructor failed: " + exception.message);
	      }
	    }

	    return StoreReifier;

	  })();

	}).call(this);


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, AddressToken, CIDS, Model, Namespace, Store, StoreDetails, StoreReifier, addressResolver, helperFunctions, uuid,
	    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	  CIDS = __webpack_require__(2);

	  helperFunctions = __webpack_require__(4);

	  StoreReifier = __webpack_require__(19);

	  AddressToken = __webpack_require__(3);

	  Address = __webpack_require__(1);

	  addressResolver = __webpack_require__(13);

	  Model = __webpack_require__(7);

	  Namespace = __webpack_require__(8);

	  uuid = __webpack_require__(5);

	  StoreDetails = (function() {
	    function StoreDetails(store_, model_, data_) {
	      var addressResolverOptions, cidsResponse, exception_, ingress, resolvedAddressContext;
	      try {
	        cidsResponse = CIDS.setCID({
	          ref: this,
	          cname: 'Store'
	        });
	        if (cidsResponse.error) {
	          throw new Error(cidsResponse.error);
	        }
	        this.store = store_;
	        this.model = model_;
	        this.reifier = new StoreReifier(this.store);
	        this.dataReference = {};
	        this.objectStoreSource = "new";
	        ingress = (function(_this) {
	          return function(data_) {
	            var dataType, result;
	            result = void 0;
	            if ((data_ != null) && data_) {
	              dataType = Object.prototype.toString.call(data_);
	              switch (dataType) {
	                case '[object Object]':
	                  result = data_;
	                  _this.objectStoreSource = "json";
	                  break;
	                case '[object String]':
	                  result = ingress(JSON.parse(data_));
	                  break;
	                default:
	                  throw new Error("Invalid store construction data type '" + dataType + "'. Expected '[object Object]' or JSON equivalent string serialization.");
	              }
	            }
	            return (result != null) && result || {};
	          };
	        })(this);
	        addressResolverOptions = {
	          strategy: 'create',
	          address: this.model.address("*"),
	          propertyAssignmentObject: ingress(data_),
	          parentDataReference: this.dataReference,
	          semanticBindingsReference: this.model.getSemanticBindings()
	        };
	        resolvedAddressContext = addressResolver.resolve(addressResolverOptions);
	        this.observers = {};
	        this.observersState = {};
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("StoreDetails failure: " + exception_.message);
	      }
	    }

	    return StoreDetails;

	  })();

	  module.exports = Store = (function() {
	    function Store(model_, data_) {
	      this.removeObserverNamespaceState = __bind(this.removeObserverNamespaceState, this);
	      this.openObserverNamespaceState = __bind(this.openObserverNamespaceState, this);
	      this.openObserverComponentState = __bind(this.openObserverComponentState, this);
	      this.removeObserverState = __bind(this.removeObserverState, this);
	      this.openObserverState = __bind(this.openObserverState, this);
	      this.unregisterObserver = __bind(this.unregisterObserver, this);
	      this.registerObserver = __bind(this.registerObserver, this);
	      this.sdab = __bind(this.sdab, this);
	      this.toJSON = __bind(this.toJSON, this);
	      this.removeComponent = __bind(this.removeComponent, this);
	      this.createComponent = __bind(this.createComponent, this);
	      this.nsCreate = __bind(this.nsCreate, this);
	      this.openNamespace = __bind(this.openNamespace, this);
	      this.nsOpen = __bind(this.nsOpen, this);
	      this.nsAccess = __bind(this.nsAccess, this);
	      this.namespace = __bind(this.namespace, this);
	      this.address = __bind(this.address, this);
	      this.validateAddressModel = __bind(this.validateAddressModel, this);
	      var exception_, model;
	      try {
	        this.model = model = (model_ != null) && model_ || new Model();
	        this.implementation = new StoreDetails(this, model, data_);
	        this.jsonTag = model.jsonTag;
	        this.label = model.label;
	        this.description = model.description;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store constructor failed: " + exception_.message);
	      }
	    }

	    Store.prototype.validateAddressModel = function(address_, strict_) {
	      var exception_;
	      try {
	        if (!((address_ != null) && address_)) {
	          throw new Error("Missing address input parameter.");
	        }
	        if (!((address_.model != null) && address_.model)) {
	          throw new Error("Invalid address object passed as input parameter.");
	        }
	        return this.model.isEqual(address_.model, strict_);
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.validateAddressModel failed: " + exception_.message);
	      }
	    };

	    Store.prototype.address = function(request_) {
	      var addressRoot, addressSubpath, exception_, rls, rlsType;
	      try {
	        addressRoot = this.model.address("*");
	        if (!((request_ != null) && request_)) {
	          return addressRoot;
	        }
	        if (!((request_.rls != null) && request.rls)) {
	          throw new Error("Request missing required resource locator string property 'rls'.");
	        }
	        rlsType = Object.prototype.toString.call(request_.rls);
	        if (rlsType !== '[object String]') {
	          throw new Error("Invalid resource locator type '" + rlsType + "'. Expected '[object String]'.");
	        }
	        rls = request_.rls;
	        addressSubpath = null;
	        try {
	          addressSubpath = this.model.address(rls);
	        } catch (_error) {
	          exception_ = _error;
	          try {
	            addressSubpath = this.model.lri(rls);
	          } catch (_error) {
	            exception_ = _error;
	            try {
	              addressSubpath = this.model.uri(rls);
	            } catch (_error) {
	              exception_ = _error;
	              throw new Error("Invalid resource locator string '" + rls + "'.");
	            }
	          }
	        }
	        return subpathAddress;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.address failed: " + exception_.message);
	      }
	    };

	    Store.prototype.namespace = function(request_) {
	      var addressResolverOptions, exception_, namespace, request, resolvedAddressContext, rlType;
	      try {
	        request = {
	          operation: (request_ != null) && request_ && (request_.operation != null) && request_.operation || 'access',
	          address: void 0,
	          data: (request_ != null) && request_ && (request_.data != null) && request_.data || {}
	        };
	        if (!((request_ != null) && request_)) {
	          request.address = this.address();
	        } else {
	          if (!((request_.rl != null) && request_.rl)) {
	            request.address = this.address();
	          } else {
	            rlType = Object.prototype.toString.call(request_.rl);
	            if (rlType === '[object String]') {
	              request.address = this.address(request_.rl);
	            } else {
	              if (request_.rl instanceof Address) {
	                if (!this.model.isEqual(request_.rl.model)) {
	                  throw new Error("Invalid resource locator is bound to model " + request_.rl.model.uuid + ":" + request_.rl.model.uuidVersion + " not " + this.model.uuid + ":" + this.model.uuidVersion + " as expected.");
	                }
	                request.address = request_.rl;
	              } else {
	                throw new Error("Invalid resource locator type '" + rlType + "' specified. Expecting either onm.Address or onm-format resource locator string.");
	              }
	            }
	          }
	        }
	        addressResolverOptions = {};
	        addressResolverOptions.strategy = (request.operation === 'access' && 'negotiate') || request.operation;
	        addressResolverOptions.address = request.address;
	        addressResolverOptions.propertyAssignmentObject = request.data;
	        addressResolverOptions.parentDataReference = this.implementation.dataReference;
	        addressResolverOptions.semanticBindingsReference = this.model.getSemanticBindings();
	        resolvedAddressContext = addressResolver.resolve(addressResolverOptions);
	        namespace = new Namespace(this, resolvedAddressContext);
	        return namespace;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.namespace failed: " + exception_.message);
	      }
	    };

	    Store.prototype.nsAccess = function(rl_, data_) {
	      var exception_;
	      try {
	        return this.namespace({
	          operation: 'access',
	          rl: rl_,
	          data: data_
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.nsAccess failed: " + exception_.message);
	      }
	    };

	    Store.prototype.nsOpen = function(rl_, data_) {
	      var exception_;
	      try {
	        return this.namespace({
	          operation: 'open',
	          rl: rl_,
	          data: data_
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.nsOpen failed: " + exception_.message);
	      }
	    };

	    Store.prototype.openNamespace = function(rl_, data_) {
	      console.log("onm v0.3: Store.openNamespace is deprecated. Use v0.3 Store.nsOpen, or Store.namespace API's.");
	      return this.nsOpen(rl_, data_);
	    };

	    Store.prototype.nsCreate = function(rl_, data_) {
	      var exception_;
	      try {
	        return this.namespace({
	          operation: 'create',
	          rl: rl_,
	          data: data_
	        });
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.nsCreate failed: " + exception_.message);
	      }
	    };

	    Store.prototype.createComponent = function(rl_, data_) {
	      console.log("onm v0.3: Store.createComponent is deprecated. Use v0.3 Store.nsCreate, or Store.namespace API's.");
	      return this.nsCreate(rl_, data_);
	    };

	    Store.prototype.removeComponent = function(address_) {
	      var componentDictionary, componentKey, componentNamespace, descriptor, exception_, extensionPointAddress, extensionPointNamespace;
	      try {
	        if (!((address_ != null) && address_)) {
	          throw new Error("Missing address input parameter!");
	        }
	        if (!this.validateAddressModel(address_)) {
	          throw new Error("The specified address cannot be used to reference this store because it's not bound to the same model as this store.");
	        }
	        if (!address_.isQualified()) {
	          throw new Error("You cannot use an unqualified address to remove a component.");
	        }
	        descriptor = address_.implementation.getDescriptor();
	        if (!descriptor.isComponent) {
	          throw new Error("The specified address does not specify the root of a component.");
	        }
	        if (descriptor.namespaceType === "root") {
	          throw new Error("The specified address refers to the root namespace of the store which cannot be removed.");
	        }
	        this.implementation.reifier.reifyStoreExtensions(address_, void 0, true);
	        this.implementation.reifier.unreifyStoreComponent(address_);
	        componentNamespace = this.nsOpen(address_);
	        extensionPointAddress = address_.createParentAddress();
	        extensionPointNamespace = this.nsOpen(extensionPointAddress);
	        componentDictionary = extensionPointNamespace.data();
	        componentKey = address_.implementation.getLastToken().key;
	        delete componentDictionary[componentKey];
	        extensionPointNamespace.update();
	        return componentNamespace;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.removeComponent failed: " + exception_.message);
	      }
	    };

	    Store.prototype.toJSON = function(replacer_, space_) {
	      var exception_;
	      try {
	        return this.namespace().toJSON(replacer_, space_);
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.toJSON failed: " + exception_.message);
	      }
	    };

	    Store.prototype.sdab = function() {
	      var exception_, namespaceRoot, sdab;
	      try {
	        namespaceRoot = this.nsAccess();
	        sdab = {
	          model: this.model.implementation.objectModelDeclaration,
	          store: {}
	        };
	        sdab.store[namespaceRoot.ckey()] = namespaceRoot.data();
	        return sdab;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("onm.Store.sdab failed: " + exception_.message);
	      }
	    };

	    Store.prototype.registerObserver = function(observerCallbackInterface_, observingEntityReference_) {
	      var exception, observerIdCode, rootAddress;
	      try {
	        if (!((observerCallbackInterface_ != null) && observerCallbackInterface_)) {
	          throw new Error("Missing callback interface namespace input parameter..");
	        }
	        observerCallbackInterface_.observingEntity = observingEntityReference_;
	        observerIdCode = uuid.v4();
	        this.implementation.observers[observerIdCode] = observerCallbackInterface_;
	        rootAddress = this.model.address("*");
	        this.implementation.reifier.dispatchCallback(void 0, "onObserverAttachBegin", observerIdCode);
	        this.implementation.reifier.reifyStoreComponent(rootAddress, observerIdCode);
	        this.implementation.reifier.reifyStoreExtensions(rootAddress, observerIdCode);
	        this.implementation.reifier.dispatchCallback(void 0, "onObserverAttachEnd", observerIdCode);
	        return observerIdCode;
	      } catch (_error) {
	        exception = _error;
	        throw new Error("registerObserver failure: " + exception_.message);
	      }
	    };

	    Store.prototype.unregisterObserver = function(observerIdCode_) {
	      var exception_, registeredObserver, rootAddress;
	      try {
	        if (!((observerIdCode_ != null) && observerIdCode_)) {
	          throw new Error("Missing observer ID code input parameter!");
	        }
	        registeredObserver = this.implementation.observers[observerIdCode_];
	        if (!((registeredObserver != null) && registeredObserver)) {
	          throw new Error("Unknown observer ID code provided. No registration to remove.");
	        }
	        this.implementation.reifier.dispatchCallback(void 0, "onObserverDetachBegin", observerIdCode_);
	        rootAddress = this.model.address("*");
	        this.implementation.reifier.reifyStoreExtensions(rootAddress, observerIdCode_, true);
	        this.implementation.reifier.unreifyStoreComponent(rootAddress, observerIdCode_);
	        this.implementation.reifier.dispatchCallback(void 0, "onObserverDetachEnd", observerIdCode_);
	        this.removeObserverState(observerIdCode_);
	        return delete this.implementation.observers[observerIdCode_];
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("unregisterObserver failure: " + exception_.message);
	      }
	    };

	    Store.prototype.openObserverState = function(observerId_) {
	      var exception_, observerState;
	      try {
	        if (!((observerId_ != null) && observerId_)) {
	          throw new Error("Missing observer ID parameter!");
	        }
	        observerState = (this.implementation.observersState[observerId_] != null) && this.implementation.observersState[observerId_] || (this.implementation.observersState[observerId_] = []);
	        return observerState;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("openObserverStateObject failure: " + exception_.message);
	      }
	    };

	    Store.prototype.removeObserverState = function(observerId_) {
	      if (!((observerId_ != null) && observerId_)) {
	        throw new Error("Missing observer ID parameter!");
	      }
	      if ((typeof observerState !== "undefined" && observerState !== null) && observerState) {
	        if ((this.implementation.observerState[observerId_] != null) && this.implementation.observerState[observerId_]) {
	          delete this.implementation.observerState[observerId_];
	        }
	      }
	      return this;
	    };

	    Store.prototype.openObserverComponentState = function(observerId_, address_) {
	      var componentAddress, componentNamespaceId, exception_, token;
	      try {
	        if (!((observerId_ != null) && observerId_)) {
	          throw new Error("Missing observer ID parameter.");
	        }
	        if (!((address_ != null) && address_)) {
	          throw new Error("Missing address input parameter.");
	        }
	        token = address_.implementation.getLastToken();
	        componentNamespaceId = token.componentDescriptor.id;
	        componentAddress = address_.createComponentAddress();
	        return this.openObserverNamespaceState(observerId_, componentAddress);
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("openObserverComponentState failure: " + exception_.message);
	      }
	    };

	    Store.prototype.openObserverNamespaceState = function(observerId_, address_) {
	      var exception_, namespacePathId, namespacePathState, namespaceState, namespaceURN, observerState, token;
	      try {
	        if (!((observerId_ != null) && observerId_)) {
	          throw new Error("Missing observer ID parameter.");
	        }
	        if (!((address_ != null) && address_)) {
	          throw new Error("Missing address input parameter.");
	        }
	        observerState = this.openObserverState(observerId_);
	        token = address_.implementation.getLastToken();
	        namespacePathId = token.namespaceDescriptor.id;
	        namespacePathState = (observerState[namespacePathId] != null) && observerState[namespacePathId] || (observerState[namespacePathId] = {});
	        namespaceURN = address_.getHashString();
	        namespaceState = (namespacePathState[namespaceURN] != null) && namespacePathState[namespaceURN] || (namespacePathState[namespaceURN] = {});
	        return namespaceState;
	      } catch (_error) {
	        exception_ = _error;
	        throw new Error("openObserverNamespaceState failure: " + exception_.message);
	      }
	    };

	    Store.prototype.removeObserverNamespaceState = function(observerId_, address_) {
	      var namespaceHash, observerState, pathRecord;
	      observerState = this.modelViewObserversState[observerId_];
	      if (!((observerState != null) && observerState)) {
	        return this;
	      }
	      pathRecord = observerState[namespaceSelector_.pathId];
	      if (!((pathRecord != null) && pathRecord)) {
	        return this;
	      }
	      namespaceHash = namespaceSelector_.getHashString();
	      delete pathRecord[namespaceHash];
	      if (helperFunctions.dictionaryLength(pathRecord) === 0) {
	        delete observerState[namespaceSelector_.pathId];
	      }
	      return this;
	    };

	    return Store;

	  })();

	}).call(this);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	
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
	Low-level library routines inspired by (and often copied) from http://coffeescriptcookbook.com
	------------------------------------------------------------------------------
	 */

	(function() {
	  var CIDS, RISP, uuid;

	  CIDS = __webpack_require__(2);

	  uuid = __webpack_require__(5);

	  RISP = {};


	  /*
	      Generate an Internet-Routable Unique Token (IRUT)
	  
	      IRUT's are 22-character, ASCII-encoded, UUID v4, URI and RIS token-friendly string identifiers.
	  
	      Use cases:
	      1. v4 UUID uniqueness semantics: addressed w/node-uuid package
	      2. ASCII: addressed by using base64 encoding of the v4 UUID
	      3. Short as possible: addressed by trimming superfluous '=' padding from base64
	      4. URI token safe: addressed by replacing '/' characters with '_'
	      5. RIS token safe: addressed by replacing '+' with '-'
	  
	      References:
	      http://stackoverflow.com/questions/11431886/url-safe-uuids-in-the-smallest-number-of-characters
	      http://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js
	      http://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
	   */

	  RISP.generateIRUT = module.exports = function() {
	    var pads, r1, r2, r3, r4, r5, response;
	    r1 = uuid.v4(null, new Uint8Array(16, 0));
	    r2 = (new Buffer(r1)).toString('base64');
	    pads = 0;
	    while (r2.charAt(r2.length - pads - 1) === '=') {
	      pads++;
	    }
	    r3 = r2.slice(0, r2.length - pads);
	    r4 = r3.replace(/\//g, "_");
	    r5 = r4.replace(/\+/g, "-");
	    return response = {
	      error: null,
	      result: CIDS.setCID({
	        ref: {
	          value: r5
	        },
	        cname: 'IRUT'
	      }).result
	    };
	  };

	}).call(this);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var CIDS, PathGenerators, RISP;

	  CIDS = __webpack_require__(2);

	  RISP = {};

	  PathGenerators = {
	    readable: __webpack_require__(11),
	    hash: __webpack_require__(10)
	  };


	  /*
	      request = {
	          address: onm.Address reference
	          format: string (one of "readable" or "hash")
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: onm-format path xRI string
	      }
	   */

	  RISP.generatePath = module.exports = function(request_) {
	    var cidsResponse, errors, generatorResponse, inBreakScope, pathFormat, response, selectedPathGenerator;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      if (!((request_.address != null) && request_.address)) {
	        errors.unshift("Invalid request object missing required property 'address'.");
	        break;
	      }
	      cidsResponse = CIDS.assertCNAME({
	        ref: request_.address,
	        'Address': 'Address'
	      });
	      if (cidsResponse.error) {
	        errors.unshift(cidsResponse.error);
	        break;
	      }
	      pathFormat = request_.format;
	      selectedPathGenerator = PathGenerators[pathFormat];
	      if (!((selectedPathGenerator != null) && selectedPathGenerator)) {
	        errors.unshift("Internal error. No registered path generator for format '" + pathFormat + "'.");
	        break;
	      }
	      generatorResponse = selectedPathGenerator(request_);
	      if (!generatorResponse.error) {
	        response.result = generatorResponse.result;
	      } else {
	        errors.unshift(generatorResponse.error);
	      }
	    }
	    if (errors.length) {
	      errors.unshift("Path generate failed:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var xRIP_HashPathGenerator, xRIP_LRIVectorGenerator;

	  xRIP_HashPathGenerator = __webpack_require__(10);


	  /*
	      request = {
	          address: onm.Address reference
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: onm-format URI string or null
	      }
	   */

	  xRIP_LRIVectorGenerator = module.exports = function(request_) {
	    var errors, inBreakScope, pathGenResponse, response;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      pathGenResponse = xRIP_HashPathGenerator({
	        address: request_.address
	      });
	      if (pathGenResponse.error) {
	        errors.unshift(pathGenResponse.error);
	        break;
	      }
	      response.result = "onm-lri:" + request_.address.model.uuidVersion;
	      if (pathGenResponse.result) {
	        response.result += ":" + pathGenResponse.result;
	      }
	    }
	    if (errors.length) {
	      errors.unshift("xRIP_LRIVectorGenerator failed:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var xRIP_ReadablePathGenerator, xRIP_URIVectorGenerator;

	  xRIP_ReadablePathGenerator = __webpack_require__(11);


	  /*
	      request = {
	          address: onm.Address reference
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: onm-format URI string or null
	      }
	   */

	  xRIP_URIVectorGenerator = module.exports = function(request_) {
	    var errors, inBreakScope, pathGenResponse, response;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      pathGenResponse = xRIP_ReadablePathGenerator({
	        address: request_.address,
	        uriFormat: true
	      });
	      if (pathGenResponse.error) {
	        errors.unshift(pathGenResponse.error);
	        break;
	      }
	      response.result = "onm-uri:" + request_.address.model.uuid;
	      if (pathGenResponse.result) {
	        response.result += ":" + pathGenResponse.result;
	      }
	    }
	    if (errors.length) {
	      errors.unshift("xRIP_URIVectorGenerator failed:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var CIDS, RISP, VectorGenerators;

	  CIDS = __webpack_require__(2);

	  RISP = {};

	  VectorGenerators = {
	    lri: __webpack_require__(23),
	    uri: __webpack_require__(24)
	  };


	  /*
	      request = {
	          address: onm.Address reference
	          format: string (one of "lri" or "uri")
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: onm-format path xRI string
	      }
	   */

	  RISP.generateVector = module.exports = function(request_) {
	    var cidsResponse, errors, generatorResponse, inBreakScope, pathFormat, response, selectedVectorGenerator;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      if (!((request_.address != null) && request_.address)) {
	        errors.unshift("Invalid request object missing required property 'address'.");
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
	      pathFormat = request_.format;
	      selectedVectorGenerator = VectorGenerators[pathFormat];
	      if (!((selectedVectorGenerator != null) && selectedVectorGenerator)) {
	        errors.unshift("Internal error. No registered vector generator for format '" + pathFormat + "'.");
	        break;
	      }
	      generatorResponse = selectedVectorGenerator(request_);
	      if (!generatorResponse.error) {
	        response.result = generatorResponse.result;
	      } else {
	        errors.unshift(generatorResponse.error);
	      }
	    }
	    if (errors.length) {
	      errors.unshift("Vector generate failed:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Generators, GeneratorsByFormat, RISP;

	  Generators = {
	    path: __webpack_require__(22),
	    vector: __webpack_require__(25),
	    irut: __webpack_require__(21)
	  };

	  GeneratorsByFormat = {
	    'readable': Generators.path,
	    'hash': Generators.path,
	    'lri': Generators.vector,
	    'uri': Generators.vector,
	    'irut': Generators.irut
	  };


	  /*
	      request = {
	          address: reference to onm.Address to convert or undefined for 'irut' request
	          format: string (one of 'readable', 'hash', 'lri', or 'uri', 'irut')
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: onm-format path xRI string
	      }
	   */

	  RISP = {};

	  RISP.generate = module.exports = function(request_) {
	    var errors, format, formatType, generatorResponse, inBreakScope, response, selectedGenerator, validFormats;
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
	      if (!((request_.format != null) && request_.format)) {
	        errors.unshift("Invalid request object missing required property 'format'.");
	        break;
	      }
	      formatType = Object.prototype.toString.call(request_.format);
	      if (formatType !== '[object String]') {
	        errors.unshift("Invalid request object 'format' value type. Expected reference to '[object String]'.");
	        break;
	      }
	      format = request_.format;
	      selectedGenerator = GeneratorsByFormat[format];
	      if (!((selectedGenerator != null) && selectedGenerator)) {
	        validFormats = [];
	        for (format in GeneratorsByFormat) {
	          validFormats.push(format);
	        }
	        errors.unshift("Sorry. No registered generator for format '" + format + "'. Valid formats: [" + validFormats + "].");
	        break;
	      }
	      generatorResponse = selectedGenerator(request_);
	      if (!generatorResponse.error) {
	        response.result = generatorResponse.result;
	      } else {
	        errors.unshift(generatorResponse.error);
	      }
	    }
	    if (errors.length) {
	      errors.unshift("RISP.generate failed:");
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var xRIP_PathParser, xRIP_ReadablePathParser;

	  xRIP_ReadablePathParser = __webpack_require__(12);


	  /*
	      request = {
	          model: required reference to an onm.Model
	          addressBase: optional reference to an onm.Address
	          xriTokens: array of top-level xRI string tokens (complete)
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: reference to an onm.Address or null
	      }
	   */

	  xRIP_PathParser = module.exports = function(request_) {
	    var addressBase, ascending, errors, exception_, generations, inBreakScope, parseReadablePathResponse, pathToken, pathTokens, response, revisedPath, xriTokens, _i, _len;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    addressBase = request_.addressBase;
	    xriTokens = request_.xriTokens;
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      pathTokens = xriTokens[0].split('.');
	      generations = 0;
	      ascending = false;
	      for (_i = 0, _len = pathTokens.length; _i < _len; _i++) {
	        pathToken = pathTokens[_i];
	        if (pathToken === '//') {
	          if (ascending) {
	            errors.unshift("Path contains illegal namespace descent after ascent.");
	            break;
	          } else {
	            generations++;
	          }
	        } else {
	          ascending = true;
	        }
	      }
	      if (errors.length) {
	        break;
	      }
	      if (generations && ((!((addressBase != null) && addressBase)) || ((addressBase.implementation.getDescriptor().parentPathIdVector.length - generations) < 0))) {
	        errors.unshift("Path contains illegal descent into the model's anonymous namespace.");
	        break;
	      }
	      if (generations && (addressBase != null) && addressBase) {
	        try {
	          addressBase = addressBase.createParentAddress(generations);
	          if (!((addressBase != null) && baseAddress)) {
	            errors.unshift("Internal error evaluating requested " + generations + "-level namespace descent.");
	            break;
	          }
	        } catch (_error) {
	          exception_ = _error;
	          errors.unshift("Internal error evaluating requested " + generations + "-level namespace descent.");
	          break;
	        }
	        if (!(xriTokens2.length - generations)) {
	          response.result = addressBase;
	          break;
	        }
	        pathTokens.shift(generations);
	        xriTokens.shift();
	        if (pathTokens.length) {
	          revisedPath = ((pathTokens.length > 1) && (pathTokens.join('.'))) || pathTokens[0];
	          xriTokens.unshift(revisedPath);
	        }
	      }
	      parseReadablePathResponse = xRIP_ReadablePathParser({
	        model: request_.model,
	        addressBase: addressBase,
	        xriTokens: xriTokens
	      });
	      if (!parseReadablePathResponse.error) {
	        response.result = parseReadablePathResponse.result;
	      } else {
	        errors.unshift(parseReadablePathResponse.error);
	      }
	    }
	    if (errors.length) {
	      response.error = errors.join(" ");
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	
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

	  Address = __webpack_require__(1);

	  AddressToken = __webpack_require__(3);


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


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var xRIP_ReadablePathParser, xRIP_URIVectorParser;

	  xRIP_ReadablePathParser = __webpack_require__(12);


	  /*
	      request = {
	          model: reference to an onm.Model
	          xriTokens: array of top-level xRI string tokens (minus vector prefix token)
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: reference to an onm.Address or null
	      }
	   */

	  xRIP_URIVectorParser = module.exports = function(request_) {
	    var errors, inBreakScope, model, parseReadablePathResponse, response, uriEncodedModelId, xriTokens;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    xriTokens = request_.xriTokens;
	    model = request_.model;
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      uriEncodedModelId = xriTokens.shift();
	      if (uriEncodedModelId !== model.uuid) {
	        errors.unshift("URI in address space '" + uriEncodedModelId + "' cannot be decoded using model '" + model.uuid + ":" + model.uuidVersion + "'.");
	        break;
	      }
	      if (!xriTokens.length) {
	        response.result = request_.model.address("*");
	        break;
	      }
	      parseReadablePathResponse = xRIP_ReadablePathParser({
	        model: request_.model,
	        xriTokens: xriTokens,
	        uriFormat: true
	      });
	      if (!parseReadablePathResponse.error) {
	        response.result = parseReadablePathResponse.result;
	      } else {
	        errors.unshift(parseReadablePathResponse.error);
	      }
	    }
	    if (errors.length) {
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var xRIP_VectorParser, xRIP_parseVariant;

	  xRIP_parseVariant = {
	    'onm-lri': __webpack_require__(28),
	    'onm-uri': __webpack_require__(29)
	  };


	  /*
	      request = {
	          model: reference to the onm.Model to use as the decoding reference
	          xriTokens: array of top-level xRI string tokens
	      }
	      response = {
	          error: null or string explaining why result === null
	          result: reference to an onm.Address or null
	      }
	  
	  
	      Vectors are always evaluated relative to the store's anonymous namespace
	      and are much more restrictive than paths insofar as they explicitly encode
	      information that is used to verify the decoding strategy (i.e. model)
	      of the vector's path segment (a hash or readable path variant for LRI/URI respectively).
	   */

	  xRIP_VectorParser = module.exports = function(request_) {
	    var errors, inBreakScope, response, selectedVectorParser, vectorParseResponse, vectorPrefixToken, xriTokens;
	    errors = [];
	    response = {
	      error: null,
	      result: null
	    };
	    xriTokens = request_.xriTokens;
	    inBreakScope = false;
	    while (!inBreakScope) {
	      inBreakScope = true;
	      vectorPrefixToken = xriTokens.shift();
	      selectedVectorParser = xRIP_parseVariant[vectorPrefixToken];
	      if (!selectedVectorParser) {
	        errors.unshift("Unrecognized xRI type '" + vectorPrefixToken + "'. Expected either 'onm-lri', or 'onm-uri'.");
	        break;
	      }
	      vectorParseResponse = selectedVectorParser({
	        model: request_.model,
	        xriTokens: xriTokens
	      });
	      if (!vectorParseResponse.error) {
	        response.result = vectorParseResponse.result;
	      } else {
	        errors.unshift(vectorParseResponse.error);
	      }
	    }
	    if (errors.length) {
	      response.error = errors.join(' ');
	    }
	    return response;
	  };

	}).call(this);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var Address, CIDS, Model, xRIP_Parser, xRIP_parsePath, xRIP_parseVector;

	  CIDS = __webpack_require__(2);

	  Model = __webpack_require__(7);

	  Address = __webpack_require__(1);

	  xRIP_parsePath = __webpack_require__(27);

	  xRIP_parseVector = __webpack_require__(30);


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
	    var addressBase, cidsResponse, errors, inBreakScope, model, parsePathResponse, parseVectorResponse, response, xri, xriCategory, xriTokens, xriType;
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
	      cidsResponse = CIDS.assertCNAME({
	        ref: request_.model,
	        cname: 'Model'
	      });
	      if (cidsResponse.error) {
	        errors.unshift(cidsResponse.error);
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
	            cidsResponse = CIDS.assertCNAME({
	              ref: addressBase,
	              cname: 'Address'
	            });
	            if (cidsResponse.error) {
	              errors.unshift(cidsResponse.error);
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


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var componentResolverContext;

	  module.exports = componentResolverContext = {};

	  componentResolverContext.initializeContextObject = function(options_) {
	    var context;
	    return context = {
	      input: options_,
	      output: {
	        namedObjectResolutionVector: null,
	        pendingSubcomponentStack: null,
	        dataChangeEventJournal: null
	      }
	    };
	  };

	  componentResolverContext.checkValidContextInput = function(options_) {
	    var results, setInvalid;
	    results = {
	      valid: true,
	      reason: 'okay'
	    };
	    setInvalid = function(reason_) {
	      results.valid = false;
	      results.reason = reason_;
	      return results;
	    };
	    while (true) {
	      if (!((options_ != null) && options_)) {
	        setInvalid("Missing options in-parameter.");
	        break;
	      }
	      if (!((options_.parentDataReference != null) && options_.parentDataReference)) {
	        setInvalid("Missing parent data object reference.");
	        break;
	      }
	      if (!((options_.addressToken != null) && options_.addressToken)) {
	        setInvalid("Missing address token object reference.");
	        break;
	      }
	      if (!((options_.strategy != null) && options_.strategy && (options_.strategy.length != null) && options_.strategy.length)) {
	        setInvalid("Missing resolution strategy specification.");
	        break;
	      }
	      if (!((options_.semanticBindingsReference != null) && options_.semanticBindingsReference)) {
	        setInvalid("Missing semantic bindings reference.");
	        break;
	      }
	      break;
	    }
	    if (!results.valid) {
	      console.warn("Invalid named object input context object: '" + results.reason + "'.");
	    }
	    return results.valid;
	  };

	  componentResolverContext.checkValidContextOutput = function(results_) {
	    var results, setInvalid;
	    results = {
	      valid: true,
	      reason: 'okay'
	    };
	    setInvalid = function(reason_) {
	      results.valid = false;
	      results.reason = reason_;
	      return results;
	    };
	    while (true) {
	      if (!((results_ != null) && results)) {
	        setInvalid("Missing results in-parameter.");
	        break;
	      }
	      if (!((results_.namedObjectResolutionVector != null) && results_.namedObjectResolutionVector && results_.namedObjectResolutionVector.length)) {
	        setInvalid("Missing or empty named object resolution vector.");
	        break;
	      }
	      break;
	    }
	    if (!results.valid) {
	      console.warn("Invalid named object input context object: '" + results.reason + "'.");
	    }
	    return results.valid;
	  };

	}).call(this);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var AddressToken, componentContextHelpers, componentResolver, createNamedObjectResolutionContext, namedObjectResolver;

	  AddressToken = __webpack_require__(3);

	  namedObjectResolver = __webpack_require__(37);

	  componentContextHelpers = __webpack_require__(32);

	  module.exports = componentResolver = {};

	  componentResolver.resolve = function(options_) {
	    var addressToken, changeEvent, componentResolveOptions, context, dataChangeEventJournal, exception_, message, namedObjectResolution, namedObjectResolutionContext, namedObjectResolutionStack, namedObjectResolveOptions, nextDescriptor, nextPropertyAssignmentObject, pendingAddressToken, pendingSubcomponentStack, resolvedOnVector, _i, _len, _ref;
	    try {
	      if (!componentContextHelpers.checkValidContextInput(options_)) {
	        throw new Error("Invalid options in-parameter.");
	      }
	      context = componentContextHelpers.initializeContextObject(options_);
	      namedObjectResolutionContext = createNamedObjectResolutionContext(context.input.addressToken);
	      namedObjectResolutionStack = [];
	      pendingSubcomponentStack = [];
	      dataChangeEventJournal = [];
	      namedObjectResolveOptions = {
	        strategy: context.input.strategy,
	        parentDataReference: context.input.parentDataReference,
	        targetNamespaceDescriptor: context.input.addressToken.componentDescriptor,
	        targetNamespaceKey: context.input.addressToken.key,
	        semanticBindingsReference: context.input.semanticBindingsReference,
	        propertyAssignmentObject: (context.input.addressToken.idComponent === context.input.addressToken.idNamespace) && context.input.propertyAssignmentObject || {}
	      };
	      namedObjectResolutionStack.push({
	        input: namedObjectResolveOptions,
	        output: namedObjectResolver.resolve(namedObjectResolveOptions)
	      });
	      while (namedObjectResolutionStack.length) {
	        namedObjectResolution = namedObjectResolutionStack.pop();
	        resolvedOnVector = namedObjectResolutionContext.resultVector[namedObjectResolution.output.resolvedId];
	        if (resolvedOnVector !== void 0) {
	          namedObjectResolutionContext.resultVector[namedObjectResolution.output.resolvedId] = namedObjectResolutionContext.lastResolutionResult = namedObjectResolution;
	          namedObjectResolutionContext.workQueue.shift();
	        }
	        _ref = namedObjectResolution.output.dataChangeEventJournal;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	          changeEvent = _ref[_i];
	          dataChangeEventJournal.push(changeEvent);
	        }
	        if (namedObjectResolution.output.pendingResolutionStack.length) {
	          switch (namedObjectResolution.input.targetNamespaceDescriptor.namespaceType) {
	            case 'extensionPoint':
	              while (namedObjectResolution.output.pendingResolutionStack.length) {
	                namedObjectResolveOptions = namedObjectResolution.output.pendingResolutionStack.pop();
	                if ((namedObjectResolveOptions.strategy === 'open') && (context.input.strategy === 'negotiate')) {
	                  namedObjectResolveOptions.strategy = 'negotiate';
	                }
	                pendingAddressToken = new AddressToken(context.input.addressToken.model, namedObjectResolution.output.resolvedId, namedObjectResolveOptions.targetNamespaceKey, namedObjectResolveOptions.targetNamespaceDescriptor.id);
	                componentResolveOptions = {
	                  strategy: namedObjectResolveOptions.strategy,
	                  parentDataReference: namedObjectResolveOptions.parentDataReference,
	                  addressToken: pendingAddressToken,
	                  semanticBindingsReference: namedObjectResolveOptions.semanticBindingsReference,
	                  propertyAssignmentObject: namedObjectResolveOptions.propertyAssignmentObject
	                };
	                pendingSubcomponentStack.push(componentResolveOptions);
	              }
	              break;
	            default:
	              while (namedObjectResolution.output.pendingResolutionStack.length) {
	                namedObjectResolveOptions = namedObjectResolution.output.pendingResolutionStack.pop();
	                if (namedObjectResolveOptions.targetNamespaceDescriptor.id === context.input.addressToken.idNamespace) {
	                  if (Object.keys(namedObjectResolveOptions.propertyAssignmentObject).length > 0) {
	                    throw new Error("Internal consistency check error: We do not expect property assignment data to be propogating below the target namespace during a component resolution.");
	                  }
	                  namedObjectResolveOptions.propertyAssignmentObject = (context.input.propertyAssignmentObject != null) && context.input.propertyAssignmentObject || {};
	                }
	                namedObjectResolutionStack.push({
	                  input: namedObjectResolveOptions,
	                  output: namedObjectResolver.resolve(namedObjectResolveOptions)
	                });
	              }
	              break;
	          }
	        }
	        if ((!namedObjectResolutionStack.length) && namedObjectResolutionContext.workQueue.length) {
	          nextDescriptor = namedObjectResolutionContext.workQueue[0];
	          nextPropertyAssignmentObject = (nextDescriptor.id === options_.addressToken.idNamespace) && options_.propertyAssignmentObject || {};
	          namedObjectResolveOptions = {
	            strategy: namedObjectResolutionContext.lastResolutionResult.output.strategyFollowed,
	            parentDataReference: namedObjectResolutionContext.lastResolutionResult.output.namespaceDataReference,
	            targetNamespaceDescriptor: nextDescriptor,
	            targetNamespaceKey: null,
	            semanticBindingsReference: context.input.semanticBindingsReference,
	            propertyAssignmentObject: nextPropertyAssignmentObject
	          };
	          namedObjectResolutionStack.push({
	            input: namedObjectResolveOptions,
	            output: namedObjectResolver.resolve(namedObjectResolveOptions)
	          });
	        }
	      }
	      context.output.namedObjectResolutionVector = namedObjectResolutionContext.resultVector;
	      context.output.pendingSubcomponentStack = pendingSubcomponentStack;
	      context.output.dataChangeEventJournal = dataChangeEventJournal;
	      if (!componentContextHelpers.checkValidContextOutput(context.output)) {
	        throw new Error("Internal test case failure: context.output object validation failed.");
	      }
	      return context.output;
	    } catch (_error) {
	      exception_ = _error;
	      addressToken = options_.addressToken;
	      message = "componentResolver.resolve failed to resolve token " + "{" + ((addressToken.extensionPointDescriptor != null) && addressToken.extensionPointDescriptor && addressToken.extensionPointDescriptor.jsonTag || "anonymous") + "," + ((addressToken.key != null) && addressToken.key || "*") + "," + addressToken.componentDescriptor.jsonTag + "," + addressToken.namespaceDescriptor.jsonTag + "} :: " + exception_.message;
	      throw new Error(message);
	    }
	  };

	  createNamedObjectResolutionContext = function(addressToken_) {
	    var id, idVector, namedObjectResolutionContext, targetDepth, _i, _len;
	    targetDepth = addressToken_.namespaceDescriptor.parentPathIdVector.length - addressToken_.componentDescriptor.parentPathIdVector.length;
	    idVector = addressToken_.namespaceDescriptor.parentPathIdVector.slice(addressToken_.componentDescriptor.parentPathIdVector.length, addressToken_.namespaceDescriptor.parentPathIdVector.length);
	    idVector.push(addressToken_.namespaceDescriptor.id);
	    namedObjectResolutionContext = {
	      resultVector: [],
	      workQueue: [],
	      lastResolutionResult: null
	    };
	    for (_i = 0, _len = idVector.length; _i < _len; _i++) {
	      id = idVector[_i];
	      namedObjectResolutionContext.resultVector[id] = null;
	      namedObjectResolutionContext.workQueue.push(addressToken_.model.implementation.getNamespaceDescriptorFromPathId(id));
	    }
	    return namedObjectResolutionContext;
	  };

	  componentResolver.getResolvedNamedObjectReference = function(resolvedComponentContext_) {
	    var exception_, resolvedNamedObjectContext, resolvedNamedObjectCount;
	    try {
	      if (!((resolvedComponentContext_ != null) || resolvedComponentContext_)) {
	        throw new Error("Missing resolved component context object in-parameter.");
	      }
	      resolvedNamedObjectCount = resolvedComponentContext_.output.namedObjectResolutionVector.length;
	      if (!resolvedNamedObjectCount) {
	        throw new Error("Cannot extract named object reference from resolved component context object because it contains no resolved named objects.");
	      }
	      resolvedNamedObjectContext = resolvedComponentContext_.output.namedObjectResolutionVector[resolvedNamedObjectCount - 1];
	      return namedObjectResolver.getResolvedNamedObjectReference(resolvedNamedObjectContext);
	    } catch (_error) {
	      exception_ = _error;
	      throw new Error("componentResolver.getResolvedNamedObjectReference failed: " + exception_.message);
	    }
	  };

	  componentResolver.getResolvedToken = function(resolvedComponentContext_) {
	    var exception_, resolvedToken;
	    try {
	      resolvedToken = resolvedComponentContext_.input.addressToken.clone();
	      resolvedToken.key = resolvedComponentContext_.output.namedObjectResolutionVector[resolvedToken.idComponent].output.namespaceEffectiveKey;
	      return resolvedToken;
	    } catch (_error) {
	      exception_ = _error;
	      throw new Error("componentResolver.getResolvedToken failed: " + exception_.message);
	    }
	  };

	}).call(this);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var propertyCommonLib;

	  propertyCommonLib = __webpack_require__(15);

	  module.exports = {

	    /* create new namespace policy implementation
	    - create new namespace
	    - throw if namespace already exists
	    - initialize all declared namespace properties to value (first):
	      1. caller-provided value
	      2. declared default value
	    - visit declared subnamespaces and queue deferred resolves based on data model and caller-supplied data
	    - overlay namespace data with remaining, caller-provided properties
	     */
	    policyName: 'initialize namespace properties',
	    processNamespaceProperty: function(context_, name_, declaration_) {
	      var output, value, valueFromCallerData;
	      valueFromCallerData = false;
	      value = context_.input.propertyAssignmentObject[name_];
	      if (propertyCommonLib.checkValidPropertyValue(value)) {
	        delete context_.input.propertyAssignmentObject[name_];
	        valueFromCallerData = true;
	      } else {
	        value = declaration_.defaultValue;
	        if (!propertyCommonLib.checkValidPropertyValue(value)) {
	          value = (declaration_.fnCreate != null) && declaration_.fnCreate && declaration_.fnCreate() || void 0;
	          if (!propertyCommonLib.checkValidPropertyValue(value)) {
	            throw new Error("Internal data model consistency check error: Cannot deduce value to assign to property name '" + name_ + "'.");
	          }
	        }
	      }
	      output = context_.output;
	      output.namespaceDataReference[name_] = value;
	      output.dataChangeEventJournal.push({
	        layer: 'namedObject',
	        event: 'propertyInitialized',
	        eventData: {
	          name: name_,
	          model: true,
	          value: JSON.stringify(value),
	          source: valueFromCallerData && 'data' || 'model'
	        }
	      });
	      return true;
	    },
	    processSubnamespace: function(context_, descriptor_) {
	      var deleteKeyNames, keyName, propertyAssignmentObject, subcomponentPropertyAssignmentObject;
	      propertyAssignmentObject = context_.input.propertyAssignmentObject;
	      switch (descriptor_.namespaceType) {
	        case 'component':
	          deleteKeyNames = [];
	          for (keyName in propertyAssignmentObject) {
	            subcomponentPropertyAssignmentObject = propertyAssignmentObject[keyName];
	            if (!propertyCommonLib.checkValidNamedObject(subcomponentPropertyAssignmentObject)) {
	              throw new Error("Caller data framing error: Expected '" + keyName + "' to be a named object but instead found type '" + (Object.prototype.toString.call(subcomponentPropertyAssignmentObject)) + "'.");
	            }
	            deleteKeyNames.push(keyName);
	            context_.output.pendingResolutionStack.push({
	              parentDataReference: context_.output.namespaceDataReference,
	              targetNamespaceDescriptor: descriptor_,
	              targetNamespaceKey: keyName,
	              semanticBindingsReference: context_.input.semanticBindingsReference,
	              propertyAssignmentObject: (subcomponentPropertyAssignmentObject != null) && subcomponentPropertyAssignmentObject || {},
	              strategy: 'create'
	            });
	          }
	          while (deleteKeyNames.length) {
	            delete context_.input.propertyAssignmentObject[deleteKeyNames.pop()];
	          }
	          break;
	        default:
	          subcomponentPropertyAssignmentObject = propertyAssignmentObject[descriptor_.jsonTag];
	          if ((subcomponentPropertyAssignmentObject != null) && subcomponentPropertyAssignmentObject) {
	            if (!propertyCommonLib.checkValidNamedObject(subcomponentPropertyAssignmentObject)) {
	              throw new Error("Caller data framing error: Expected '" + keyName + "' to be a named object but instead found type '" + (Object.prototype.toString.call(subcomponentPropertyAssignmentObject)) + "'.");
	            }
	            delete context_.input.propertyAssignmentObject[descriptor_.jsonTag];
	          } else {
	            subcomponentPropertyAssignmentObject = {};
	          }
	          context_.output.pendingResolutionStack.push({
	            parentDataReference: context_.output.namespaceDataReference,
	            targetNamespaceDescriptor: descriptor_,
	            targetNamespaceKey: '',
	            semanticBindingsReference: context_.input.semanticBindingsReference,
	            propertyAssignmentObject: subcomponentPropertyAssignmentObject,
	            strategy: 'create'
	          });
	          break;
	      }
	      return true;
	    },
	    processPropertyOptions: function(context_) {
	      var deleteKeyNames, input, output, propertyName, subObject, _ref;
	      deleteKeyNames = [];
	      input = context_.input;
	      output = context_.output;
	      _ref = input.propertyAssignmentObject;
	      for (propertyName in _ref) {
	        subObject = _ref[propertyName];
	        if (!propertyCommonLib.checkValidPropertyValue(subObject)) {
	          throw new Error("Invalid value for assignment to property name '" + propertyName + "'.");
	        }
	        output.namespaceDataReference[propertyName] = subObject;
	        deleteKeyNames.push(propertyName);
	        output.dataChangeEventJournal.push({
	          layer: 'namedObject',
	          event: 'propertyInitialized',
	          eventData: {
	            name: propertyName,
	            model: false,
	            value: JSON.stringify(subObject),
	            source: 'data'
	          }
	        });
	      }
	      while (deleteKeyNames.length) {
	        delete input.propertyAssignmentObject[deleteKeyNames.pop()];
	      }
	      return true;
	    },
	    finalizeContext: function(context_) {
	      return true;
	    }
	  };

	}).call(this);


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var propertyCommonLib;

	  propertyCommonLib = __webpack_require__(15);

	  module.exports = {

	    /* open existing namespace policy implementation
	    - open existing namespace
	    - throw if namespace does not exist
	    - write declared property values specified in caller-provided data
	    - visit declared child namespaces and queue deferred resolves based on caller-provided data only
	    - overlay namespace data with remaining, caller-provided properties
	     */
	    policyName: 'update exisiting namespace properties',
	    processNamespaceProperty: function(context_, name_, declaration_) {
	      var input, output, value;
	      input = context_.input;
	      output = context_.output;
	      if (!((input.propertyAssignmentObject != null) && input.propertyAssignmentObject)) {
	        return true;
	      }
	      value = input.propertyAssignmentObject[name_];
	      if (!propertyCommonLib.checkValidPropertyValue(value)) {
	        return true;
	      }
	      delete context_.input.propertyAssignmentObject[name_];
	      output = context_.output;
	      output.namespaceDataReference[name_] = value;
	      output.dataChangeEventJournal.push({
	        layer: 'namedObject',
	        event: 'propertyUpdated',
	        eventData: {
	          name: name_,
	          model: true,
	          value: JSON.stringify(value),
	          source: 'data'
	        }
	      });
	      return true;
	    },
	    processSubnamespace: function(context_, descriptor_) {
	      var deleteKeyNames, keyName, propertyAssignmentObject, subcomponentPropertyAssignmentObject;
	      propertyAssignmentObject = context_.input.propertyAssignmentObject;
	      switch (descriptor_.namespaceType) {
	        case 'component':
	          deleteKeyNames = [];
	          for (keyName in propertyAssignmentObject) {
	            subcomponentPropertyAssignmentObject = propertyAssignmentObject[keyName];
	            if (!propertyCommonLib.checkValidNamedObject(subcomponentPropertyAssignmentObject)) {
	              throw new Error("Caller data framing error: Expected '" + keyName + "' to be a named object but instead found type '" + (Object.prototype.toString.call(subcomponentPropertyAssignmentObject)) + "'.");
	            }
	            deleteKeyNames.push(keyName);
	            context_.output.pendingResolutionStack.push({
	              parentDataReference: context_.output.namespaceDataReference,
	              targetNamespaceDescriptor: descriptor_,
	              targetNamespaceKey: keyName,
	              semanticBindingsReference: context_.input.semanticBindingsReference,
	              propertyAssignmentObject: (subcomponentPropertyAssignmentObject != null) && subcomponentPropertyAssignmentObject || {},
	              strategy: 'negotiate'
	            });
	          }
	          while (deleteKeyNames.length) {
	            delete context_.input.propertyAssignmentObject[deleteKeyNames.pop()];
	          }
	          break;
	        default:
	          subcomponentPropertyAssignmentObject = propertyAssignmentObject[descriptor_.jsonTag];
	          if ((subcomponentPropertyAssignmentObject != null) && subcomponentPropertyAssignmentObject) {
	            if (!propertyCommonLib.checkValidNamedObject(subcomponentPropertyAssignmentObject)) {
	              throw new Error("Caller data framing error: Expected '" + keyName + "' to be a named object but instead found type '" + (Object.prototype.toString.call(subcomponentPropertyAssignmentObject)) + "'.");
	            }
	            context_.output.pendingResolutionStack.push({
	              parentDataReference: context_.output.namespaceDataReference,
	              targetNamespaceDescriptor: descriptor_,
	              targetNamespaceKey: keyName,
	              semanticBindingsReference: context_.input.semanticBindingsReference,
	              propertyAssignmentObject: subcomponentPropertyAssignmentObject,
	              strategy: context_.output.strategyFollowed
	            });
	            delete context_.input.propertyAssignmentObject[descriptor_.jsonTag];
	          }
	          break;
	      }
	      return true;
	    },
	    processPropertyOptions: function(context_) {
	      var deleteKeyNames, input, output, propertyName, subObject, _ref;
	      deleteKeyNames = [];
	      input = context_.input;
	      output = context_.output;
	      _ref = input.propertyAssignmentObject;
	      for (propertyName in _ref) {
	        subObject = _ref[propertyName];
	        if (!propertyCommonLib.checkValidPropertyValue(subObject)) {
	          throw new Error("Invalid value for assignment to property name '" + propertyName + "'.");
	        }
	        output.namespaceDataReference[propertyName] = subObject;
	        deleteKeyNames.push(propertyName);
	        output.dataChangeEventJournal.push({
	          layer: 'namedObject',
	          event: 'propertyInitialized',
	          eventData: {
	            name: propertyName,
	            model: false,
	            value: JSON.stringify(subObject),
	            source: 'data'
	          }
	        });
	      }
	      while (deleteKeyNames.length) {
	        delete input.propertyAssignmentObject[deleteKeyNames.pop()];
	      }
	      return true;
	    },
	    finalizeContext: function(context_) {
	      return true;
	    }
	  };

	}).call(this);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var namedObjectPropertyResolver, namespaceResolverContext;

	  namespaceResolverContext = __webpack_require__(14);

	  module.exports = namedObjectPropertyResolver = {};

	  namedObjectPropertyResolver.visitNamespaceProperties = function(resolutionPolicyInterface_, context_) {
	    var namespaceDescriptor, propertiesDeclaration, propertyDeclaration, propertyName, result, _ref, _ref1;
	    if (!((resolutionPolicyInterface_.processNamespaceProperty != null) && resolutionPolicyInterface_.processNamespaceProperty)) {
	      return true;
	    }
	    namespaceDescriptor = context_.input.targetNamespaceDescriptor;
	    if (namespaceDescriptor.namespaceType === 'extensionPoint') {
	      return true;
	    }
	    result = true;
	    propertiesDeclaration = namespaceDescriptor.namespaceModelPropertiesDeclaration;
	    if ((propertiesDeclaration.userImmutable != null) && propertiesDeclaration.userImmutable) {
	      _ref = propertiesDeclaration.userImmutable;
	      for (propertyName in _ref) {
	        propertyDeclaration = _ref[propertyName];
	        if (!result) {
	          break;
	        }
	        result = resolutionPolicyInterface_.processNamespaceProperty(context_, propertyName, propertyDeclaration);
	      }
	    }
	    if ((propertiesDeclaration.userMutable != null) && propertiesDeclaration.userMutable) {
	      _ref1 = propertiesDeclaration.userMutable;
	      for (propertyName in _ref1) {
	        propertyDeclaration = _ref1[propertyName];
	        if (!result) {
	          break;
	        }
	        result = resolutionPolicyInterface_.processNamespaceProperty(context_, propertyName, propertyDeclaration);
	      }
	    }
	    return result;
	  };

	  namedObjectPropertyResolver.visitNamespaceChildren = function(resolutionPolicyInterface_, context_) {
	    var childNamespaceDescriptor, namespaceDescriptor, result, _i, _len, _ref;
	    if (!((resolutionPolicyInterface_.processSubnamespace != null) && resolutionPolicyInterface_.processSubnamespace)) {
	      return true;
	    }
	    result = true;
	    namespaceDescriptor = context_.input.targetNamespaceDescriptor;
	    _ref = namespaceDescriptor.children;
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      childNamespaceDescriptor = _ref[_i];
	      if (!result) {
	        break;
	      }
	      result = resolutionPolicyInterface_.processSubnamespace(context_, childNamespaceDescriptor);
	    }
	    return result;
	  };

	  namedObjectPropertyResolver.processPropertyOptions = function(resolutionPolicyInterface_, context_) {
	    return (resolutionPolicyInterface_.processPropertyOptions != null) && resolutionPolicyInterface_.processPropertyOptions && resolutionPolicyInterface_.processPropertyOptions(context_) || true;
	  };

	  namedObjectPropertyResolver.finalizeContext = function(resolutionPolicyInterface_, context_) {
	    return (resolutionPolicyInterface_.finalizeContext != null) && resolutionPolicyInterface_.finalizeContext && resolutionPolicyInterface_.finalizeContext(context_) || true;
	  };

	}).call(this);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	
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
	  var namedObjectContextHelpers, namedObjectPropertyVisitor, namedObjectPropertyVisitorInterfaces, namedObjectResolver, resolveNamedObjectReference;

	  namedObjectContextHelpers = __webpack_require__(14);

	  namedObjectPropertyVisitor = __webpack_require__(36);

	  namedObjectPropertyVisitorInterfaces = {
	    open: __webpack_require__(35),
	    create: __webpack_require__(34)
	  };

	  module.exports = namedObjectResolver = {};

	  namedObjectResolver.resolve = function(options_) {
	    var context, continueEval, exception_, message, propertyResolutionPolicyInterface;
	    try {
	      if (!namedObjectContextHelpers.checkValidContextInput(options_)) {
	        throw new Error("Internal test case failure: invalid options object in-parameter.");
	      }
	      context = namedObjectContextHelpers.initializeContextObject(options_);
	      continueEval = resolveNamedObjectReference(context);
	      propertyResolutionPolicyInterface = namedObjectPropertyVisitorInterfaces[context.output.strategyFollowed];
	      continueEval = continueEval && namedObjectPropertyVisitor.visitNamespaceProperties(propertyResolutionPolicyInterface, context);
	      continueEval = continueEval && namedObjectPropertyVisitor.visitNamespaceChildren(propertyResolutionPolicyInterface, context);
	      continueEval = continueEval && namedObjectPropertyVisitor.processPropertyOptions(propertyResolutionPolicyInterface, context);
	      continueEval = continueEval && namedObjectPropertyVisitor.finalizeContext(propertyResolutionPolicyInterface, context);
	      if (!namedObjectContextHelpers.checkValidContextOutput(context.output)) {
	        throw new Error("Internal test case failure: context.output object validation failed.");
	      }
	      return context.output;
	    } catch (_error) {
	      exception_ = _error;
	      message = "namedObjectResolver.resolve failed :: " + exception_.message;
	      throw new Error(message);
	    }
	  };

	  namedObjectResolver.getResolvedNamedObjectReference = function(resolvedNamedObjectContext_) {
	    var exception_, namespaceDataReference;
	    try {
	      if (!((resolvedNamedObjectContext_ != null) && resolvedNamedObjectContext_)) {
	        throw new Error("Missing resolved named object context object in-parameter.");
	      }
	      namespaceDataReference = resolvedNamedObjectContext_.output.namespaceDataReference;
	      if (!((namespaceDataReference != null) && namespaceDataReference && (typeof namespaceDataReference === 'object'))) {
	        throw new Error("Resolved named object reference is undefined, null, or not an object as expected!");
	      }
	      return namespaceDataReference;
	    } catch (_error) {
	      exception_ = _error;
	      throw new Error("namedObjectResolver failure: " + exception_.message);
	    }
	  };

	  resolveNamedObjectReference = function(context_) {
	    var descriptor, effectiveKey, exception_, input, output;
	    try {
	      input = context_.input;
	      output = context_.output;
	      descriptor = input.targetNamespaceDescriptor;
	      output.namespaceEffectiveKey = effectiveKey = (descriptor.namespaceType !== 'component') && descriptor.jsonTag || input.targetNamespaceKey;
	      output.namespaceDataReference = input.parentDataReference[effectiveKey];
	      switch (input.strategy) {
	        case 'open':
	          if (!((output.namespaceDataReference != null) && output.namespaceDataReference)) {
	            throw new Error("Named object at key '" + effectiveKey + "' does not exist.");
	          }
	          output.strategyFollowed = 'open';
	          break;
	        case 'create':
	          if ((output.namespaceDataReference != null) && output.namespaceDataReference) {
	            throw new Error("Named object at key '" + effectiveKey + "' already exists.");
	          }
	          output.strategyFollowed = 'create';
	          break;
	        case 'negotiate':
	          output.strategyFollowed = (output.namespaceDataReference != null) && output.namespaceDataReference && 'open' || 'create';
	          break;
	        default:
	          throw new Error("Unrecognized named object dereference strategy '" + input.strategy + "'.");
	      }
	      switch (output.strategyFollowed) {
	        case 'open':
	          break;
	        case 'create':
	          if (!((effectiveKey != null) && effectiveKey && (effectiveKey.length != null) && effectiveKey.length)) {
	            output.namespaceEffectiveKey = effectiveKey = input.semanticBindingsReference.getUniqueKey();
	          }
	          output.namespaceDataReference = input.parentDataReference[effectiveKey] = {};
	          output.dataChangeEventJournal.push({
	            layer: 'namedObject',
	            event: 'namedObjectCreated',
	            eventData: {
	              namespaceType: descriptor.namespaceType,
	              namespaceModelPath: descriptor.path,
	              namespaceModelId: descriptor.id,
	              key: effectiveKey
	            }
	          });
	          break;
	      }
	      output.resolvedId = input.targetNamespaceDescriptor.id;
	      return true;
	    } catch (_error) {
	      exception_ = _error;
	      throw new Error(exception_.message + (" ('" + descriptor.namespaceType + "' namespace '" + descriptor.jsonTag + "')."));
	    }
	  };

	}).call(this);


/***/ }
/******/ ]);