
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
  var LUTS, NTCL;

  NTCL = module.exports = {};

  LUTS = require('./ntcl-luts');


  /*
  
      NCTL implements 5 primary ingress functions for JavaScript references that
      perform coversion of the reference's JavaScript value to one of five different
      simple entity identification formats.
  
      Once a client has a value in one of the 5 NTCL formats, 20 = 5 * (5 - 1)
      functions are provided for converting a value in in format X to format Y.
  
      The purpose of all this abstraction is first and foremost consistency.
  
      In more detail, the ingress pattern is used to normalize the identification
      and validation of external data sources. And the conversion matrix is used
      by all onm core subsystems for operations specified in terms of NCTL-defined
      entity identifiers attached to NSD's and their derived ASM's.
  
      Below: 
      Codes are integer ordinals. Their purpose is to save memory & comparison cycles.
      Type strings are used to validate external data sources based on comparison with Object.prototype.toString.call
      Monikers are memorable strings for developers starting with 'js' or 'json' prefix.
   */


  /*
      => CONVERT JAVASCRIPT REFERENCE TO:
      <- A. onm JavaScript type code ordinal
      <- B. JavaScript type string (i.e. Object.prototype.toString.call)
      <- C. onm JavaScript type moniker string
      <- D. onm JSON value type code
      <- E. onm JSON value type moniker string
   */

  NTCL.jsRef2jsCode = function(ref_) {
    return LUTS.jsString2Code[Object.prototype.toString.call(ref_)];
  };

  NTCL.jsRef2jsMoniker = function(ref_) {
    return LUTS.jsString2Moniker(Object.prototype.toString.call(ref_));
  };

  NTCL.jsRef2jsTypeString = function(ref_) {
    return Object.prototype.toString.call(ref_);
  };

  NTCL.jsRef2jsonCode = function(ref_) {
    var jsCode, jsTypeSupported;
    jsCode = NTCL.jsRef2jsCode(ref_);
    jsTypeSupported = LUTS.jsonMonikers[jsCode];
    if (!((jsTypeSupported != null) && jsTypeSupported)) {
      return void 0;
    }
    return jsCode + LUTS.values;
  };

  NTCL.jsRef2JsonMoniker = function(ref_) {
    var jsonCode;
    jsonCode = NTCL.jsRef2jsonCode(ref_);
    if (!((jsonCode != null) && jsonCode)) {
      return void 0;
    }
    return LUTS.jsonMonikers[jsonCode - LUTS.values];
  };


  /*
      => A. CONVERT ONM JAVASCRIPT TYPE CODE => B, C, D, E
      <- B. JavaScript type string (i.e. Object.prototype.toString.call)
      <- C. onm JavaScript type moniker string
      <- D. onm JSON value type code
      <- E. onm JSON value type moniker string
   */

  NTCL.jsCode2jsTypeString = function(jsCode_) {
    return LUTS.jsTypeStrings[jsCode_];
  };

  NTCL.jsCode2jsMoniker = function(jsCode_) {
    return LUTS.jsMonikers[jsCode_];
  };

  NTCL.jsCode2jsonCode = function(jsCode_) {
    var jsCode, jsTypeSupported;
    jsCode = jsCode_ % LUTS.values;
    jsTypeSupported = LUTS.jsonMonikers[jsCode];
    if (!((jsTypeSupported != null) && jsTypeSupported)) {
      return void 0;
    }
    return jsCode + LUTS.values;
  };

  NTCL.jsCode2jsonMoniker = function(code_) {
    var jsonCode;
    jsonCode = NTCL.jsCode2jsonCode(code_);
    if (!((jsonCode != null) && jsonCode)) {
      return void 0;
    }
    return LUTS.jsonMonikers[jsonCode - LUTS.values];
  };


  /*
      <- A. onm JavaScript type code ordinal
      => B. CONVERT JAVASCRIPT TYPE STRING => A, C, D, E
      <- C. onm JavaScript type moniker string
      <- D. onm JSON value type code
      <- E. onm JSON value type moniker string
   */

  NTCL.jsTypeString2jsCode = function(string_) {
    return LUTS.jsString2jsCode[string_];
  };

  NTCL.jsTypeString2jsMoniker = function(string_) {
    return LUTS.jsString2Moniker[string_];
  };

  NTCL.jsTypeString2jsonCode = function(string_) {
    var jsCode, jsonCode;
    jsCode = NTCL.jsTypeString2jsCode(string_);
    jsonCode = NTCL.jsCode2jsonCode(jsCode);
    if (!((jsonCode != null) && jsonCode)) {
      return void 0;
    }
    return jsonCode;
  };

  NTCL.jsTypeString2jsonMoniker = function(string_) {
    var jsonCode;
    jsonCode = NTCL.jsTypeString2jsonCode(string_);
    if (!((jsonCode != null) && jsonCode)) {
      return void 0;
    }
    return LUTS.jsonMonikers[NTCL.jsonCode2jsCode(jsonCode)];
  };


  /*
      <- A. onm JavaScript type code ordinal
      <- B. JavaScript type string (i.e. Object.prototype.toString.call)
      => C. CONVERT ONM JAVASCRIPT TYPE MONIKER => A, B, D, E
      <- D. onm JSON value type code
      <- E. onm JSON value type moniker string
   */

  NTCL.jsMoniker2jsCode = function(moniker_) {
    return LUTS.jsMoniker2Code[moniker_];
  };

  NTCL.jsMoniker2jsString = function(moniker_) {
    return LUTS.jsMoniker2String[moniker_];
  };

  NTCL.jsMoniker2jsonCode = function(moniker_) {
    return NTCL.jsCode2jsonCode(NTCL.jsMoniker2jsCode(moniker_));
  };

  NTCL.jsMoniker2jsonMoniker = function(moniker_) {
    var jsCode, jsonMoniker;
    jsCode = NTCL.jsMoniker2jsCode(moniker_);
    jsonMoniker = LUTS.jsonMonikers[jsCode];
    if (!((jsonMoniker != null) && jsonMoniker)) {
      return void 0;
    }
    return jsonMoniker;
  };


  /*
      <- A. onm JavaScript type code ordinal
      <- B. JavaScript type string (i.e. Object.prototype.toString.call)
      <- C. onm JavaScript type moniker string
      => D. CONVERT ONM JSON VALUE TYPE CODE => A, B, C, E
      <- E. onm JSON value type moniker string
   */

  NTCL.jsonCode2jsCode = function(jsonCode_) {
    return jsonCode_ - LUTS.values;
  };

  NTCL.jsonCode2jsTypeString = function(jsonCode_) {
    return NTCL.jsCode2jsTypeString(NTCL.jsonCode2jsCode(jsonCode_));
  };

  NTCL.jsonCode2jsMoniker = function(jsonCode_) {
    return NTCL.jsCode2jsMoniker(NTCL.jsonCode2jsCode(jsonCode_));
  };

  NTCL.jsonCode2jsonMoniker = function(jsonCode_) {
    return LUTS.jsonMonikers[NTCL.jsonCode2jsCode(jsonCode_)];
  };


  /*
      <- A. onm JavaScript type code ordinal
      <- B. JavaScript type string (i.e. Object.prototype.toString.call)
      <- C. onm JavaScript type moniker string
      <- D. onm JSON value type code
      => E. CONVERT ONM JSON VALUE TYPE MONIKER => A, B, C, D, E
   */

  NTCL.jsonMoniker2jsCode = function(moniker_) {
    return NTCL.jsonCode2jsCode(LUTS.jsonMoniker2Code);
  };

  NTCL.jsonMoniker2jsTypeString = function(moniker_) {
    return LUTS.jsTypeStrings[NTCL.jsonCode2jsCode(LUTS.jsonMoniker2Code[moniker_])];
  };

  NTCL.jsonMoniker2jsMoniker = function(moniker_) {
    return LUTS.jsMonikers[NTCL.jsonCode2jsCode(LUTS.jsonMoniker2Code)];
  };

  NTCL.jsonMoniker2jsonCode = function(moniker_) {};

}).call(this);
