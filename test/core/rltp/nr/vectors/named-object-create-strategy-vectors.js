// generate-named-object-create-strategy-vectors.js
//

var dirRequires = require('./dir-requires');

var onm = dirRequires.onm;
var testDataModelDeclaration = dirRequires.testDataModelDeclaration;

var testDataModel = new onm.Model(testDataModelDeclaration);

var dimensionNamespaceType = require('./vector-dimension-create-namespace-type');
var dimensionNamespaceKey = require('./vector-dimension-create-namespace-key');
var dimensionPropertyAssignment = require('./vector-dimension-create-property-assignment');

var generateTestVectors = module.exports = function() {
    var testVectors = {};
    dimensionNamespaceType.testValues.forEach(function(namespaceDescriptor_) {
        dimensionNamespaceKey.testValues.forEach(function(namespaceKey_) {
            dimensionPropertyAssignment.testValues.forEach(function(propertyAssignmentObject_) {
                var testName = namespaceDescriptor_.label + " | " + namespaceKey_.label + " | " + propertyAssignmentObject_.label;
                var propertyAssignmentObject = (namespaceDescriptor_.data.namespaceType !== 'extensionPoint') && onm.util.clone(propertyAssignmentObject_.data) || {};
                var options = {
                    strategy: 'create',
                    parentDataReference: {},
                    targetNamespaceDescriptor: namespaceDescriptor_.data,
                    targetNamespaceKey: namespaceKey_.data,
                    propertyAssignmentObject: propertyAssignmentObject,
                    semanticBindingsReference: testDataModel.getSemanticBindings()
                };
                // Create the vector
                testVectors[testName] = [{
                    options: options,
                    validConfig: namespaceDescriptor_.validConfig && namespaceKey_.validConfig && propertyAssignmentObject_.validConfig
                }];
            });
        });
    });
    return testVectors;
};

