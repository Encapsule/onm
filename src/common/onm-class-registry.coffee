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

registry = module.exports = {}

# TODO: The binary representation of these can be base64 encoded to save a few bytes of heap.

registry.ids =
    # v0.3 public API object identifiers
    Model:      '57347d22-cefb-4b5d-a2ed-1732a764fe6b'
    Address:    '075d9b07-c612-416e-a0b2-e839c8677de7'
    Store:      'a5fc2cff-a105-4750-b2ed-8b7b11f73af5'
    Namespace:  '62286994-befa-4ef5-8f39-8eaaf890fabf'

    # v1.0 core object identifiers
    NSD:        'e544054c-be40-4130-ab2a-903c2861cc7f'
    ASM:        'ba9c687c-860a-4f18-9b03-f6d42d0704fb'
    RAS:        'ef0613fb-dbb0-493c-8e4f-31bdad5dbf48'
    DAO:        'f74ea6d3-541c-432b-b925-5faa0bc8eb6e'
    RAL:        'ab49f85e-cd32-4e27-9006-8d8e54f4a8b6'
    RLP:        '6e064cd9-2d65-4974-8903-d9860fed85ff'
    # ^--- 1st class onm core objects with constructors v--- Disciminating wrappers for JavaScript types
    RIS:        '9e84b41a-7bce-4620-ad7a-b208aecabb11' # Wraps a RIS-encoded string
    DAB:        '43e81405-722b-4c9e-8a67-c6fa82869bc0' # Wraps a DAB-encoded string
    JSON:       '502b7bf1-c6f6-473c-a748-9b5d7e22d9fc' # Wraps a JSON-encoded string
    DATA:       'b9c2634c-3497-436b-8c12-f6647de599d1' # Wraps an Object convertible to JSON
    
registry.lookup = {}
for classname of registry.ids
    classid = registry.ids[classname]
    registry.lookup[classid] = classname

        

    