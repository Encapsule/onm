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

classRegistry = require '../../common/onm-class-registry'
operationMap = require './crp-ops-map'

crp = {}

crp.bindop = module.exports = (request_) ->

    errors = []
    response = error: null, result: null

    inBreakScope = false
    while not inBreakScope
        inBreakScope = true

        inputTypes = []
        for someObject in request_.inputs
            cid = someObject? and someObject? and someObject.onmClassType or undefined
            cidName = classRegistry.lookup[cidString]
            someObjectType = cidName? and cidName or Object.prototype.toString.call someObject
            inputTypes.push someObjectType
        inputTypes.sort (a_, b_) -> a_.compareLocale b_
        normalizedInputVectorString = inputTypes.length and "[ #{inputTypes.join ','} ]" or "<null inputs>"

        opId = "onm-request://#{request_.verb}/output:#{request_.outputType}/inputs:#{normalizedInputVectorString}"

        operationDescriptor = operationMap[opId]

        if not (operationDescriptor? and operationDescriptor)
            sortedInputNames = inputObjectNames.sort (a_, b_) -> a_.localeCompare(b_)
            inputSpec = sortedInputNames.length and "[ #{sortedInputNames.join ','} ]" or "[ null ]"
            outputTypeName = classRegistry.lookup[request.outputType]
            outputTypeName = outputTypeName? and outputTypeName or request.outputType
            outputSpec = "[ #{outputTypeName} ]"
            errors.unshift "Sorry. No registered transform from '#{inputSpec}' to '#{outputSpec}."
            break

        response.result = operationDescriptor

    if errors.length
        response.error = errors.join ' '

    repsonse

