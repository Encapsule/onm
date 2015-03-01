// test-use-case-component-resolver-open-noop-namespace-2.js

var testModuleDependencies = require('./requires-dependencies');

var testComponentResolverUseCase = testModuleDependencies.testComponentResolverUseCase;

var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();

var rootAddress = dataModel.address("*");
var testToken1 = rootAddress.address("namespaceChildA.namespaceChildB").implementation.getLastToken();
var testToken2 = rootAddress.address("namespaceChildA.namespaceExtensionPointB").implementation.getLastToken();

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace 2 child on child",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken1,
        parentDataReference: { namespaceRoot: { namespaceChildA: { namespaceChildB: { cairn: true } } } },
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 3,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":true}',
            parent: '{"namespaceRoot":{"namespaceChildA":{"namespaceChildB":{"cairn":true}}}}',
            journal: '[]'
        }
    }
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace 2 child on child (missing)",
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
    targetNamespace: "subnamespace 2 extension point on child",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken2,
        parentDataReference: { namespaceRoot: { namespaceChildA: { namespaceExtensionPointB: { cairn: true } } } },
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 3,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":true}',
            parent: '{"namespaceRoot":{"namespaceChildA":{"namespaceExtensionPointB":{"cairn":true}}}}',
            journal: '[]'
        }
    }
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace 2 extension point on child (missing)",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken2,
        parentDataReference: {},
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});

