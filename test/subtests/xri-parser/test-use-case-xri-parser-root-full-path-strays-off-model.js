 // test-use-case-xri-parser-root-full-path-strays-off-model.

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Full valid path that's not in the address space evaluated relative to store container.",
    validConfig: false,
    model: testDataModel,
    xri: 'addressBook.contacts.OFFTHETRACKS',
    expectedResults: {
        error: ''
    }
});



