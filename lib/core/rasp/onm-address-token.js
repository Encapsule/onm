
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
