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


CLUTS = module.exports = {}


cluts =
    'jsCode:jsTypeString': [ '[object Undefined]', '[object Null]', '[object Boolean]', '[object String]', '[object Number]', '[object Object]', '[object Array]', '[object Function]' ]
    'jsCode:jsMoniker': [ 'jsUndefined', 'jsNull', 'jsBoolean',  'jsString', 'jsNumber', 'jsObject', 'jsArray', 'jsFunction' ]
    'jsCode:jsonMoniker': [ null, 'jsonNull', 'jsonBoolean', 'jsonString', 'jsonNumber', 'jsonObject', 'jsonArray', null ]

clutsMaxIndex = cluts['jsCode:jsTypeString'].length

###
    ... Is ironically quite agile ;)
    request = {
        uMoniker: string moniker of the source value (indicates its type)
        vMoniker: string moniker of the destination value (indicates its type)
        value: JavaScript reference expected to refer to a value of type uMoniker
    }
###
CLUTS.request = (request_) ->

    errors = []
    response = error: null, result: undefined
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        if not (request_? and request_)
            errors.unshift "Missing request object."
            break
        requestType = Object.prototype.toString.call request_
        if requestType != '[object Object]'
            errors.unshift "Invalid request value type. Expected reference to '[object Object]'."
            break
        request = {}
        if not (request_.uMoniker? and request_.uMoniker)
            errors.unshift "Invalid request missing 'uMoniker' property."
            break
        requestType = Object.prototype.toString.call request_.uMoniker
        if requestType != '[object String]'
            errors.unshift "Invalid request 'uMoniker' value type. Expected reference to '[object String]'."
            break
        request.uMoniker = request_.uMoniker
        if not (request_.vMoniker? and request_.vMoniker)
            errors.unshift "Invalid request missing 'vMoniker' property."
            break
        requestType = Object.prototype.toString.call request_.vMoniker
        if requestType != '[object String]'
            errors.unshift "Invalid request 'vMoniker' value type. Expected reference to '[object String]'."
            break
        request.vMoniker = request_.vMoniker

        if request.uMoniker == request.vMoniker
            errors.unshift "Conversion request to convert '#{request.uMoniker}' to reference of itself is invalid."
            break;

        valueType = Object.prototype.toString.call request_.value

        forwardLookup = true

        switch request.uMoniker
            when 'jsReference'
                break
            when 'jsCode'
                if valueType != '[object Number]'
                    errors.unshift "Invalid request 'value' type. Expected reference to '[object Number]'."
                    break
                if (request_.index < 0) or (request_.index >= clutsMaxIndex)
                    errors.unshift "Invalid request 'value' value is numerically out of range in."
                break
            when 'jsMoniker' or 'jsonMoniker' or 'jsTypeString'
                if valueType != '[object String]'
                    errors.unshift "Invalid request 'value' type. Expected reference to '[object String]'."
                forwardLookup = false
                break
            else
                errors.unshift "Invalid request 'uMoniker' value '#{request.uMoniker}' is not a recognized onm type alias string."
                break

         if errors.length
             errors.unshift "Attempting conversion from '#{request.uMoniker}' to '#{request.vMoniker}':"
             break

         request.value = request_.value

         sourceType = forwardLookup and request.uMoniker or request.vMoniker
         destinationType = forwardLookup and request.vMoniker or request.uMoniker
         tableKey = "#{sourceType}:#{destinationType}"
         selectedTable = cluts[tableKey]

         if not (selectedTable? and selectedTable)
             errors.unshift "Invalid request no conversion operator from '#{sourceType}' to '#{destinationType}'."
             break

         response.result = forwardLookup and selectedTable[request.value] or selectedTable.indexOf request.value

    if errors.length
        errors.unshift "CLUTS.request failed:"
        response.error = errors.join " "

    response



