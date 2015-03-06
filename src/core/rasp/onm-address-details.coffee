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

# TOTAL WASTELAND...
# THIS MODULE IS SLATED TO BE DEMOLISHED POST v0.3 onm.

AddressToken = require './onm-address-token'

# TODO: Break this cycle. We're not going to use this pattern in v1.0 core.
Address = require './onm-address'

#
#
# ****************************************************************************
module.exports = class AddressDetails
    constructor: (address_, model_, tokenVector_) ->
        try
            @address = (address_? and address_) or throw new Error("Internal error missing address input parameter.");
            @model = (model_? and model_) or throw new Error("Internal error missing model input paramter.");

            # --------------------------------------------------------------------------
            @getModelPath = =>
                try
                    if not @tokenVector.length then throw new Error("Invalid address contains no address tokens.");
                    lastToken = @getLastToken()
                    return lastToken.namespaceDescriptor.path
                catch exception
                    throw new Error("getModelPath failure: #{exception.message}");

            # --------------------------------------------------------------------------
            @getModelDescriptorFromSubpath = (subpath_) =>

                try

                    currentModelPath = @getModelPath()

                    currentDescriptor = @getLastToken().namespaceDescriptor

                    subpathTokens = subpath_.split('.')

                    for token in subpathTokens
                        if currentDescriptor.namespaceType != "extensionPoint" or currentDescriptor.children.length
                            # Should be able to resolve normally.
                            currentModelPath += ".#{token}"
                            currentDescriptor = @model.implementation.getNamespaceDescriptorFromPath(currentModelPath)
                        else
                            # We cannot resolve normally because there are no subnamespaces declared in the model.
                            archetypePathId = currentDescriptor.archetypePathId? and currentDescriptor.archetypePathId or throw new Error('WAT');
                            archetypeDescriptor = @model.implementation.getNamespaceDescriptorFromPathId(archetypePathId)
                            if token != archetypeDescriptor.jsonTag
                                throw new Error("Expected component name of '#{token}' but instead found '#{archetypeDescriptor.jsonTag}'.");
                            currentModelPath = archetypeDescriptor.path
                            currentDescriptor = archetypeDescriptor


                        # end of loop

                    #console.log currentModelPath
                    return currentDescriptor


                catch exception
                    throw new Error("getModelDescriptorFromSubpath failure: #{exception.message}");

            # --------------------------------------------------------------------------
            @createSubpathIdAddress = (pathId_) =>
                try
                    if not (pathId_?  and pathId_ > -1) then throw new Error("Missing namespace path ID input parameter.");
                    addressedComponentToken = @getLastToken()
                    addressedComponentDescriptor = addressedComponentToken.componentDescriptor
                    targetNamespaceDescriptor = @model.implementation.getNamespaceDescriptorFromPathId(pathId_)
                    if targetNamespaceDescriptor.idComponent != addressedComponentDescriptor.id
                        throw new Error("Invalid path ID specified does not resolve to a namespace in the same component as the source address.");
                    newToken = new AddressToken(@model, addressedComponentToken.idExtensionPoint, addressedComponentToken.key, pathId_)
                    newTokenVector = @tokenVector.length > 0 and @tokenVector.slice(0, @tokenVector.length - 1) or []
                    newTokenVector.push newToken
                    newAddress = new Address(@model, newTokenVector)
                    return newAddress
                catch exception
                    throw new Error("createSubpathIdAddress failure: #{exception.message}");

            # --------------------------------------------------------------------------
            @pushToken = (token_) =>
                try
                    if @tokenVector.length
                        parentToken = @tokenVector[@tokenVector.length - 1]
                        @validateTokenPair(parentToken, token_)

                    @tokenVector.push token_.clone()

                    if token_.componentDescriptor.id == 0
                        @complete = true

                    if token_.keyRequired
                        @keysRequired = true

                    if not token_.isQualified()
                        @keysSpecified = false

                    # Pushing a token changes the address so we must clear any per-address cached data.
                    @humanReadableString = undefined
                    @hashString = undefined
                    @address

                catch exception
                    throw new Error("pushToken failure: #{exception.message}");

            # --------------------------------------------------------------------------
            @validateTokenPair = (parentToken_, childToken_) ->
                try
                    if not (parentToken_? and parentToken_ and childToken_? and childToken_)
                        throw new Error("Internal error: input parameters are not correct.");

                    if parentToken_.namespaceDescriptor.id != childToken_.extensionPointDescriptor.id
                        throw new Error("Child token is invalid because the parent token does not select the required extension point namespace.");

                    true

                catch exception
                    throw new Error("validateTokenPair the specified parent and child tokens are incompatible and cannot be used to form an address: #{exception.message}");

            # --------------------------------------------------------------------------
            @getLastToken = =>
                try
                    if not @tokenVector.length
                        throw new Error("Illegal call to getLastToken on uninitialized address class instance.");
                    @tokenVector[@tokenVector.length - 1]
                catch exception
                    throw new Error("getLastToken failure: #{exception.message}");

            # --------------------------------------------------------------------------
            @getDescriptor = =>
                try
                    return @getLastToken().namespaceDescriptor
                catch exception
                    throw new Error("getDescriptor failure: #{exception.message}");


            # --------------------------------------------------------------------------
            # CONSTRUCTOR
            # --------------------------------------------------------------------------

            @tokenVector = []
            @parentExtensionPointId = -1

            # Addresses are said to be either complete or partial.
            # A complete address has one or more tokens and the first token refers to the root component.
            # A partial address has one or more tokens and the first token refers to a non-root component.
            @complete = false # set true iff first token refers to the root component

            # Addresses are said to be either complete or partial.
            # A complete address has one or more tokens and the first token refers to the root component.
            # A partial address has one or more tokens and the first token refers to a non-root component.
            @keysRequired = false
            @keysSpecified = true

            # Performs cloning and validation
            for token in tokenVector_? and tokenVector_ or []
                @pushToken token

            # The following globals are used to cache namesapce traversal paths
            # on the first call to the related vistor function. Subsequent calls
            # on the same address object do not incur the overhead of recalculation.
            @parentAddressesAscending = undefined
            @parentAddressesDescending = undefined
            @subnamespaceAddressesAscending = undefined
            @subnamespaceAddressesDescending = undefined
            @subcomponentAddressesAscending = undefined
            @subcomponentsAddressesDescending = undefined

            @humanReadableString = undefined
            @hashString = undefined

        catch exception
            throw new Error("AddressDetails failure: #{exception.message}");

