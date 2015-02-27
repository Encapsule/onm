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

# Constant Look-Up Tables
cluts =
    # constants
    jsCode2jsTypeStringVector: [ '[object Undefined]', '[object Null]', '[object Boolean]', '[object String]', '[object Number]', '[object Object]', '[object Array]', '[object Function]' ]
    jsCode2jsMonikerVector:    [ 'jsUndefined',        'jsNull',       'jsBoolean',        'jsString',        'jsNumber',        'jsObject',         'jsArray',        'jsFunction' ]
    jsCode2jsonMonikerVector: [ null,                 'jsonNull',     'jsonBoolean',      'jsonString',      'jsonNumber',      'jsonObject',       'jsonArray',      null ]
    # derived on module load
    jsMoniker2jsCodeHash: {}
    jsTypeString2jsCodeHash: {}
    jsMoniker2jsTypeStringHash: {}
    jsTypeString2jsMonikerHash: {}
    jsonMoniker2jsCodeHash: {}

# Populate derived LUTS.cluts
jsCode = 0
while jsCode < cluts.vectorLength
    jsMoniker =     cluts.jsCode2jsMonikerVector[jsCode]
    jsTypeString =  cluts.jsCode2jsTypeStringVector[jsCode]
    jsonMoniker =   cluts.jsCode2jsonMonikerVector[jsCode]
    cluts.jsMoniker2jsCodeHash[jsMoniker] =          jsCode
    cluts.jsTypeString2jsCodeHash[jsTypeString] =    jsCode
    cluts.jsMoniker2jsTypeStringHash[jsMoniker] =    jsTypeString
    cluts.jsTypeString2jsMonikerHash[jsTypeString] = jsMoniker
    if jsonMoniker? and jsonMoniker
        cluts.jsonMoniker2jsCodeHash[jsonMoniker] = jsCode
    jsCode++

# Fixup the CLUTS and serialize to single-line JSON string
cluts.vectorLength = cluts.jsCode2jsTypeStringVector.length

# Return the result a single line of JSON-encoded data.
module.exports = JSON.stringify cluts



