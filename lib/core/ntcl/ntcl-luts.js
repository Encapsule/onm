
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
  var LUTS, NTCL, index, jsMoniker, jsTypeString, jsonMoniker;

  NTCL = {};

  LUTS = NTCL.LUTS = module.exports = {};

  LUTS.dimensions = 4;

  LUTS.values = 8;

  LUTS.jsTypeStrings = ['[object Undefined]', '[object Null]', '[object Boolean]', '[object String]', '[object Number]', '[object Object]', '[object Array]', '[object Function]'];

  LUTS.jsMonikers = ['jsUndefined', 'jsNull', 'jsBoolean', 'jsString', 'jsNumber', 'jsObject', 'jsArray', 'jsFunction'];

  LUTS.jsonMonikers = [null, 'jsonNull', 'jsonBoolean', 'jsonString', 'jsonNumber', 'jsonObject', 'jsonArray', null];

  LUTS.jsMoniker2Code = {};

  LUTS.jsTypeString2Code = {};

  LUTS.jsMoniker2String = {};

  LUTS.jsTypeString2Moniker = {};

  LUTS.jsonMoniker2Code = {};

  index = 0;

  while (index < LUTS.values) {
    jsMoniker = LUTS.jsMonikers[index];
    jsTypeString = LUTS.jsTypeStrings[index];
    jsonMoniker = LUTS.jsonMonikers[index];
    console.log("" + index + ": " + jsMoniker + " " + jsString + " " + jsonMoniker);
    LUTS.jsMoniker2Code[jsMoniker] = index;
    LUTS.jsTypeString2Code[jsTypeString] = index;
    LUTS.jsMoniker2TypeString[jsMoniker] = jsTypeString;
    LUTS.jsTypeString2Moniker[jsTypeString] = jsMoniker;
    if ((jsonMoniker != null) && jsonMoniker) {
      LUTS.jsonMoniker2Code[jsonMoniker] = index;
    }
    index++;
  }

  console.log("Exit w/index = " + index);

}).call(this);
