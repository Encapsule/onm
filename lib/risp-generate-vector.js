
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
  var CIDS, RISP, VectorGenerators;

  CIDS = require('./cids');

  RISP = {};

  VectorGenerators = {
    lri: require('./risp-generate-vector-lri'),
    uri: require('./risp-generate-vector-uri')
  };


  /*
      request = {
          address: onm.Address reference
          format: string (one of "lri" or "uri")
      }
      response = {
          error: null or string explaining why result === null
          result: onm-format path xRI string
      }
   */

  RISP.generateVector = module.exports = function(request_) {
    var cidsResponse, errors, generatorResponse, inBreakScope, pathFormat, response, selectedVectorGenerator;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_.address != null) && request_.address)) {
        errors.unshift("Invalid request object missing required property 'address'.");
        break;
      }
      cidsResponse = CIDS.assertCNAME({
        ref: request_.address,
        cname: 'Address'
      });
      if (cidsResponse.error) {
        errors.unshift(cidsResponse.error);
        break;
      }
      pathFormat = request_.format;
      selectedVectorGenerator = VectorGenerators[pathFormat];
      if (!((selectedVectorGenerator != null) && selectedVectorGenerator)) {
        errors.unshift("Internal error. No registered vector generator for format '" + pathFormat + "'.");
        break;
      }
      generatorResponse = selectedVectorGenerator(request_);
      if (!generatorResponse.error) {
        response.result = generatorResponse.result;
      } else {
        errors.unshift(generatorResponse.error);
      }
    }
    if (errors.length) {
      errors.unshift("Vector generate failed:");
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
