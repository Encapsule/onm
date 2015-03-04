###
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

###
#
#
#

# TODO: Rewrite this atrocity of a module using jsgraph.

CIDS = require './core/cids/cids'

helperFunctions = require './common/onm-util-functions'
intrinsicDataModels = require './common/onm-intrinsic-data-models'

Address = require './onm-address'
AddressToken = require './core/rasp/onm-address-token'
ModelDetails = require './core/rasp/onm-model-details'

xRIP = require './core/risp/risp'

uuid = require 'node-uuid'



#
#
# ****************************************************************************
module.exports = class Model
    constructor: (objectModelDeclaration_) ->
        try
            @implementation = new ModelDetails @, (objectModelDeclaration_? and objectModelDeclaration_ or intrinsicDataModels.jsonObject)

        catch exception
            throw new Error "onm.Model constructor failed: #{exception.message}"


    #
    # ============================================================================
    ###
        request: {
            xri: onm-format resource identifier string variant (path, LRI, URI)
        }
        response: {
            error: null or string explaining why result === null
            address: onm.Address reference or null to indicate error
        }
    ###
    address: (xri_) => 
        parseResponse = xRIP.parse model: @, xri: xri_
        if parseResponse.error
            throw new Error "onm.Model.address failed: #{parseResponse.error}"
        parseResponse.result


    #
    # ============================================================================
    createRootAddress: =>
        console.warn "onm.Model.createRootAddress is deprecated in onm v0.3. Use onm.Model.address API."
        try
            return new Address(@, [ new AddressToken(@, undefined, undefined, 0) ])
        catch exception
            throw new Error("createRootAddress failure: #{exception.message}")
            
    #
    # ============================================================================
    createPathAddress: (path_) =>
        console.warn "onm.Model.createPathAddress is deprecated in onm v0.3. Use onm.Model.address API."
        errors = []
        response = xRIP.parse model: @, xri: path_
        if response.error
            throw new Error "onm.Model.createPathAddress failed: #{response.error}"
        response.result

    #
    # ============================================================================
    addressFromURI: (uri_) =>
        console.warn "onm.Model.addressFromURI is deprecated in onm v0.3. Use onm.Model.address API."
        errors = []
        response = xRIP.parse model: @, xri: uri_
        if response.error
            throw new Error "onm.Model.addressFromURI failed: #{response.error}"
        return response.result

    # DEPRECATED in v0.3
    createAddressFromHumanReadableString: (humanReadableString_) =>
        console.warn "onm.Model.createAddressFromHashString is deprecated in onm v0.3. Use onm.Model.address API."
        @addressFromURI humanReadableString_

    #
    # ============================================================================
    addressFromLRI: (lri_) =>
        console.warn "onm.Model.addressFromLRI is deprecated in onm v0.3. Use v0.3 onm.Model.address API."
        errors = []
        response = xRIP.parse model: @, xri: lri_
        if response.error
            throw new Error "onm.Model.addressFromLRI failed: #{response.error}"
        return response.result

    # DEPRECATED in v0.3
    createAddressFromHashString: (hash_) =>
        console.log "onm v0.3: onm.Model.createAddressFromHashString is deprecated. Use v0.3 onm.Model.addressFromLRI API."
        @addressFromLRI hash_

    #
    # ============================================================================
    # I never liked this... This has to go.
    getSemanticBindings: =>
        try
            return @implementation.semanticBindings
        catch exception
            throw new Error("getSemanticBindings failure: #{exception.message}");

    #
    # ============================================================================
    isEqual: (model_, strict_) =>
        try
            if not (model_? and model_ and (model_ instanceof Model))
                throw new Error "Missing or invalid onm.Model instance reference specified."
            strict = (not (strict_? and strict_) and true) or (strict_ == true) or false
            (not strict and (@uuid == model_.uuid)) or ((@uuid == model_.uuid) and (@uuidVersion == model_.uuidVersion))
        catch exception
            throw new Error("isEqual failure: #{exception.message}")

    #
    # ============================================================================
    toJSON: (replacer_, space_) =>
        try
            JSON.stringify @implementation.objectModelDeclaration, replacer_, space_
        catch exception_
            throw new Error "onm.Model.toJSON failed: #{exception_.message}"
        


cidsResponse = CIDS.setCID { ref: Model, cname:'Model'}
if cidsResponse.error
    throw new Error cidsResponse.error

