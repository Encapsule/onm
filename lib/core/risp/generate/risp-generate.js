
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
  var classRegistry, xRIP_Generator, xRIP_Generators, xRIP_GeneratorsByFormat;

  classRegistry = require('../../cids/cids');

  xRIP_Generators = {
    path: require('./risp-generate-path'),
    vector: require('./risp-generate-vector')
  };

  xRIP_GeneratorsByFormat = {
    'readable': xRIP_Generators.path,
    'hash': xRIP_Generators.path,
    'lri': xRIP_Generators.vector,
    'uri': xRIP_Generators.vector
  };


  /*
      request = {
          address: reference to onm.Address to convert
          format: string (one of 'readable', 'hash', 'lri', or 'uri')
      }
      response = {
          error: null or string explaining why result === null
          result: onm-format path xRI string
      }
   */

  xRIP_Generator = module.exports = function(request_) {
    var errors, format, formatType, generatorResponse, inBreakScope, response, selectedGenerator;
    errors = [];
    response = {
      error: null,
      result: null
    };
    inBreakScope = false;
    while (!inBreakScope) {
      inBreakScope = true;
      if (!((request_ != null) && request_)) {
        errors.unshift("Missing required request object in-parameter.");
        break;
      }
      if (!((request_.address != null) && request_.address)) {
        errors.unshift("Invalid request object missing required property 'address'.");
        break;
      }
      if (classRegistry.lookup[request_.address.onmClassType] !== 'Address') {
        errors.unshift("Invalid request object 'address' value type. Expected reference to onm.Address.");
        break;
      }
      if (!((request_.format != null) && request_.format)) {
        errors.unshift("Invalid request object missing required property 'format'.");
        break;
      }
      formatType = Object.prototype.toString.call(request_.format);
      if (formatType !== '[object String]') {
        errors.unshift("Invalid request object 'format' value type. Expected reference to '[object String]'.");
        break;
      }
      format = request_.format;
      selectedGenerator = xRIP_GeneratorsByFormat[format];
      if (!((selectedGenerator != null) && selectedGenerator)) {
        errors.unshift("Sorry. No registered xRI generator for format '" + format + "'.");
        break;
      }
      generatorResponse = selectedGenerator(request_);
      if (!generatorResponse.error) {
        response.result = generatorResponse.result;
      } else {
        errors.unshift(generatorResponse.error);
      }
    }
    if (errors.length) {
      errors.unshift("xRIP_Generator failed:");
      response.error = errors.join(' ');
    }
    return response;
  };

}).call(this);
