
/*
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
 */

(function() {
  'use strict';
  var cid, cname, cnameTable;

  cnameTable = {};

  cnameTable.reservedPropertyName = '__cid__';

  cnameTable.cnames = [];

  cnameTable.cname2cid = {
    IRUT: 'onmRWMgVT-Gls0D99oo-9A',
    Model: 'onmnqPaPSWKDsC9c8GZaEg',
    Address: 'onm-jxccSVSMum1pxB7-RA',
    Store: 'onmJ854qRVarn0zv7arr1w',
    Namespace: 'onmPnVIeToa_1BxO8Y47gg',
    NSD: 'onm7f7BZTEONDSnfrSs6AA',
    ASM: 'onmN7AoERO-3jIhkVqkxEg',
    RAS: 'onmbrsKOR0iv8kZXzhXejw',
    DAO: 'onmP7n5uTxaLduPZF_Naig',
    RAL: 'onmthokETQuOMLrIDeegpw',
    RLP: 'onmESS9lSZukNLhQmCosyQ',
    RIS: 'onmf5Qt2RD2g30oDtsZD1g',
    DAB: 'onmCBeRAQFKhIokTJLTGfA',
    JSON: 'onmFMpxfSCaZO943sLfuxw',
    DATA: 'onmVNJZMQUKjDmocj6esPA'
  };

  cnameTable.cid2cname = {};

  for (cname in cnameTable.cname2cid) {
    cid = cnameTable.cname2cid[cname];
    cnameTable.cid2cname[cid] = cname;
    cnameTable.cnames.push(cname);
  }

  Object.freeze(cnameTable);

  module.exports = cnameTable;

}).call(this);
