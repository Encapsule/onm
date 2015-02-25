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

classRegistry = require '../common/onm-class-registry'
cids = classRegistry.ids


operationDescriptorArray = [

    {
        name: 'nsd-to-asm'
        inputTypes: [ cids.NSD ]
        outputType: cids.ASM
    }

    {
        name: 'nsd-to-ras'
        inputTypes: [ cids.NSD ]
        outputType: cids.RAS
    }

    {
        name: 'asm-to-ras'
        inputTypes: [ cids.ASM ]
        outputType: cids.RAS
    }

    {
        name: 'ras-to-asm'
        inputTypes: [ cids.RAS ]
        outputType: cids.ASM
    }

    {
        name: 'ris-to-ral-from-ras'
        inputTypes: [ cids.RAS, cids.RIS ]
        outputType: cids.RAL
    }

    {
        name: 'ris-to-nsd-from-ras'
        inputTypes: [ cids.RAS, cids.RIS ]
        outputType: cids.NSD
    }

    {
        name: 'ral-to-ris'
        inputTypes: [ cids.RAL ]
        outputType: cids.RIS
    }

    {
        name: 'ral-to-nsd'
        inputTypes: [ cids.RAL ]
        outputType: cids.NSD
    }

    {
        name: 'ral-to-ral-from-ris'
        inputTypes: [ cids.RAL, cids.RIS ]
        outputType: cids.RAL
    }

    {
        name: 'json-to-dao-from-ras'
        inputTypes: [ cids.RAS, cids.JSON ]
        outputType: cids.DAO
    }

    {
        name: 'dab-to-dao'
        inputTypes: [ cids.DAB ]
        outputType: cids.DAO
    }

    {
        name: 'doa-to-dab'
        inputTypes: [ cids.DAO ]
        outputType: cids.DAB
    }

    {
        name: 'ris-to-ral-from-dao'
        inputTypes: [ cids.DAO, cids.RIS ]
        outputType: cids.RAL
    }

    {
        name: 'ral-to-rlp-from-dao'
        inputTypes: [ cids.DAO, cids.RAL ]
        outputType: cids.RLP
    }

    {
        name: 'ral-to-rlp-from-dao-ris'
        inputTypes: [ cids.DAO, cids.RAL, cids.RIS ]
        outputType: cids.RLP
    }

    {
       name: 'ral-to-rlp-from-dao-data'
       inputTypes: [ cids.DAO, cids.RAL, cids.DATA ]
       outputType: cids.RLP
    }

    {
        name: 'ral-to-rlp-from-dao-json'
        inputTypes: [ cids.DAO, cids.RAL, cids.JSON ]
        outputType: cids.RLP
    }

    {
        name: 'ral-to-rlp-from-doa-ris-data'
        inputTypes: [ cids.DAO, cids.RAL, cids.RIS, cids.DATA ]
        outputType: cids.RLP
    }

    {
        name: 'ral-to-rlp-from-doa-ris-json'
        inputTypes: [ cids.DAO, cids.RAL, cids.RIS, cids.JSON ]
        outputType: cids.RLP
    }

];


operationMap = {}
operationArray = []

for operationDescriptor in operationDescriptorArray
    opTokens = operationDescriptor.inputTypes.sort (a_, b_) -> a_.localeCompare(b_)
    opId = "#{operationDescriptor.outputType}<=#{opTokens.join ':'}"
    mapEntry = operationMap[opId]
    if mapEntry? and mapEntry
        throw new Error "Duplicate operation ID '#{operationDescriptor.name}'."
    operationMap[opId] = operationDescriptor


console.log "============================================================================"
console.log "There are currently #{(Object.keys operationMap).length} onm core operations defined."
console.log JSON.stringify operationMap, undefined, 4

    







            