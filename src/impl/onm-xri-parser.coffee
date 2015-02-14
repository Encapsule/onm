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

Address = require '../onm-address'

xri = module.exports = {}

# If !response.error, then response.result is a newly-constructed onm.Address instance.
# If response.error, then response.error is a string message explaining why response.result is null.
# request = { baseAddress: onm.Address, ris: onm-format fully-qualified or relative path, URI or LRI string }

xri.parse = (request_) ->

    errors = []

    response = 
        error: null
        result: null

    inBreakScope = false

    while not inBreakScope

        inBreakScope = true # better than a break at the bottom. And, clearer.

        if not (request_? and request_)
            errors.unshift "Missing required request object in-parameter."
            break

        if not (request_.xri? and request_.xri)
            errors.unshift "Invalid request object missing required property 'xri'."
            break

        xriType = Object.prototype.toString.call request_.xri

        if xriType != '[object String]'
            errors.unshift "Invalid resource identifier type '#{xriType}'. Expected '[object String]'."
            break

        if not (request_.addressBase? and request_.addressBase)
            errors.unshift "Invalid request object missing required property 'addressBase'."
            break

        addressBaseType = Object.prototype.toString.call request_.addressBase

        if not (request_.addressBase instanceof Address)
            errors.unshift "Invalid base address object type '#{baseAddressType}'. Expected onm.Address reference."
            break

        xri = request_.xri
        addressBase = request_.addressBase

        # An onm xRI is a string that abstractly represents a namespace resource.
        # There are two major types of xRI's: paths, and vectors. Paths are for
        # humans. Vector are for machines (and by extension for the humans who
        # write platform code and need a way to safely express architectural
        # invariants).

        # CATEGORIZE xRI as PATH or VECTOR

        xriTokens1 = xri.split ':'

        # xRI vectors are colon-delimited sequences of two, or three string tokens.
        # By convention, paths cannot contain colon characters.
        xriCategory = ((xriTokens1.length >= 2) and (xriTokens1.length <= 3)) and 'vector' or 'path'

        switch xriCategory
            when 'path'
                xriTokens2 = xriTokens1[0].split "."
                generations = 0
                ascending = false
                for token in xriTokens2
                    if token == '//'
                        if ascending
                            errors.unshift "Invalid path xRI. You cannot descend the namespace hierarchy after beginning an ascent."
                            break
                        else
                            generations++
                    else
                        ascending = true
                if errors.length
                    break
                if generations
                    try
                        addressBase = addressBase.createParentAddress generations
                        if not (addressBase? and baseAddress)
                            errors.unshift "Invalid relative path xRI. Cannot descend below root namespace."
                            break
                    catch exception_
                        errors.unshift exception_.message
                        break
                if not (xriTokens2.length - generations)
                    response.result = addressBase
                else
                    try
                        unresolvedPath = (xriTokens2.slice generations, xriTokens2.length).join '.'
                        if addressBase.isRoot()
                            response.result = addressBase.model.createPathAddress unresolvedPath
                        else
                            response.result = addressBase.createSubpathAddress unresolvedPath
                    catch exception_
                        errors.unshift exception_.message
                break
            when 'vector'
                # CATEGORIZE the xRI vector as either an onm-format URI, or LRI
                switch xriTokens1[0]
                    when 'onm-uri'
                        try
                            response.result = addressBase.model.addressFromURI xri
                        catch exception_
                            errors.unshift exception_.message
                        break
                    when 'onm-lri'
                        try
                            response.result = addressBase.model.addressFromLRI xri
                        catch exception_
                            errors.unshift exception_.message
                        break
                    else
                        errors.unshift "Invalid xRI vector type '#{xriTokens1[0]}'. Expected either 'onm-uri', or 'onm-lri'."
                        break

    if errors.length
        errors.unshift "onm.xRIParser failed:"
        response.error = errors.join " "

    return response



