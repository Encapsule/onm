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

AddressToken = require './onm-address-token'
Address = require '../onm-address'             

###
    request = {
        model: reference to onm.Model
        addressBase: optional reference to an onm.Address
        xriTokens: array of top-level xRI string tokens (path should be xriTokens[0])
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }

    If requrest.addressBase is undefined/null then the readable path is decoded relative to the model's
    anonymous namespace. Otherwise, readable path tokens are evaluated left-to-right using the namespace
    model specified by addressBase as the starting point of the path's namespace model walk.

###


xriReadablePathParser = module.exports = (request_) ->

    # Abrogate validation of request_ to assumed callers xRIP.PathParser, or xRIP.URIVectorParser.
    # Consequently, never export this function at onm module scope.

    addressTokenVector = []
    currentToken = null
    action = null

    errors = []
    response = error: null, result: null
    xriTokens = request_.xriTokens
    pathString = xriTokens.shift()
    pathTokens = pathString? and pathString and pathString.length and pathString.split '.' or []
    pathMetaString = (xriTokens.length and xriTokens.join ':') or undefined
    
    model = request_.model
    addressBase = request_.addressBase

    inBreakScope = false
    while not inBreakScope
        inBreakScope = true

        if not pathTokens.length
            # By convention, if there are no path tokens return the addressBase. Or, if the request
            # is relative to the model's anonymous namespace return the model's root address.
            response.result = addressBase? and addressBase or request_.model.createRootAddress()
            break

        # PARSE RELATIVE TO MODEL'S ANONYMOUS NAMESPACE

        if not (addressBase? and addressBase)
            pathToken = pathTokens.shift()

            ###
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
            ###

            if not ((pathToken == '*') or (pathToken == model.jsonTag))
                errors.unshift "Expected either '*' or '#{model.jsonTag}'."
                errors.unshift "Path beginning with token '#{pathToken}' cannot be parsed relative to this model's anonymous namespace."
                break

            # We're in. Initialize the current address token bound to model's root namespace.
            currentToken = new AddressToken model, undefined, undefined, 0

        else
            index = 0
            sourceTokenVector = addressBase.implementation.tokenVector
            while index < (sourceTokenVector.length - 1)
                addressTokenVector.push sourceTokenVector[index++].clone()
            currentAddressToken = sourceTokenVector[sourceTokenVector.length - 1].clone()

        # PARSE RELATIVE TO ESTABLISHED MODEL NAMESPACE
        pathTokenIndex = 0
        for pathToken in pathTokens

            if errors.length
                break

            nsDescriptorCurrent = currentAddressToken.namespaceDescriptor
            generateNewToken = (nsDescriptorCurrent.namespaceType == 'extensionPoint') and true or false

            if not generateNewToken

                # We're looking for a plain-old namespace with a regular 'jsonTag' name.

                nsDescriptorNew = null

                # TODO: At least cache this in a map during model creation. Fix entirely when model gets jsgraph for jbus.
                for childDescriptor in nsDescriptorCurrent.children
                    if pathToken == childDescriptor.jsonTag
                        nsDescriptorNew = childDescriptor
                        break

                if not (nsDescriptorNew? and nsDescriptorNew)
                    validPath = pathTokenIndex and "#{(pathTokens.slice 0, pathTokenIndex).join '.'}." or ''
                    unparsedPath = ((pathTokenIndex + 1) < pathTokens.length) and ".#{(pathTokens.slice (pathTokenIndex + 1), pathTokens.length).join '.'}" or ''
                    errors.unshift "Check path token #{pathTokenIndex + 1} '#{validPath}>>>#{pathToken}<<<#{unparsedPath}' and data model for discrepencies."
                    break

                currentAddressToken = new AddressToken model, nsDescriptorCurrent.idExtensionPoint, nsDescriptorCurrent.key, nsDescriptorNew.id

            else
                addressTokenVector.push currentAddressToken
                key = (not ((pathToken == "+") or (pathToken == nsDescriptorCurrent.jsonTag))) and pathToken or undefined
                currentAddressToken = new AddressToken model, nsDescriptorCurrent.idNamespace, key, nsDescriptorCurrent.archetypePathId

            pathTokenIndex++

        if not errors.length
            addressTokenVector.push currentAddressToken
            response.result = new Address model, addressTokenVector

    if errors.length
        response.error = errors.join ' '
    else if pathMetaString? and pathMetaString
        response.result.pathMetaString = pathMetaString

    response
