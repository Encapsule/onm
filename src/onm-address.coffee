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

classRegistry = require './common/onm-class-registry'
AddressToken = require './address/onm-address-token'

#
#
# ****************************************************************************
module.exports = class Address
    onmClassType: classRegistry.ids.Address
    constructor: (model_, tokenVector_) ->
        try
            @model = model_? and model_ or throw new Error("Missing required object model input parameter.");
            @implementation = new AddressDetails(@, model_, tokenVector_)

            # Addresses are said to be either complete or partial.
            # A complete address has one or more tokens and the first token refers to the root component.
            # A partial address has one or more tokens and the first token refers to a non-root component.
            @isComplete = => @implementation.complete

            # Addresses are said to be either qualified or unqualified.
            # A qualified address contains tokens that all specifiy a key (if required). Qualified addresses
            # may be resolved against a Store object when they're also complete addresses.
            # An unqualified address contains one or more tokens that do not specify a key (where required).
            # Unqualified addresses may only be used to create new components within a Store instance.
            @isQualified = => not @implementation.keysRequired or @implementation.keysSpecified

            # Addresses are said to be resolvable, creatable, or unresolvable
            # A resolvable address is both complete and qualified meaning that it specifies both a complete
            # and unambiguous chain of tokens leading to the addressed namespace. A creatable address is
            # a complete but unqualified address. A creatable address may be used to create a component but
            # cannot be used to open a namespace. All incomplete addresses are by definition unresolvable;
            # because both namespace create and open operations performed by an object store must be able
            # to verify the entire path to the target namespace and this cannot be done if the first token
            # in an address does not address the store's root component.
            @isResolvable = => @isComplete() and @isQualified()
            @isCreatable = => @isComplete() and @implementation.keysRequired and not @implementation.keysSpecified

        catch exception
            throw new Error("Address error: #{exception.message}");


    ###
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
    ###
    # ============================================================================
    address: (request_) => 
        errors = []
        response = error: null, result: null
        inBreakScope = false
        while not inBreakScope
            inBreakScope = true
            if not (request_? and request_)
                errors.unshift "Missing requirest request object in-parameter."
                break
            xri = request_.xri
            if not (xri? and xri)
                response.result = @
                break
            parseResponse = xRIP.parse model: @model, addressBase: @, xri: xri_
            if parseResponse.error
                errors.unshift parseResponse.error
                break
            response.result = parseResponse.result
        if errors.length
            errors.unshift "onm.Address.address failed:"
            request.error = errors.join ' '
        response

    ###
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
    ###
    # ============================================================================



    #
    # ============================================================================
    getHumanReadableString: =>
        console.log "onm v0.3: onm.Address.getHumanReadableString is deprecated. Use v0.3 onm.Address.uri API."
        @uri()

    #
    # ============================================================================
    # Returns this address' onm-format universal resource locator string (URI).
    # Note that an onm URI can be converted back to an onm.Address via method
    # onm.Model.addressFromURI.
    uri: =>
        errors = []
        response = error: null, result: null
        inBreakScope = false
        while not inBreakScope
            inBreakScope = true
            generatorResponse = xRIP.generate.vector.uri address: @
            if generatorResponse.error
                errors.unshift generatorResponse.error
                break
            response.result = generatorResponse.result
        if errors.length
            errors.unshift "onm.Address.uri failed:"
            response.error = errors.join ' '

        # TODO: REMOVE EXCEPTION INTERFACE
        if errors.length
            throw new Error response.error
        response.result

    #
    # ============================================================================
    getHashString: =>
        console.log "onm v0.3: onm.Address.getHashString is deprecated. Use v0.3 onm.Address.lri API."
        @lri()

    #
    # ============================================================================
    lri: =>
        try
            if @implementation.hashString? and @implementation.hashString
                return @implementation.hashString
            index = 0
            stringTokens = []
            for token in @implementation.tokenVector
               if index++
                    stringTokens.push token.key? and "#{token.key}" or '-'

                if token.idComponent != token.idNamespace
                    stringTokens.push "#{token.idNamespace}"

            # Given that an ONM object model is a singly-rooted tree structure, the raw
            # hash strings of different addresses created for the same object model all share
            # a common string prefix. All the information in the hash string is required to
            # reconstruct the address if the hash is used as a URN. However, for local in-app
            # processing, address hash strings are used as dictionary keys typically (e.g.
            # to open observer state). Speed equality/relational operations on hash string
            # by reversing the raw string (so that the common prefix appears at the tail
            # and does not need to evaluated typically). Note that WE DO NOT CARE if we break
            # Unicode character encoding here; the string is base64 encoded anyway and is
            # generally meaningless to humans, and the original string may be recovered
            # by reversing the process. https://github.com/mathiasbynens/esrever is a good
            # sample of how one should reverse a string if maintaining Unicode is important.

            hashString = "onm-lri:#{@model.uuidVersion}"
            if stringTokens.length
                hashString += ":#{stringTokens.join('.')}"

            @implementation.hashString = hashString
            return hashString

            # TODO: Need to ensure all fragments are correctly URI-encoded
            # here and in human-readable, and correctly decoded in corrollary model functions.
            # SAVE FOR FUTURE INSPIRATION
            #@implementation.hashString = encodeURIComponent(hashSource).replace(/[!'()]/g, escape).replace(/\*/g, "%2A")
            #reversedHashString = humanReadableString.split('').reverse().join('')
            #@implementation.hashString = window.btoa(reversedHashString)

        catch exception_
            throw new Error "onm.Address.lri generate failed: #{exception.message}"


    #
    # ============================================================================
    isRoot: =>
        try
            @implementation.getLastToken().idNamespace == 0

        catch exception
            throw new Error("CNMjs.Address.isRoot failure: #{exception.message}");

    #
    # ============================================================================
    isEqual: (address_) =>
        try
            if not (address_? and address_) then throw new Error("Missing address input parameter.");
            if @implementation.tokenVector.length != address_.implementation.tokenVector.length then return false
            result = true
            index = 0
            while index < @implementation.tokenVector.length
                tokenA = @implementation.tokenVector[index]
                tokenB = address_.implementation.tokenVector[index]
                if not tokenA.isEqual(tokenB)
                    result = false
                    break
                index++
            return result
        catch exception
            throw new Error("isEqual failure: #{exception.message}");


    #
    # ============================================================================
    isParent: (address_) =>
        try
            if not (address_? and address_) then throw new Error("Missing address input parameter.");
            if @implementation.tokenVector.length > address_.implementation.tokenVector.length then return false
            if @isEqual(address_) then return false
            lastToken = @implementation.tokenVector.length - 1
            index = 0
            while index < @implementation.tokenVector.length
                tokenA = @implementation.tokenVector[index]
                tokenB = address_.implementation.tokenVector[index]
                if tokenA.isEqual(tokenB)
                    if index == lastToken
                        # this address is a parent of the test address
                        return true
                    # tokens match and we're not at the end. continue...
                else
                    if index != lastToken
                        return false
                    # tokens do not match, and we're on the last token so we have do do some work
                    parentAddress = address_.createParentAddress();
                    while parentAddress
                        if @isEqual(parentAddress)
                            return true
                        parentAddress = parentAddress.createParentAddress()
                    return false
                index++
            return false
        catch exception
            throw new Error("isParent failure: #{exception.message}");

    #
    # ============================================================================
    isSameType: (address_) =>
        try
            if not (address_? and address_) then throw new Error("Missing address input parameter.");
            thisToken = @implementation.getLastToken();
            testToken = address_.implementation.getLastToken()
            result = thisToken.idNamespace == testToken.idNamespace
            return result
        catch exception
            throw new Error("isSameType failure: #{exception.message}");


    #
    # ============================================================================
    clone: => 
        try
            new Address(@model, @implementation.tokenVector)
        catch exception
            throw new Error("clone failure: #{exception.message}");
 

    #
    # ============================================================================
    createParentAddress: (generations_) =>
        try
            if not @implementation.tokenVector.length then throw new Error("Invalid address contains no address tokens.");

            generations = generations_? and generations_ or 1
            tokenSourceIndex = @implementation.tokenVector.length - 1
            token = @implementation.tokenVector[tokenSourceIndex--]

            if token.namespaceDescriptor.id == 0
                return undefined

            while generations
                descriptor = token.namespaceDescriptor

                # If we have reached the root descriptor we're done regardless of the number
                # of generations the caller requested.

                if descriptor.id == 0
                    break

                # If the current descriptor is within a component (i.e. not the component root)
                # then descriptor.parent.id indicates its parent ID from which we can trivially
                # update the current address token.
                #
                # However, if the current descriptor is the root of a component then its parent
                # is by definition an extension point. What makes this complicated is that 
                # the mapping of extension point ID to component ID is 1:1 but the converse is not
                # necessarily true. Component ID to containing extension point ID is 1:N potentially
                # because ONM allows extension points to specify the actual component declaration
                # or to specify a reference to some other component.

                if descriptor.namespaceType != "component"
                    token = new AddressToken(token.model, token.idExtensionPoint, token.key, descriptor.parent.id)
                else
                    token = (tokenSourceIndex != -1) and @implementation.tokenVector[tokenSourceIndex--] or throw new Error("Internal error: exhausted token stack.");

                generations--
                
            newTokenVector = ((tokenSourceIndex < 0) and []) or @implementation.tokenVector.slice(0, tokenSourceIndex + 1)
            newAddress = new Address(token.model, newTokenVector)
            newAddress.implementation.pushToken(token)
            return newAddress

        catch exception
            throw new Error("createParentAddress failure: #{exception.message}");


    #
    # ============================================================================
    createSubpathAddress: (subpath_) =>
        try
            if not (subpath_? and subpath_) then throw new Error("Missing subpath input parameter.");

            newTokenVector = [];

            if (@implementation.tokenVector.length > 1)
                # The base address token vector has two more more tokens. Clone the first through penultimate token(s).
                newTokenVector = @implementation.tokenVector.slice(0, (@implementation.tokenVector.length - 1))

            currentToken = @implementation.getLastToken()

            subpathTokens = subpath_.split('.')

            for subpathToken in subpathTokens

                # begin loop

                nd = currentToken.namespaceDescriptor

                ndNew = undefined

                if nd.namespaceType != 'extensionPoint'

                    for child in nd.children
                        if subpathToken == child.jsonTag
                            ndNew = child
                            break
                    if not (ndNew? and ndNew)
                        throw new Error("Invalid address token '#{subpathToken}'.");

                    if ndNew.namespaceType == 'component'
                        throw new Error("Internal error: components must be created within extension point namespaces. How did this happen?");

                    currentToken = new AddressToken(currentToken.model, currentToken.idExtensionPoint, currentToken.key, ndNew.id)

                else

                    archetypePathId = nd.archetypePathId

                    archetypeDescriptor = @model.implementation.getNamespaceDescriptorFromPathId(archetypePathId)

                    if subpathToken != archetypeDescriptor.jsonTag
                        throw new Error("Expected component name '#{archetypeDescriptor.jsonTag}' but was given '#{subpathToken}'.");

                    newTokenVector.push currentToken

                    currentToken = new AddressToken(currentToken.model, currentToken.idNamespace, undefined, archetypePathId);


                # end loop

            #
            newTokenVector.push currentToken
            newAddress = new Address(@model, newTokenVector)

            return newAddress

        catch exception
            throw new Error("createSubpathAddress failure: #{exception.message}");


    #
    # ============================================================================
    createComponentAddress: =>
        try
            descriptor = @implementation.getDescriptor()
            if descriptor.isComponent
                return @clone()
            newAddress = @implementation.createSubpathIdAddress(descriptor.idComponent)
            return newAddress
        catch exception
            throw new Error("createComponentAddress failure: #{exception.message}");

    #
    # ============================================================================
    createSubcomponentAddress: =>
        try
            descriptor = @implementation.getDescriptor()
            if descriptor.namespaceType != "extensionPoint"
                throw new Error("Unable to determine subcomponent to create because this address does not specifiy an extension point namespace.");
            newToken = new AddressToken(@model, descriptor.id, undefined, descriptor.archetypePathId)
            @clone().implementation.pushToken(newToken)
        catch exception
            throw new Error("createSubcomponentAddress failure: #{exception.message}");

    #
    # ============================================================================
    getModel: =>
        try
            return @implementation.getDescriptor().namespaceModelDeclaration

        catch exception
            throw new Error("getModel failure: #{exception.message}");


    #
    # ============================================================================
    getPropertiesModel: =>
        try
            return @implementation.getDescriptor().namespaceModelPropertiesDeclaration

        catch exception
            throw new Error("getPropertiesModel failure: #{exception.message}");

    #
    # ============================================================================
    getComponentKey: =>
        try
            if (!@isResolvable())
                throw new Error("You cannot obtain the component key of an unresolvable address.");
            return @implementation.getLastToken().key;
        catch exception
            throw new Error("getComponentKey failure: #{exception.message}");

            
    #
    # ============================================================================
    visitParentAddressesAscending: (callback_) =>
        try
            if not (callback_? and callback_) then return false
            if not (@parentAddressesAscending? and @parentAddressesAscending)
                @parentAddressesAscending = []
                @visitParentAddressesDescending( (address__) => @parentAddressesAscending.push(address__); true )
                @parentAddressesAscending.reverse()
            if not @parentAddressesAscending.length then return false
            for address in @parentAddressesAscending
                try
                    callback_(address)
                catch exception
                    throw new Error("Failure occurred inside your registered callback function implementation: #{exception.message}");
            true
        catch exception
            throw new Error("visitParentAddressesAscending failure: #{exception.message}");
        
    #
    # ============================================================================
    visitParentAddressesDescending: (callback_) =>
        try
            if not (callback_? and callback_) then return false
            if not (@parentAddressesDesending? and @parentAddressesDesceding)
                @parentAddressesDescending = []
                parent = @createParentAddress()
                while parent
                    @parentAddressesDescending.push parent
                    parent = parent.createParentAddress()
            if not @parentAddressesDescending.length then return false
            for address in @parentAddressesDescending
                try
                    callback_(address)
                catch exception
                    throw new Error("Failure occurred inside your registered callback function implementation: #{exception.message}");
            true
        catch exception
            throw new Error("visitParentAddressesDescending failure: #{exception.message}");

    #
    # ============================================================================
    visitSubaddressesAscending: (callback_) =>
        try
            if not (callback_? and callback_) then return false

            if not (@subnamespaceAddressesAscending? and @subnamespaceAddressesAscending)
                @subnamespaceAddressesAscending = []
                childAddressesToVisit = []
                childAddressesToVisit.push @
                traverse = (startAddress_) =>
                    if startAddress_.getModel().namespaceType != "extensionPoint"
                        startAddress_.visitChildAddresses (childAddress_) =>
                            @subnamespaceAddressesAscending.push childAddress_
                            childAddressesToVisit.push childAddress_
                while childAddressesToVisit.length
                    traverse(childAddressesToVisit.pop());

            for address in @subnamespaceAddressesAscending
                try
                    callback_(address)
                catch exception
                    throw new Error("Failure occurred inside your registered callback function implementation: #{exception.message}");
            true
        catch exception
            throw new Error("visitSubaddressesAscending failure: #{exception.message}");

    #
    # ============================================================================
    visitSubaddressesDescending: (callback_) =>
        try
            if not (callback_ and callback_) then return false
            if not (@subnamespaceAddressesDescending? and @subnamespaceAddressesDescending)
                @subnamespaceAddressesDescending = []
                @visitSubaddressesAscending( (address__) => @subnamespaceAddressesDescending.push address__ )
                @subnamespaceAddressesDescending.reverse()
            for address in @subnamespaceAddressesDescending
                try
                    callback_(address)
                catch exception
                    throw new Error("Failure occurred inside your registered callback function implementation: #{exception.message}");
            true
        catch exception
            throw new Error("visitSubaddressesAscending failure: #{exception.message}");



    #
    # ============================================================================
    visitChildAddresses: (callback_) =>
        try
            if not (callback_? and callback_) then return false
            namespaceDescriptor = @implementation.getDescriptor()
            if namespaceDescriptor.namespaceType == 'extensionPoint'
                return false
            for childDescriptor in namespaceDescriptor.children
                childAddress = @implementation.createSubpathIdAddress(childDescriptor.id)
                try
                    callback_(childAddress)
                catch exception
                    throw new Error("Failure occurred inside your registered callback function implementation: #{exception.message}");
            true
        catch exception
            throw new Error("visitChildAddresses failure: #{exception.message}");

    #
    # ============================================================================
    visitExtensionPointAddresses: (callback_) =>
        try
            if not (callback_? and callback_) then return false
            if not (@extensionPointAddresses? and @extensionPointAddresses)
                @extensionPointAddresses = []
                addressComponent = @createComponentAddress();
                namespaceDescriptor = addressComponent.implementation.getDescriptor()
                for path, extensionPointDescriptor of namespaceDescriptor.extensionPoints
                    extensionPointAddress = @implementation.createSubpathIdAddress(extensionPointDescriptor.id)
                    if @isParent(extensionPointAddress)
                        @extensionPointAddresses.push extensionPointAddress
            for address in @extensionPointAddresses
                callback_(address)
            true # that
        catch exception
            throw new Error("visitExtensionPointAddresses failure: #{exception.message}");





# AddressDetails must be in module scope for Address constructor. But has dependency
# on this module. So, last. Otherwise, AddressDetails will resolve its in-module scope
# reference to the Address constructor before it's defined. Never a good thing.

AddressDetails = require './address/onm-address-details'
xRIP = require './model/xrip/onm-xri-processor'