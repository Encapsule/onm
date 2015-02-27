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

LUTS = module.exports = {}

# Alternately, to rebuild the CLUTS JSON string, require('./ntcl-cluts-generator') instead.

CLUTS = JSON.parse '{"jsCode2jsTypeStringVector":["[object Undefined]","[object Null]","[object Boolean]","[object String]","[object Number]","[object Object]","[object Array]","[object Function]"],"jsCode2jsMonikerVector":["jsUndefined","jsNull","jsBoolean","jsString","jsNumber","jsObject","jsArray","jsFunction"],"jsCode2jsonMonikerVector":[null,"jsonNull","jsonBoolean","jsonString","jsonNumber","jsonObject","jsonArray",null],"jsMoniker2jsCodeHash":{"jsUndefined":0,"jsNull":1,"jsBoolean":2,"jsString":3,"jsNumber":4,"jsObject":5,"jsArray":6,"jsFunction":7},"jsTypeString2jsCodeHash":{"[object Undefined]":0,"[object Null]":1,"[object Boolean]":2,"[object String]":3,"[object Number]":4,"[object Object]":5,"[object Array]":6,"[object Function]":7},"jsMoniker2jsTypeStringHash":{"jsUndefined":"[object Undefined]","jsNull":"[object Null]","jsBoolean":"[object Boolean]","jsString":"[object String]","jsNumber":"[object Number]","jsObject":"[object Object]","jsArray":"[object Array]","jsFunction":"[object Function]"},"jsTypeString2jsMonikerHash":{"[object Undefined]":"jsUndefined","[object Null]":"jsNull","[object Boolean]":"jsBoolean","[object String]":"jsString","[object Number]":"jsNumber","[object Object]":"jsObject","[object Array]":"jsArray","[object Function]":"jsFunction"},"jsonMoniker2jsCodeHash":{"jsonNull":1,"jsonBoolean":2,"jsonString":3,"jsonNumber":4,"jsonObject":5,"jsonArray":6},"vectorLength":8}'

Object.freeze CLUTS

LUTS.cluts = CLUTS
