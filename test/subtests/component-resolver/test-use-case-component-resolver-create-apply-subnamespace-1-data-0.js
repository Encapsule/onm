// test-use-case-component-resolver-create-apply-subnamespace-1-data-0.js

var onm = require('../../../index');
var testComponentResolverUseCase = require('./test-core-component-resolver');
var dataModelDeclaration = require('../../fixture/named-object-resolve-test-data-model');
var dataModel = new onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();
var childToken = dataModel.address("namespaceRoot.namespaceChildA").implementation.getLastToken();

var testComponentResolverUseCase = require('./test-core-component-resolver');

testComponentResolverUseCase({
    strategyName: "create",
    operationName: "apply data-0",
    targetNamespace: "subnamespace-1",
    inputOptions: {
        strategy: 'create',
        addressToken: childToken,
        parentDataReference: {},
        propertyAssignmentObject: {
            a: "d311e971267d84f0bbfd448554cc1734",
            a_: "0317649aa051ac3df9a804bc54cc176a",
            cairn: "This should land in namespaceChildA!"
        },
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 2,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 47,
        JSON: {
            namespace: '{"a":"d311e971267d84f0bbfd448554cc1734","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","a_":"0317649aa051ac3df9a804bc54cc176a","cairn":"This should land in namespaceChildA!","namespaceExtensionPointB":{},"namespaceChildB":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceChildC":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceChildD":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceExtensionPointE":{},"namespaceChildE":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f"}}}}}',
            parent: '{"namespaceRoot":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceExtensionPointA":{},"namespaceChildA":{"a":"d311e971267d84f0bbfd448554cc1734","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","a_":"0317649aa051ac3df9a804bc54cc176a","cairn":"This should land in namespaceChildA!","namespaceExtensionPointB":{},"namespaceChildB":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceChildC":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceChildD":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f","namespaceExtensionPointE":{},"namespaceChildE":{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f"}}}}}}}',
            journal: '[{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"root","namespaceModelPath":"namespaceRoot","namespaceModelId":0,"key":"namespaceRoot"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a","model":true,"value":"\\"default a\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"b","model":true,"value":"\\"default b\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"c","model":true,"value":"\\"default c\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"d","model":true,"value":"\\"default d\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"e","model":true,"value":"\\"default e\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"f","model":true,"value":"\\"default f\\"","source":"model"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"child","namespaceModelPath":"namespaceRoot.namespaceChildA","namespaceModelId":1,"key":"namespaceChildA"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a","model":true,"value":"\\"d311e971267d84f0bbfd448554cc1734\\"","source":"data"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"b","model":true,"value":"\\"default b\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"c","model":true,"value":"\\"default c\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"d","model":true,"value":"\\"default d\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"e","model":true,"value":"\\"default e\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"f","model":true,"value":"\\"default f\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a_","model":false,"value":"\\"0317649aa051ac3df9a804bc54cc176a\\"","source":"data"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"cairn","model":false,"value":"\\"This should land in namespaceChildA!\\"","source":"data"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"child","namespaceModelPath":"namespaceRoot.namespaceChildA.namespaceChildB","namespaceModelId":2,"key":"namespaceChildB"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a","model":true,"value":"\\"default a\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"b","model":true,"value":"\\"default b\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"c","model":true,"value":"\\"default c\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"d","model":true,"value":"\\"default d\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"e","model":true,"value":"\\"default e\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"f","model":true,"value":"\\"default f\\"","source":"model"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"child","namespaceModelPath":"namespaceRoot.namespaceChildA.namespaceChildB.namespaceChildC","namespaceModelId":3,"key":"namespaceChildC"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a","model":true,"value":"\\"default a\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"b","model":true,"value":"\\"default b\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"c","model":true,"value":"\\"default c\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"d","model":true,"value":"\\"default d\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"e","model":true,"value":"\\"default e\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"f","model":true,"value":"\\"default f\\"","source":"model"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"child","namespaceModelPath":"namespaceRoot.namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD","namespaceModelId":4,"key":"namespaceChildD"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a","model":true,"value":"\\"default a\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"b","model":true,"value":"\\"default b\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"c","model":true,"value":"\\"default c\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"d","model":true,"value":"\\"default d\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"e","model":true,"value":"\\"default e\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"f","model":true,"value":"\\"default f\\"","source":"model"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"child","namespaceModelPath":"namespaceRoot.namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD.namespaceChildE","namespaceModelId":5,"key":"namespaceChildE"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"a","model":true,"value":"\\"default a\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"b","model":true,"value":"\\"default b\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"c","model":true,"value":"\\"default c\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"d","model":true,"value":"\\"default d\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"e","model":true,"value":"\\"default e\\"","source":"model"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"f","model":true,"value":"\\"default f\\"","source":"model"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"extensionPoint","namespaceModelPath":"namespaceRoot.namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD.namespaceExtensionPointE","namespaceModelId":6,"key":"namespaceExtensionPointE"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"extensionPoint","namespaceModelPath":"namespaceRoot.namespaceChildA.namespaceExtensionPointB","namespaceModelId":8,"key":"namespaceExtensionPointB"}},{"layer":"namedObject","event":"namedObjectCreated","eventData":{"namespaceType":"extensionPoint","namespaceModelPath":"namespaceRoot.namespaceExtensionPointA","namespaceModelId":11,"key":"namespaceExtensionPointA"}}]'
        }
    }
});

