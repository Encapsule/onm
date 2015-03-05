// test-use-case-component-resolver-bogus-strategy.js

var testModuleDependencies = require('./requires-dependencies');

var testComponentResolverUseCase = testModuleDependencies.testComponentResolverUseCase;
var dataModelDeclaration = testModuleDependencies.dataModelDeclaration;
var dataModel = new testModuleDependencies.onm.Model(dataModelDeclaration).implementation.resetKeyGenerator();

var rootToken = dataModel.address("*").implementation.getLastToken();

var assert = require('chai').assert;

testComponentResolverUseCase({
    strategy: "bogus strategy",
    operation: "apply data-N",
    targetNamespace: "component root",
    inputOptions: {
        strategy: 'bogus',
        addressToken: rootToken,
        parentDataReference: {},
        propertyAssignmentObject: {},
        semanticBindingsReference: dataModel.getSemanticBindings()
    },
    expectCallToThrow: true
});
