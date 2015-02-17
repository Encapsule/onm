// test-use-case-xri-parser-root-bad-path.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');


xriParserUseCase({
    testName: "Bad xRI path relative to store: path missing string token",
    validConfig: false,
    model: testDataModel,
    xri: "addressBook..contact",
    addressBase: rootAddress,
    expectedResults: {
        error: ''
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: path missing string token (variant 2)",
    validConfig: false,
    model: testDataModel,
    xri: "addressBook.contacts.",
    addressBase: rootAddress,
    expectedResults: {
        error: ''
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: path missing string token (variant 3)",
    validConfig: false,
    model: testDataModel,
    xri: ".addressBook.contacts",
    addressBase: rootAddress,
    expectedResults: {
        error: ''
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: relative path vectors below store",
    validConfig: false,
    model: testDataModel,
    xri: "//.//.foo",
    addressBase: rootAddress,
    expectedResults: {
        error: ''
    }
});


xriParserUseCase({
    testName: "Bad xRI path relative to store: descent after ascent disallowed",
    validConfig: false,
    model: testDataModel,
    xri: "addressBook.//",
    addressBase: rootAddress,
    expectedResults: {
        error: ''
    }
});




