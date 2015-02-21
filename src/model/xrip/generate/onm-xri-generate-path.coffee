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

xRIP_PathGenerators =
    readable: require './onm-xri-generate-path-readable'
    hash: require './onm-xri-generate-path-hash'


###
    request = {
        address: onm.Address reference
        format: string (one of "readable" or "hash")
    }
    response = {
        error: null or string explaining why result === null
        result: onm-format path xRI string
    }

###

xRIP_PathGenerator = module.exports = (request_) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        pathFormat = request_.format
        selectedPathGenerator = xRIP_PathGenerators[pathFormat]
        if not (selectedPathGenerator? and selectedPathGenerator)
            errors.unshift "Internal error. No registered path generator for format '#{pathFormat}'."
            break
        generatorResponse = selectedPathGenerator request_
        if not generatorResponse.error
            response.result = generatorResponse.result
        else
            errors.unshift generatorResponse.error
    if errors.length
        errors.unshift "xRIP_PathGenerator failed:"
        response.error = errors.join ' '
    response
