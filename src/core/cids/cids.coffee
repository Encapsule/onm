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

    The object property name `__onmcid__` is reserved by CIDS for use as a Class Identifier (CID).

    The CID value assigend to an object's '__onmcid__` property is an onm-format Internet Routable URI Token (IRUT) string.

    Comparison of the CID value of two objects for equality is the only meaningful discrimination semantic provided by CIDS.

    This is still useful however. Data (e.g. objects created by derived client code) that do not participate in CIDS will
    generally not be tagged with CID values. Internally, onm wraps just about every meaningful piece of client state
    in a CID-tagged object as it crosses the onm API surface and is validated. Additionally, all object generators within
    onm produce CID-tagged objects.

    CID are IRUT are globally unique so suitable for use as database indices alone, or in app-specific derived key scenarios.

 ###


CIDS = module.exports = {}

# Obtain a CID given its CNAME

CIDS.ids =
    IRUT:       'onmRWMgVT-Gls0D99oo-9A' # <= FOUND IRUT beginning in 'onm' in 334842 attempts.

    # v0.3 API object identifiers
    Model:      'onmnqPaPSWKDsC9c8GZaEg' # <= FOUND IRUT beginning in 'onm' in 235152 attempts.
    Address:    'onm-jxccSVSMum1pxB7-RA' # <= FOUND IRUT beginning in 'onm' in 81105 attempts.
    Store:      'onmJ854qRVarn0zv7arr1w' # <= FOUND IRUT beginning in 'onm' in 104832 attempts.
    Namespace:  'onmPnVIeToa_1BxO8Y47gg' # <= FOUND IRUT beginning in 'onm' in 68364 attempts.

    # v1.0 core object identifiers

    NSD:        'onm7f7BZTEONDSnfrSs6AA' # <= FOUND IRUT beginning in 'onm' in 77376 attempts.
    ASM:        'onmN7AoERO-3jIhkVqkxEg' # <= FOUND IRUT beginning in 'onm' in 239709 attempts.
    RAS:        'onmbrsKOR0iv8kZXzhXejw' # <= FOUND IRUT beginning in 'onm' in 82317 attempts.
    DAO:        'onmP7n5uTxaLduPZF_Naig' # <= FOUND IRUT beginning in 'onm' in 69447 attempts     
    RAL:        'onmthokETQuOMLrIDeegpw' # <= FOUND IRUT beginning in 'onm' in 30610 attempts.
     
    RLP:        'onmESS9lSZukNLhQmCosyQ' # <= FOUND IRUT beginning in 'onm' in 65999 attempts.

    # ^--- 1st class onm core objects with constructors v--- Disciminating wrappers for JavaScript types

    RIS:        'onmf5Qt2RD2g30oDtsZD1g' # <= FOUND IRUT beginning in 'onm' in 852454 attempts.   
    DAB:        'onmCBeRAQFKhIokTJLTGfA' # <= FOUND IRUT beginning in 'onm' in 48037 attempts.    

    JSON:       'onmFMpxfSCaZO943sLfuxw' # <= FOUND IRUT beginning in 'onm' in 314994 attempts.
    DATA:       'onmVNJZMQUKjDmocj6esPA' # <= FOUND IRUT beginning in 'onm' in 457798 attempts.

    
# Obtain a CNAME given its CID

CIDS.lookup = {}
for classname of CIDS.ids
    classid = CIDS.ids[classname]
    CIDS.lookup[classid] = classname

        


###
    request = {
        object: reference to an object
        cname: CIDS-registered class name string
    }
    response = {
        error: null or a string explaining why result is null
        result: input object w/__onmcid__ property set on its prototype
    }
###
# ============================================================================
CIDS.setObjectCID = (object_, cname_) ->
    errors = []
    response = error: null, result: null
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true

        innerResponse = CIDS.getCIDInfo object_
        if not getInfoResponse.error
            errors.unshift "Object is already identified as '#{innerResponse.result.cname}' with CID '#{innerResponse.result.cid}'."
            break

        if innerResponse.result.cid? and innerResponse.result.cid
            errors.unshift innerResponse.error
            break

        cid = CIDS.ids[cname_]
        if not (cid? and cid)
            errors.unshift "Unknown object class name '#{cname_}'."
            break

        response.result = object_.prototype.__onmcid__ = cid

    if errors.length
        errors.unshift "CIDS.setObjectCID failed:"
        response.error = errors.join ' '

    response




# Returns a response object with the specified object's CID.
# The routine ensures that the object is registered and that
# the CID value is in the expected format. However, the returne
# CID value is not reconciled against the registry and may not
# refer to a registered onm object class.A

CIDS.getObjectCIDInfo = (object_) ->
    errors = []
    response = error: null, result: { cid: null, cname: null }
    inBreakScope = false
    while not inBreakScope
        inBreakScope = true
        if not (object_? and object)
            errors.unshift "Missing required object in-parameter."
            break
        objectType = Object.prototype.toString.call object_
        if objectType != '[object Object]'
            errors.unshift "Invalid request 'object' value type. Expected reference to '[object Object]'."
            break
        response.result.cid = objectCID = object_.__onmcid__
        if not (objectCID? and objectCID)
            errors.unshift "Object is not identified with a CID value."
            break
        objectCIDType = Object.prototype.toString.call objectCID
        if objectCIDType != '[object String]'
            errors.unshift "INTERNAL ERROR: Object CID identifier is not an '[object String]' as expected!"
            break
        if objectCID.length != 22
            errors.unshift "INTERNAL ERROR: Object CID identifier is not a 22-character IRUT-format string as exepected!"
            break
        cname = CIDS.lookup[objectCID]
        if not (cname? and cname)
            errors.unshift "Object is identified with an unknown CID."
            break;
        response.result.cname = cname
    if errors.length
        errors.unshift "CIDS.getCIDInfo:"
        response.error = errors.join ' '

    response

