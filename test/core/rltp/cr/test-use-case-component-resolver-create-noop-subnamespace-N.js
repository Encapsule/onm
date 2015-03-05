// test-use-case-component-resolver-create-noop-subnamespace-N.js

var testModuleDependencies = require('./requires-dependencies');

var testComponentResolverUseCase = testModuleDependencies.testComponentResolverUseCase;
var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();

var rootAddress = dataModel.address("*");
var testToken1 = rootAddress.address("namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD.namespaceChildE").implementation.getLastToken();
var testToken2 = rootAddress.address("namespaceChildA.namespaceChildB.namespaceChildC.namespaceChildD.namespaceExtensionPointE").implementation.getLastToken();

var expectedResults = {
    rootNamespaceDefaultConstructionData:   require('./expected-results/expected-results-root-component-default-construction-data'),
    rootNamespaceDefaultConstructionEvents: require('./expected-results/expected-results-root-component-default-construction-events')
};

testComponentResolverUseCase({
    strategyName: "create",
    operationName: "noop",
    targetNamespace: "subnamespace child",
    inputOptions: {
        strategy: 'create',
        addressToken: testToken1,
        parentDataReference: {},
        propertyOptionsObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 6,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 45,
        JSON: {
            namespace: '{"a":"default a","b":"default b","c":"default c","d":"default d","e":"default e","f":"default f"}',
            parent: expectedResults.rootNamespaceDefaultConstructionData,
            journal: expectedResults.rootNamespaceDefaultConstructionEvents
        }
    }
});

testComponentResolverUseCase({
    strategyName: "create",
    operationName: "noop",
    targetNamespace: "subnamespace child (root already exists)",
    inputOptions: {
        strategy: 'create',
        addressToken: testToken1,
        parentDataReference: { namespaceRoot: { cairn: true } },
        propertyOptionsObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});

testComponentResolverUseCase({
    strategyName: "create",
    operationName: "noop",
    targetNamespace: "subnamespace extension point",
    inputOptions: {
        strategy: 'create',
        addressToken: testToken2,
        parentDataReference: {},
        propertyOptionsObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 6,
        pendingSubcomponentCount: 0,
        dataChangeEventJournalCount: 45,
        JSON: {
            namespace: '{}',
            parent: expectedResults.rootNamespaceDefaultConstructionData,
            journal: expectedResults.rootNamespaceDefaultConstructionEvents
        }
    }
});

testComponentResolverUseCase({
    strategyName: "create",
    operationName: "noop",
    targetNamespace: "subnamespace extension point (root already exists)",
    inputOptions: {
        strategy: 'create',
        addressToken: testToken2,
        parentDataReference: { namespaceRoot: { cairn: true } },
        propertyOptionsObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});
