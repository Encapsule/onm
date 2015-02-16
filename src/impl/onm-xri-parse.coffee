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


Address = require '../onm-address' # TODO: remove this.

xRIP_parsePath = require './onm-xri-parse-path'
xRIP_parseVector = require './onm-xri-parse-vector'

# If !response.error, then response.result is a newly-constructed onm.Address instance.
# If response.error, then response.error is a string message explaining why response.result is null.
# request = { baseAddress: onm.Address, xri: onm-format fully-qualified or relative dot-delimited path, URI or LRI string }


xRIP_Parser = module.exports = (request_) ->

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

        if not (request_.addressBase instanceof Address)
            errors.unshift "Invalid base address object type '#{typeof baseAddressType}'. Expected onm.Address reference."
            break

        xri = request_.xri
        addressBase = request_.addressBase

        # An onm xRI is a string that abstractly represents a namespace resource.
        # There are two major types of xRI's: paths, and vectors. Paths are for
        # humans. Vector are for machines (and by extension for the humans who
        # write platform code and need a way to safely express architectural
        # invariants).

        # CATEGORIZE xRI as PATH or VECTOR
        xriTokens = xri.split ':'
        xriCategory = (xriTokens.length > 1) and 'vector' or 'path'
        switch xriCategory
            when 'path'
                parsePathResponse = xRIP_parsePath { addressBase: request_.addressBase, xri: xriTokens[0] }
                if not parsePathResponse.error
                    response.result = parsePathResponse.result
                else
                    errors.unshift parsePathResponse.error
                break
            when 'vector'
                parseVectorResponse = xRIP_parseVector { addressBase: request_.addressBase, xriTokens: xriTokens }
                if not parseVectorResponse.error
                    response.result = parseVectorResponse.result
                else
                    errors.unshift parseVectorResponse.error
                break

    if errors.length
        errors.unshift "onm.xRIParser failed:"
        response.error = errors.join " "

    return response



