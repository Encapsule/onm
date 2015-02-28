// test-use-case-component-resolver-open-apply-subnamespace-2-data-2.js

var testModuleDependencies = require('./requires-dependencies');

var testComponentResolverUseCase = testModuleDependencies.testComponentResolverUseCase;
var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();
var childToken = dataModel.address("namespaceRoot.namespaceChildA.namespaceChildB.namespaceChildC").implementation.getLastToken();

var testComponentResolverUseCase = require('./test-core-component-resolver');

testComponentResolverUseCase({
    strategyName: "open",
    operationName: "apply data-2",
    targetNamespace: "subnamespace-2",
    inputOptions: {
        strategy: 'open',
        addressToken: childToken,
        parentDataReference: {
            namespaceRoot: { 
                namespaceChildA: {
                    namespaceChildB: {
                        // this is the namespace addressed by the token
                        namespaceChildC: {
                            namespaceChildD: {
                                namespaceChildE: {
                                },
                                namespaceExtensionPointE: {
                                }
                            }
                        }
                    }
                }
            }
        },
        propertyAssignmentObject: {
            cairn: "expected to be written in namespaceChildC as a property",
            namespaceChildD: {
                cairn: "This should be written to namespaceChildD as a property",
                namespaceChildE: {
                    cairn: "This should be written in namespaceChildE as a property"
                },
                namespaceExtensionPointE: {
                    key0: {
                        cairn: "5c4da01c460a2813ee1937a954cc099d"
                    }
                }
            }
        },
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedNamedObjectCount: 4,
        pendingSubcomponentCount: 1,
        dataChangeEventJournalCount: 3,
        JSON: {
            namespace: '{"namespaceChildD":{"namespaceChildE":{"cairn":"This should be written in namespaceChildE as a property"},"namespaceExtensionPointE":{},"cairn":"This should be written to namespaceChildD as a property"},"cairn":"expected to be written in namespaceChildC as a property"}',
            parent: '{"namespaceRoot":{"namespaceChildA":{"namespaceChildB":{"namespaceChildC":{"namespaceChildD":{"namespaceChildE":{"cairn":"This should be written in namespaceChildE as a property"},"namespaceExtensionPointE":{},"cairn":"This should be written to namespaceChildD as a property"},"cairn":"expected to be written in namespaceChildC as a property"}}}}}',
            journal: '[{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"cairn","model":false,"value":"\\"expected to be written in namespaceChildC as a property\\"","source":"data"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"cairn","model":false,"value":"\\"This should be written to namespaceChildD as a property\\"","source":"data"}},{"layer":"namedObject","event":"propertyInitialized","eventData":{"name":"cairn","model":false,"value":"\\"This should be written in namespaceChildE as a property\\"","source":"data"}}]'
        }
    }
});

