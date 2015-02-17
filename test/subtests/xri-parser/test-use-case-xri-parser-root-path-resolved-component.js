// test-use-case-xri-parser-root-path-resolved-component.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Full valid path to a resolved data component.",
    validConfig: true,
    model: testDataModel,
    xri: 'addressBook.contacts.TESTKEY.addresses',
    addressBase: rootAddress,
    expectedResults: {
        uri: '',
        lri: '',
        error: ''
    }
});



