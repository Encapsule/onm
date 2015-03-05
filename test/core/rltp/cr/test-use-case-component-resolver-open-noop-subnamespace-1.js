// test-use-case-component-resolver-open-noop-subnamespace-1.js

var testModuleDependencies = require('./requires-dependencies');

var testComponentResolverUseCase = testModuleDependencies.testComponentResolverUseCase;
var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();

var rootAddress = dataModel.address("*");
var testToken1 = rootAddress.address("namespaceChildA").implementation.getLastToken();
var testToken2 = rootAddress.address("namespaceExtensionPointA").implementation.getLastToken();

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace child",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken1,
        parentDataReference: { namespaceRoot: { namespaceChildA: { cairn: true } } },
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 2,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":true}',
            parent: '{"namespaceRoot":{"namespaceChildA":{"cairn":true}}}',
            journal: '[]'
        }
    }
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace child (missing)",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken1,
        parentDataReference: {},
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace extension point",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken2,
        parentDataReference: { namespaceRoot: { namespaceExtensionPointA: { cairn: true } } },
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 2,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":true}',
            parent: '{"namespaceRoot":{"namespaceExtensionPointA":{"cairn":true}}}',
            journal: '[]'
        }
    }
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace extension point (missing)",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken2,
        parentDataReference: {},
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});

