
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
  var CRP, onm;

  CRP = require('./crp');


  /*
  CIDS = require './cids'
  DAOS = require './doas'
  JNSP = require './jnsp'
  RASP = require './rasp'
  RISP = require './risp'
  RLTP = require './rltp'
   */

  onm = module.exports = {};


  /*
      request = {
          verb: required string indicating the class of operation to perform
          inputs: optional array of zero or more onm core object references
          outputType: required string indicating the onm class type of response.result
          options: possibly optional, sub-request-format-specific options object
      }
      response: {
          error: null // or a string explaining why result is null
          result: null // to indicate an error or the requested onm core object if successful
      }
   */

  onm.request = function(request_) {
    var bindResponse, dispatchResponse, errors, inBreakScope, normalizeResponse, response;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      normalizeResponse = CRP.normalize(request_);
      if (normalizeResponse.error) {
        errors.unshift(normalizeResponse.error);
        break;
      }
      bindResponse = CRP.bindop(normalizeResponse.result);
      if (bindResponse.error) {
        errors.unshift(bindResponse.error);
        break;
      }
      dispatchResponse = CRP.dispatch(bindResponse.result);
      if (dispatchResponse.error) {
        errors.unshift(dispatchResponse.error);
        break;
      }
      response.result = dispatchResponse.result;
    }
    if (errors.length) {
      errors.unshift("onm.request failed:");
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
