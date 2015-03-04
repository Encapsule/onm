
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
Low-level library routines inspired by (and often copied) from http://coffeescriptcookbook.com
------------------------------------------------------------------------------
 */

(function() {
  var CIDS_TABLE, RISP, uuid;

  CIDS_TABLE = require('../../cids/cids-table');

  uuid = require('node-uuid');

  RISP = {};


  /*
      Generate an Internet-Routable Unique Token (IRUT)
  
      IRUT's are 22-character, ASCII-encoded, UUID v4, URI and RIS token-friendly string identifiers.
  
      Use cases:
      1. v4 UUID uniqueness semantics: addressed w/node-uuid package
      2. ASCII: addressed by using base64 encoding of the v4 UUID
      3. Short as possible: addressed by trimming superfluous '=' padding from base64
      4. URI token safe: addressed by replacing '/' characters with '_'
      5. RIS token safe: addressed by replacing '+' with '-'
  
      References:
      http://stackoverflow.com/questions/11431886/url-safe-uuids-in-the-smallest-number-of-characters
      http://stackoverflow.com/questions/6182315/how-to-do-base64-encoding-in-node-js
      http://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string
   */

  RISP.generateIRUT = module.exports = function() {
    var pads, r1, r2, r3, r4, r5, response;
    r1 = uuid.v4(null, new Uint8Array(16, 0));
    r2 = (new Buffer(r1)).toString('base64');
    pads = 0;
    while (r2.charAt(r2.length - pads - 1) === '=') {
      pads++;
    }
    r3 = r2.slice(0, r2.length - pads);
    r4 = r3.replace(/\//g, "_");
    r5 = r4.replace(/\+/g, "-");
    return response = {
      error: null,
      result: {
        __onmcid__: CIDS_TABLE.cname2cid.IRUT,
        value: r5
      }
    };
  };

}).call(this);
