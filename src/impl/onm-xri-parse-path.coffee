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

###
    request = {
        model: required reference to an onm.Model
        addressBase: optional reference to an onm.Address
        xri: a string that the caller asserts is an onm-format path string.
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }
###

xRIP_PathParser = module.exports = (request_) ->

    # Abrogate validation of request_ in-parameter to assumed caller, xRIP.parse.
    # Consequently, never export this function at onm module scope.

    errors = []

    response =
        error: null
        result: null

    addressBase = request_.addressBase

    inBreakScope = false

    while not inBreakScope

        inBreakScope = true # better than a break at the bottom. And, clearer.

        xriTokens2 = request_.xri.split '.'
        generations = 0
        ascending = false
        for token in xriTokens2
            if token == '//'
                if ascending
                    errors.unshift "Path contains illegal namespace descent after ascent."
                    break
                else
                    generations++
            else
                ascending = true

        if errors.length
            break

        if generations and ((not (addressBase? and addressBase)) or ((addressBase.implementation.getDescriptor().parentPathIdVector.length - generations) < 0))
            errors.unshift "Path contains illegal descent below the model's root namespace."
            break

        if generations and addressBase? and addressBase
            try
                # TODO REMOVE EXCEPTION INTERFACE onm.Address.createParentAddress
                addressBase = addressBase.createParentAddress generations
                if not (addressBase? and baseAddress)
                    errors.unshift "Internal error evaluating requested #{generations}-level namespace descent."
                    break
            catch exception_
                errors.unshift "Internal error evaluating requested #{generations}-level namespace descent."
                break

            # If the path was just a descent, we're done.
            if not (xriTokens2.length - generations)
                response.result = addressBase
                break

        # addressBase is undefined indicating that the remaining unparsed tokens are to be
        # resolved relative to the anonymous store namespace. Or, addressBase is defined
        # and the remaining tokens are to be resolved relative to the namespace it identitifes.

        # Case 1: addressBase undefined -> remaining tokens relative to anonymous store namespace.
        if not (addressBase? and addressBase)

            if not xriTokens2.length
                errors.unshift "Null path cannot be resolved against the model's anonymous."
                break

            # Generate the root address of the model.
            addressBase = request_.model.createRootAddress()

            token = xriTokens2.shift()

            rootNamespaceName = addressBase.implementation.getDescriptor().jsonTag

            if token != rootNamespaceName
                errors.unshift "'#{addressBase.model.uuid}:#{addressBase.model.uuidVersion}'."
                errors.unshift "Expected name '#{rootNamespaceName}' to enter address space "
                errors.unshift "Invalid root namespace name '#{token}'."
                break

        # Case 2: addressBase defined -> remaining tokens relative to addressBase namespace.

        try
            unresolvedPath = (xriTokens2.slice generations, xriTokens2.length).join '.'
            response.result = addressBase.createSubpathAddress unresolvedPath
        catch exception_
            errors.unshift exception_.message
            errors.unshift "Path identifies a resource outside the model's address space."
            break

    if errors.length
        response.error = errors.join " "

    return response

