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

xRIP_parseVariant =
    'onm-lri': require './risp-parse-vector-lri'
    'onm-uri': require './risp-parse-vector-uri'

###
    request = {
        model: reference to the onm.Model to use as the decoding reference
        xriTokens: array of top-level xRI string tokens
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }


    Vectors are always evaluated relative to the store's anonymous namespace
    and are much more restrictive than paths insofar as they explicitly encode
    information that is used to verify the decoding strategy (i.e. model)
    of the vector's path segment (a hash or readable path variant for LRI/URI respectively).

###
xRIP_VectorParser = module.exports = (request_) ->
    # Abrogate validation of request_ in-parameter to assumed caller, xRIP.parse.
    # Consequently, never export this function at onm module scope.
    errors = []
    response = error: null, result: null
    xriTokens = request_.xriTokens
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true

        # CATEGORIZE the xRI vector as either an onm-format URI, or LRI and delegate accordingly.

        vectorPrefixToken = xriTokens.shift()

        selectedVectorParser = xRIP_parseVariant[vectorPrefixToken]
        if not selectedVectorParser
            errors.unshift "Unrecognized xRI type '#{vectorPrefixToken}'. Expected either 'onm-lri', or 'onm-uri'."
            break

        vectorParseResponse = selectedVectorParser model: request_.model, xriTokens: xriTokens

        if not vectorParseResponse.error
            response.result = vectorParseResponse.result
        else
            errors.unshift vectorParseResponse.error

    if errors.length
        response.error = errors.join ' '

    response

