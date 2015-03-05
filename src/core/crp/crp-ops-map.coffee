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

cnameTable = require '../cids/cids-table'


operationMap = module.exports = {}

operationDescriptorArray = [

    {
        name: 'nsd-to-asm'
        inputTypes: [ cnameTable.cname2cid.NSD ]
        outputType: cnameTable.cname2cid.ASM
    }

    {
        name: 'nsd-to-ras'
        inputTypes: [ cnameTable.cname2cid.NSD ]
        outputType: cnameTable.cname2cid.RAS
    }

    {
        name: 'asm-to-ras'
        inputTypes: [ cnameTable.cname2cid.ASM ]
        outputType: cnameTable.cname2cid.RAS
    }

    {
        name: 'ras-to-asm'
        inputTypes: [ cnameTable.cname2cid.RAS ]
        outputType: cnameTable.cname2cid.ASM
    }

    {
        name: 'ris-to-ral-from-ras'
        inputTypes: [ cnameTable.cname2cid.RAS, cnameTable.cname2cid.RIS ]
        outputType: cnameTable.cname2cid.RAL
    }

    {
        name: 'ris-to-nsd-from-ras'
        inputTypes: [ cnameTable.cname2cid.RAS, cnameTable.cname2cid.RIS ]
        outputType: cnameTable.cname2cid.NSD
    }

    {
        name: 'ral-to-ris'
        inputTypes: [ cnameTable.cname2cid.RAL ]
        outputType: cnameTable.cname2cid.RIS
    }

    {
        name: 'ral-to-nsd'
        inputTypes: [ cnameTable.cname2cid.RAL ]
        outputType: cnameTable.cname2cid.NSD
    }

    {
        name: 'ral-to-ral-from-ris'
        inputTypes: [ cnameTable.cname2cid.RAL, cnameTable.cname2cid.RIS ]
        outputType: cnameTable.cname2cid.RAL
    }

    {
        name: 'json-to-dao-from-ras'
        inputTypes: [ cnameTable.cname2cid.RAS, cnameTable.cname2cid.JSON ]
        outputType: cnameTable.cname2cid.DAO
    }

    {
        name: 'dab-to-dao'
        inputTypes: [ cnameTable.cname2cid.DAB ]
        outputType: cnameTable.cname2cid.DAO
    }

    {
        name: 'doa-to-dab'
        inputTypes: [ cnameTable.cname2cid.DAO ]
        outputType: cnameTable.cname2cid.DAB
    }

    {
        name: 'ris-to-ral-from-dao'
        inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RIS ]
        outputType: cnameTable.cname2cid.RAL
    }

    {
        name: 'ral-to-rlp-from-dao'
        inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RAL ]
        outputType: cnameTable.cname2cid.RLP
    }

    {
        name: 'ral-to-rlp-from-dao-ris'
        inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RAL, cnameTable.cname2cid.RIS ]
        outputType: cnameTable.cname2cid.RLP
    }

    {
       name: 'ral-to-rlp-from-dao-data'
       inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RAL, cnameTable.cname2cid.DATA ]
       outputType: cnameTable.cname2cid.RLP
    }

    {
        name: 'ral-to-rlp-from-dao-json'
        inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RAL, cnameTable.cname2cid.JSON ]
        outputType: cnameTable.cname2cid.RLP
    }

    {
        name: 'ral-to-rlp-from-doa-ris-data'
        inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RAL, cnameTable.cname2cid.RIS, cnameTable.cname2cid.DATA ]
        outputType: cnameTable.cname2cid.RLP
    }

    {
        name: 'ral-to-rlp-from-doa-ris-json'
        inputTypes: [ cnameTable.cname2cid.DAO, cnameTable.cname2cid.RAL, cnameTable.cname2cid.RIS, cnameTable.cname2cid.JSON ]
        outputType: cnameTable.cname2cid.RLP
    }

];


for operationDescriptor in operationDescriptorArray
    opTokens = operationDescriptor.inputTypes.sort (a_, b_) -> a_.localeCompare(b_)
    opId = "#{operationDescriptor.outputType}<=#{opTokens.join ':'}"
    mapEntry = operationMap[opId]
    if mapEntry? and mapEntry
        throw new Error "Duplicate operation '#{operationDescriptor.name}' with opID='#{opId}'."
    operationMap[opId] = operationDescriptor


console.log "============================================================================"
console.log "There are currently #{(Object.keys operationMap).length} onm core operations defined."
console.log JSON.stringify operationMap, undefined, 4

    







            