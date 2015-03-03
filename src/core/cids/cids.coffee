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
    Class Identification Subsystem (CIDS)

    CIDS defines a simple protocol for managing classes of in-memory JavaScript object resources at runtime.

    The object property name cids.reserverd reserved by CIDS for use as a Class Identifier (CID).

    The CID value assigend to an onm-format Internet Routable URI Token (IRUT) string.

    Comparison of the CID value of two objects for equality is the only meaningful discrimination semantic provided by CIDS.

    This is still useful however. Data (e.g. objects created by derived client code) that do not participate in CIDS will
    generally not be tagged with CID values. Internally, onm wraps just about every meaningful piece of client state
    in a CID-tagged object as it crosses the onm API surface and is validated. Additionally, all object generators within
    onm produce CID-tagged objects.

    CID are IRUT are globally unique so suitable for use as database indices alone, or in app-specific derived key scenarios.

###

CIDS = module.exports = {}
cnameTable = require './cids-table'



###
    ----------------------------------------------------------------------
    request = {
        ref: reference to an object
        cname: CIDS-registered class name string
    }
    response = {
        error: null or a string explaining why result is null
        result: input object
    }
    ----------------------------------------------------------------------
###
CIDS.setCID = (request_) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        if not (request_? and request_)
            errors.unshift "Missing request object in-parameter."
            break
        # Piggy-back on top of getCNAME's more thorough validation of request_
        innerResponse = CIDS.getCNAME request_.ref
        if not innerResponse.error
            errors.unshift "Object is already identified as '#{innerResponse.result.cname}' with CID '#{innerResponse.result.cid}'."
            break

        cid = cnameTable.cname2cid[request_.cname]
        if not (cid? and cid)
            errors.unshift "Unknown object class name '#{request_.cname}'. Registered in CIDS: [#{cnameTable.cnames}]."
            break

        console.log "onm.core.cids *** assigned: cname='#{request_.cname}' cid='#{cid}' ***"
        response.result = request_.ref[cnameTable.reservedPropertyName] = cid

    if errors.length
        errors.unshift "CIDS.setCID:"
        response.error = errors.join ' '

    response

# Returns a response object with the specified object's CID.
# The routine ensures that the object is registered and that
# the CID value is in the expected format. However, the returned
# CID value is not reconciled against the registry and may not
# refer to a registered onm object class.A

CIDS.getCNAME = (ref_) ->

    errors = []
    response = error: null, result: null

    inBreakScope = false
    while not inBreakScope
        inBreakScope = true

        refType = Object.prototype.toString.call ref_
        if refType != '[object Object]'
            errors.unshift "Invalid request 'object' value type '#{refType}'. Expected reference to '[object Object]'."
            break

        responseCID = ref_[cnameTable.reservedPropertyName]
        if not (responseCID? and responseCID)
            errors.unshift "Object appears not to be CID-identified."
            break

        responseCIDType = Object.prototype.toString.call responseCID
        if responseCIDType != '[object String]'
            errors.unshift "Object appears to be CID-identified with a value of type '#{responseCIDType}. Expected '[object String]'."
            break

        if responseCID.length != 22
            errors.unshift "Object appears to be CID-identified with an unknown, non-IRUT, string format."
            break

        responseCNAME = cnameTable.cid2cname[responseCID]

        if not (responseCNAME? and responseCNAME)
            errors.unshift "Object is identified with an unknown CID value '#{responseCID}'."
            break;

        response.result = cid: responseCID, cname: responseCNAME

    if errors.length
        errors.unshift "CIDS.getCID:"
        response.error = errors.join ' '

    response

CIDS.assertCID = (request_) ->
    errors = []
    response = error: null, result: false
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        getCNAMEResponse = CIDS.getCNAME request_.ref
        if getCNAMEResponse.error
            errors.unshift getCNAMEResponse.error
            break
        if getCNAMEResponse.result.cname != request_.cname
            cidCheck = cnameTable.cname2cid[request_.cname]
            if not (cidCheck? and cidCheck)
                errors.unshift "Invalid request 'cname' value '#{request_.cname}'. Registered in CIDS: [#{cnameTable.cnames}]."
                break
            errors.unshift "Target asserted to be a '#{request_.cname}' is actually a '#{getCNAMEResponse.result.cname}' resource."
            break          
        response.result = true
    if errors.length
        errors.unshift "CIDS.assertCID:"
        response.error = errors.join ' '

    response