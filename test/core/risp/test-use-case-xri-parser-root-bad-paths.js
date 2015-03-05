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
        error: 'xRIP.parse \'addressBook..contact\' failed: Path token 1, \'.>>>addressBook<<<..contact\', vectors outside model\'s address space. Hint: parent namespace \'addressBook\' declares child namespace(s): \'contacts\' of type \'extensionPoint\', \'properties\' of type \'child\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: path missing string token (variant 2)",
    validConfig: false,
    model: testDataModel,
    xri: "addressBook.contacts.",
    addressBase: rootAddress,
    expectedResults: {
        error: 'xRIP.parse \'addressBook.contacts.\' failed: Path token 1, \'.>>>addressBook<<<.contacts.\', vectors outside model\'s address space. Hint: parent namespace \'addressBook\' declares child namespace(s): \'contacts\' of type \'extensionPoint\', \'properties\' of type \'child\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: path missing string token (variant 3)",
    validConfig: false,
    model: testDataModel,
    xri: ".addressBook.contacts",
    addressBase: rootAddress,
    expectedResults: {
        error: 'xRIP.parse \'.addressBook.contacts\' failed: Path token 1, \'.>>><<<.addressBook.contacts\', vectors outside model\'s address space. Hint: parent namespace \'addressBook\' declares child namespace(s): \'contacts\' of type \'extensionPoint\', \'properties\' of type \'child\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: relative path vectors below store",
    validConfig: false,
    model: testDataModel,
    xri: "//.//.foo",
    addressBase: rootAddress,
    expectedResults: {
        error: 'xRIP.parse \'//.//.foo\' failed: Path contains illegal descent into the model\'s anonymous namespace.'
    }
});


xriParserUseCase({
    testName: "Bad xRI path relative to store: descent after ascent disallowed",
    validConfig: false,
    model: testDataModel,
    xri: "addressBook.//",
    addressBase: rootAddress,
    expectedResults: {
        error: 'xRIP.parse \'addressBook.//\' failed: Path contains illegal namespace descent after ascent.'
    }
});




