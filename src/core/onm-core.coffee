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

classRegistry = require '../common/onm-class-registry'
operationMap = require './onm-core-operation-map'

###
DAOS = require './doas/doas'
JNSP = require './jnsp/jnsp'
RASP = require './rasp/rasp'
RISP = require './risp/risp'
RLTP = require './rltp/rltp'
###


onm = module.exports = {}


###
    request = {
        input: [] // an array of one or more onm core objects to use as context for the request
        outputType: // the onm class type of the requested output
        options: {} // operation-specific options object
    }
    response: {
        error: null // or a string explaining why result is null
        result: null // to indicate an error or the requested onm core object if successful
    }
###
# ============================================================================
onm.request = (request_) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true

        # The caller is required to specify a value for the request in-parameter.
        if not (request_? and request_)
            errors.unshift "Missing required request object in-parameter."
            break

        # Request must be an object.
        requestType = Object.prototype.toString.call request_
        if requestType != '[object Object]'
            errors = "Invalid request type. Expected reference to '[object Object]'."
            break

        # The caller may optionally specify an input array of onm core object references.
        if not (request_.inputs? and request_.inputs)
            errors.unshift "Invalid request object missing 'inputs' property."
            break

        # The request inputs property must be an array.
        inputsType = Object.prototype.toString.call request_.inputs
        if inputsType != '[object Array]'
            errors.unshift "Invalid request object 'inputs' value type. Expected reference to '[object Array]]."
            break

        # The caller may optionally specify an options property. It must be an object.
        optionsType = Object.prototype.toString.call request_.options
        if request_.options? and request_.options and optionsType != '[object Object]'
            errors.unshift "Invalid request object 'options' value type. Expected reference to '[object Object]'."
            break
        
        # The caller must specify the type of onm core object they want returned.
        if not (request_.outputType? and request_.outputType)
            errors.unshift "Invalid request object missing 'outputType' property."
            break

        # The output type specification must be a string.
        outputTypeType = Object.prototype.toString.call request_.outputType
        if outputTypeType != '[object String]'
            errors.unshift "Invalid request object 'outputType' value type. Expected '[object String]'."
            break

        # Create an operation ID for the request.
        inputObjectNames = []
        for coreObject in request_.inputs
            onmClassType = classRegistry.lookup coreObject.onmClassType
            inputObjectNames.push onmClassType? and onmClassType or Object.prototype.toString.call coreObject

        opTokens = request_.inputs.sort (a_, b_) -> a_.localeCompare(b_)
        opId = "#{request_.outputType}<=#{opTokens.join ':'}"

        operationDescriptor = operationMap[opId]

        if not (operationDescriptor? and operationDescriptor)
            sortedInputNames = inputObjectNames.sort (a_, b_) -> a_.localeCompare(b_)
            inputSpec = sortedInputNames.length and "[ #{sortedInputNames.join ','} ]" or "[ null ]"
            outputTypeName = classRegistry.lookup[request_.outputType]
            outputTypeName = outputTypeName? and outputTypeName or request_.outputType
            outputSpec = "[ #{outputTypeName} ]"
            errors.unshift "Sorry. No registered transform from '#{inputSpec}' to '#{outputSpec}."
            break



    if errors.length
        errors.unshift "onm.request failed:"
        response.error = errors.join ' '

    response


wrapType = (value_, expectedNativeType, onmClassName) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        if not (value_? and value_)
            errors.unshift "Missing required value in-parameter."
            break
        valueNativeType = Object.prototype.toString.call value_
        if valueNativeType != expectedNativeType
            errors.unshift "Invalid request value type '#{valueNativeType}. Expected reference to '#{expectedNativeType_}'."
            break
        classId = classRegistry.ids[onmClassName]
        if not classId? and classId
            errors.unshift "Invalid request specifies unknown wrapper type '#{onmClassName}'."
            break
        response.result =
            onmClassType: classId
            value: value_
    if errors.length
        result.error = errors.join ' '
    response

onm.wrapDAB = (dabString_) ->
    response = wrapType dabString_, '[object String]', 'DAB'
    if response.error
        response.error = "onm.wrapDAB: #{response.error}"
    response

onm.wrapDATA = (dataObject_) ->
    response = wrapType dataObject_, '[object Object]', 'DATA'
    if response.error
        response.error = "onm.wrapDATA: #{response.error}"
    response

onm.wrapJSON = (jsonString_) ->
    response = wrapType jsonString_, '[object String]', 'JSON'
    if response.error
        response.error = "onm.wrapJSON: #{response.error}"
    response

onm.wrapRIS = (risString_) ->
    response = wrapType risString_, '[object String]', 'RIS'
    if response.error
        response.error = "onm.wrapRIS: #{response.error}"
    response
