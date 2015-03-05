// test-use-case-address-resolver-open-root-noop.js
//

var testModuleDependencies = require('./requires-dependencies');
var testAddressResolverUseCase = require('./test-core-address-resolver');
var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();
var rootAddress = dataModel.address("*");

testResult = testAddressResolverUseCase({
    strategyName: "open",
    operationName: "noop",
    targetNamespace: "root",
    inputOptions: {
        strategy: "open",
        address: rootAddress,
        parentDataReference: { namespaceRoot: { cairn:"test marker in parent data."}},
        semanticBindingsReference: dataModel.getSemanticBindings(),
        propertyAssignmentObject: {}
    },
    expectCallToThrow: false,
    resultExpectations: {
        resolvedComponentCount: 1,
        dataChangeEventJournalCount: 0,
        JSON: {
            namespace: '{"cairn":"test marker in parent data."}',
            parent: '{"namespaceRoot":{"cairn":"test marker in parent data."}}',
            journal: '[]'
        }
    }
});



