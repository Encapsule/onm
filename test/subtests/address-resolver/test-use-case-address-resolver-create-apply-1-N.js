// test-use-case-address-resolver-open-apply-1-N.js
//

var onm = require('../../../index');
var testAddressResolverUseCase = require('./test-core-address-resolver');

var dataModelDeclaration = {
    semanticBindings: {
        componentKeyGenerator: 'internalLuid'
    },
    jsonTag: 'testData',
    subNamespaces: [
        {
            namespaceType: 'extensionPoint',
            jsonTag: 'hashtable',
            componentArchetype: {
                namespaceType: 'component',
                jsonTag: 'testRecord',
                subNamespaces: [
                    {
                        namespaceType: 'extensionPoint',
                        jsonTag: 'hashtable',
                        componentArchetypePath: 'testData.hashtable.testRecord'
                    }
                ]
            }
        }
    ]
};

var dataModel = new onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();
var rootAddress = dataModel.createRootAddress();
var testAddress = rootAddress.createSubpathAddress('hashtable.testRecord');
for (var token in testAddress.implementation.tokenVector) {
    testAddress.implementation.tokenVector[token].key = 'test';
}

testResult = testAddressResolverUseCase({
    strategyName: "create",
    operationName: "apply data-N",
    targetNamespace: "subcomponent-1",
    inputOptions: {
        strategy: "create",
        address: testAddress,
        parentDataReference: {},
        semanticBindingsReference: dataModel.getSemanticBindings(),
        propertyAssignmentObject: {
            testKeyValue: { test: "test data value in root namespace" },
            hashtable: {
                object0: { cairn: "should land in subobject above the resolved named object." },
                object2: { cairn: "should land in subobject above the resolved named object." },
                object3: { cairn: "should land in subobject above the resolved named object." }
            }
        }
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedComponentCount: 2,
        dataChangeEventJournalCount: 8,
        JSON: {
            namespace: '{"testKeyValue":{"test":"test data value in root namespace"},"hashtable":{"object0":{"cairn":"should land in subobject above the resolved named object."},"object2":{"cairn":"should land in subobject above the resolved named object."},"object3":{"cairn":"should land in subobject above the resolved named object."}}}',
            parent: '{"testData":{"hashtable":{"test":{"testKeyValue":{"test":"test data value in root namespace"},"hashtable":{"object0":{"cairn":"should land in subobject above the resolved named object."},"object2":{"cairn":"should land in subobject above the resolved named object."},"object3":{"cairn":"should land in subobject above the resolved named object."}}}}}}',
            journal: '[{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"root","namespaceModelPath":"testData","namespaceModelId":0,"key":"testData"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"extensionPoint","namespaceModelPath":"testData.hashtable","namespaceModelId":1,"key":"hashtable"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"component","namespaceModelPath":"testData.hashtable.testRecord","namespaceModelId":2,"key":"test"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"testKeyValue","model":false,"value":"{\\"test\\":\\"test data value in root namespace\\"}","source":"data"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"extensionPoint","namespaceModelPath":"testData.hashtable.testRecord.hashtable","namespaceModelId":3,"key":"hashtable"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"object0","model":false,"value":"{\\"cairn\\":\\"should land in subobject above the resolved named object.\\"}","source":"data"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"object2","model":false,"value":"{\\"cairn\\":\\"should land in subobject above the resolved named object.\\"}","source":"data"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"object3","model":false,"value":"{\\"cairn\\":\\"should land in subobject above the resolved named object.\\"}","source":"data"}}]'
        }
    }
});



