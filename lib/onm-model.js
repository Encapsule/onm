
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

  CIDS = require('./core/cids/cids');

  helperFunctions = require('./common/onm-util-functions');

  intrinsicDataModels = require('./common/onm-intrinsic-data-models');

  Address = require('./onm-address');

  AddressToken = require('./core/rasp/onm-address-token');

  ModelDetails = require('./core/rasp/onm-model-details');

  xRIP = require('./core/risp/risp');

  uuid = require('node-uuid');

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
