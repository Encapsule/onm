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
        addressBase: reference to an onm.Address
        xriTokens: array of top-level xRI string tokens (minus vector prefix token)
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }
###
xRIP_URIVectorParser = module.exports = (request_) ->
    # Abrogate validation of request_ in-parameter to assumed caller, xRIP_VectorParser.
    # Consequently, never export this function at onm module scope.
    errors = []
    response = error: null, result: null
    xriTokens = request_.xriTokens
    addressBase = request_.addressBase
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        uriEncodedModelId = xriTokens.shift()
        if uriEncodedModelId != addressBase.model.uuid
            errors.unshift "URI in model space #{#{uriEncodedModelId}} cannot be decoded in space {#{addressBase.model.uuid}}."
            break
        if not xriTokens.length
            response.result = addressBase.model.createRootAddress() # Don




        # The current implementation.
        try
            response.result = addressBase.model.addressFromURI xri
        catch exception_
            errors.unshift exception_.message
        break
    if errors.length
        response.error = errors.join ' '
    response
