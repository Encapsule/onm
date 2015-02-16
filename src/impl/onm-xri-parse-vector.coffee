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
        xriTokens: array of top-level xRI string tokens
    }
    response = {
        error: null or string explaining why result === null
        result: reference to an onm.Address or null
    }
###
xRIP_VectorParser = module.exports = (request_) ->

    # Abrogate validation of request_ in-parameter to caller, xRIP.parse.
    # Consequently, never export this function at onm module scope.

    errors = []

    response =
        error: null
        result: null

    inBreakScope = false

    while not inBreakScope

        inBreakScope = true

        # CATEGORIZE the xRI vector as either an onm-format URI, or LRI
        switch xriTokens1[0]
            when 'onm-uri'
                try
                    response.result = addressBase.model.addressFromURI xri
                catch exception_
                    errors.unshift exception_.message
                    errors.unshift "URI identifies a resource outside the model's address space."
                    break
            when 'onm-lri'
                try
                    response.result = addressBase.model.addressFromLRI xri
                catch exception_
                    errors.unshift exception_.message
                    errors.unshift "LRI identifies a resource outside the model's address space."
                    break
            else
                errors.unshift "invalid vector xRI type '#{xriTokens1[0]}'. Expected either 'onm-uri', or 'onm-lri'."
                break

    if errors.length
        errors.unshift "onm.xRIParser failed:"
        response.error = errors.join " "

    return response    