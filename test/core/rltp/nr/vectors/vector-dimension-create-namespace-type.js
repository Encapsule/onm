// vector-dimension-create-namespace-type.js
//

var dirRequires = require('./dir-requires');

var onm = dirRequires.onm;
var testDataModelDeclaration = dirRequires.testDataModelDeclaration;
var testDataModel = new onm.Model(testDataModelDeclaration);

var rootAddress = testDataModel.createRootAddress();

module.exports = {
    testDimension: 'declared namespace type',
    testValues: [
        {
            label: 'root descriptor',
            data: rootAddress.implementation.getDescriptor(),
            validConfig: true
        },
        {
            label: 'child descriptor',
            data: rootAddress.implementation.getModelDescriptorFromSubpath('namespaceChildA'),
            validConfig: true
        },
        {
            label: 'component descriptor',
            data: rootAddress.implementation.getModelDescriptorFromSubpath('namespaceExtensionPointA'),
            validConfig: true
        },
        {
            label: 'extension point descriptor',
            data: rootAddress.implementation.getModelDescriptorFromSubpath('namespaceExtensionPointA.namespaceComponentA'),
            validConfig: true
        }
    ]
};


