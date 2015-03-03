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

CIDS = require '../cids/cids'
NTCL = require '../ntcl/ntcl'

PODS = module.exports = {}



# ============================================================================
PODS.wrapXPOD = (value_, constrainToJavaScriptType_, onmClassName_) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        if not (value_? and value_)
            errors.unshift "Missing required value in-parameter."
            break
        valueNativeType = Object.prototype.toString.call value_
        if valueNativeType != constrainToJavaScriptType_
            errors.unshift "Invalid request value type '#{valueNativeType}. Expected reference to '#{constrainToJavaScriptType_}'."
            break
        classId = CIDS.ids[onmClassName_]
        if not classId? and classId
            errors.unshift "Invalid request specifies unknown wrapper type '#{onmClassName_}'."
            break
        response.result =
            onmClassType: classId
            value: value_
    if errors.length
        response.error = errors.join ' '
    response

# ============================================================================
PODS.wrapDAB = (dabString_) ->
    response = PODS.wrapXPOD dabString_, '[object String]', 'DAB'
    if response.error
        response.error = "onm.wrapDAB: #{response.error}"
    response

# ============================================================================
PODS.wrapDATA = (dataObject_) ->
    response = PODS.wrapXPOD dataObject_, '[object Object]', 'DATA'
    if response.error
        response.error = "onm.wrapDATA: #{response.error}"
    response

# ============================================================================
PODS.wrapJSON = (jsonString_) ->
    response = PODS.wrapXPOD jsonString_, '[object String]', 'JSON'
    if response.error
        response.error = "onm.wrapJSON: #{response.error}"
    response

# ============================================================================
PODS.wrapRIS = (risString_) ->
    response = PODS.wrapXPOD risString_, '[object String]', 'RIS'
    if response.error
        response.error = "onm.wrapRIS: #{response.error}"
    response
