// test-use-case-component-resolver-open-noop-namespace-N.js

var testModuleDependencies = require('./requires-dependencies');


var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();
var rootAddress = dataModel.address("*");
var testToken1 = rootAddress.address("namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD.namespaceChildE").implementation.getLastToken();
var testToken2 = rootAddress.address("namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD.namespaceExtensionPointE").implementation.getLastToken();

var testComponentResolverUseCase = testModuleDependencies.testComponentResolverUseCase;

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace N child on child...",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken1,
        parentDataReference: { namespaceRoot: { namespaceChildA: { namespaceChildB: { namespaceChildC: { namespaceChildD: { namespaceChildE: { cairn: true } } } } } } },
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 6,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":true}',
            parent: '{"namespaceRoot":{"namespaceChildA":{"namespaceChildB":{"namespaceChildC":{"namespaceChildD":{"namespaceChildE":{"cairn":true}}}}}}}',
            journal: '[]'
        }
    }
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace N child on child... (missing)",
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
    targetNamespace: "subnamespace N extension point on child...",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken2,
        parentDataReference: { namespaceRoot: { namespaceChildA: { namespaceChildB: { namespaceChildC: { namespaceChildD: { namespaceExtensionPointE: { cairn: true } } } } } } },
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 6,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":true}',
            parent: '{"namespaceRoot":{"namespaceChildA":{"namespaceChildB":{"namespaceChildC":{"namespaceChildD":{"namespaceExtensionPointE":{"cairn":true}}}}}}}',
            journal: '[]'
        }
    }
});

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "subnamespace N extension point on child... (missing)",
    inputOptions: {
        strategy: 'open',
        addressToken: testToken2,
        parentDataReference: {},
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});


