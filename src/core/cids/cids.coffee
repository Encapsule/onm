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

CIDS = module.exports = {}

# Obtain a CID given its CNAME

CIDS.ids =
    IRUT: 'NX_zU3FeRDublNx6WSQTog'

    # v0.3 public API object identifiers
    Model:      '57347d22-cefb-4b5d-a2ed-1732a764fe6b'
    Address:    '075d9b07-c612-416e-a0b2-e839c8677de7'
    Store:      'a5fc2cff-a105-4750-b2ed-8b7b11f73af5'
    Namespace:  '62286994-befa-4ef5-8f39-8eaaf890fabf'

    # v1.0 core object identifiers
    NSD:        'e544054c-be40-4130-ab2a-903c2861cc7f'
    ASM:        'ba9c687c-860a-4f18-9b03-f6d42d0704fb'
    RAS:        'ef0613fb-dbb0-493c-8e4f-31bdad5dbf48'
    DAO:        'f74ea6d3-541c-432b-b925-5faa0bc8eb6e'
    RAL:        'ab49f85e-cd32-4e27-9006-8d8e54f4a8b6'
    RLP:        '6e064cd9-2d65-4974-8903-d9860fed85ff'
    # ^--- 1st class onm core objects with constructors v--- Disciminating wrappers for JavaScript types
    RIS:        '9e84b41a-7bce-4620-ad7a-b208aecabb11' # Wraps a RIS-encoded string
    DAB:        '43e81405-722b-4c9e-8a67-c6fa82869bc0' # Wraps a DAB-encoded string

    JSON:       '502b7bf1-c6f6-473c-a748-9b5d7e22d9fc' # Wraps a JSON-encoded string
    DATA:       'b9c2634c-3497-436b-8c12-f6647de599d1' # Wraps an Object convertible to JSON
    
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

