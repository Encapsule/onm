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

'use strict'



cnameTable = {}
cnameTable.reservedPropertyName = '__cid__'
cnameTable.cnames = []

cnameTable.cname2cid =

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

cnameTable.cid2cname = {}
for cname of cnameTable.cname2cid
    cid = cnameTable.cname2cid[cname]
    cnameTable.cid2cname[cid] = cname
    cnameTable.cnames.push cname

Object.freeze cnameTable

module.exports = cnameTable

