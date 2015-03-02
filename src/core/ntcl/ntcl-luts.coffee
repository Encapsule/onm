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

CLUTS = require './ntcl-cluts'


LUTS = module.exports = {}

LUTS.jsCodes = CLUTS.jsCodes
LUTS.dimensions = CLUTS.dimensions
LUTS.request = CLUTS.request

###
    request = {
        ref: JavaScript reference
        type: string or array of string values on dimension 'jsMoniker'
    }
    response = {
        error: null or string explaining why result and guidance are null
        guidance: a string explaining the false result (often used in parameter validation error messages upstream)
        result: boolean true if ref in expected type set, false + guidance if not
    }
###
LUTS.refInJsTypeSet = (request_) ->
    errors = []
    response = error: null, result: null

    inBreakScope = false

    while not inBreakScope

        inBreakScope = true

        if not (request_? and request_?)
            errors = "Missing request object in-parameter."
            break

        clutsResponse = CLUTS.request({to:'jsMoniker',from:'jsReference',value:request_.ref});
        if clutsResponse.error
            errors.unshift clutsResponse.error
            break

        refMoniker = clutsResponse.result

        clutsResponse = CLUTS.request({to:'jsMoniker',from:'jsReference',value:request_.type});
        if clutsResponse.error
            errors.unshift clutsResponse.error
            break

        typeMoniker = clutsResponse.result

        switch typeMoniker
            when 'jsString'
                response.result = request_.type == refMoniker
                break

            when 'jsArray'
                response.result = (request_.type.indexOf refMoniker) != -1
                break

            else
                errors.unshift "Invalid request 'type' value type '#{typeMoniker}'. Expected either '[object String]' or '[object Array]' (of strings)."
                break

        if errors.length
            break

        if not response.result
            response.guidance = "Value of type '#{refMoniker}' is not in expected set [#{request_.type}]."

    if errors.length
        response.error = errors.join ' '

    response

LUTS.refValidJsonType = (request_) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        if not (request_? and request_?)
            errors = "Missing request object in-parameter."
            break
        clutsResponse = CLUTS.request({to:'jsonMoniker',from:'jsReference',value:request_.ref});
        if clutsResponse.error
            response.guidance = clutsResponse.error
            response.result = false
            break
        response.result = true
    if errors.length
        response.error = errors.join ' '
    response



