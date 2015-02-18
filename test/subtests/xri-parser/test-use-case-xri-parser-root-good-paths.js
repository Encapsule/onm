// test-use-case-xri-parser-root-good-paths.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Single path token reletive to root namespace.",
    validConfig: true,
    model: testDataModel,
    xri: 'contacts',
    addressBase: rootAddress,
    expectedResults: {
        uri: 'onm-uri:431c97059a0240f9312f1b8854d58bfa:contacts',
        lri: 'onm-lri:585db532280f349b37bf31f654d58c10:5'
    }
});


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




