// test-use-case-xri-parser-root-bad-path.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Bad xRI path relative to store: undefined xRI",
    validConfig: false,
    xri: undefined,
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid request object missing required property \'xri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: null xRI",
    validConfig: false,
    xri: null,
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid request object missing required property \'xri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: number instead of string",
    validConfig: false,
    xri: 5,
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid resource identifier type \'[object Number]\'. Expected \'[object String]\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: object instead of string",
    validConfig: false,
    xri: {},
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid resource identifier type \'[object Object]\'. Expected \'[object String]\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: array instead of string",
    validConfig: false,
    xri: [],
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid resource identifier type \'[object Array]\'. Expected \'[object String]\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: missing string tokens",
    validConfig: false,
    xri: "addressBook..contact",
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: onm.Model.createPathAddress failed: getPathIdFromPath fail: Path \'addressBook..contact\' is not in the \'addressBook\' model\'s address space.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: missing string tokens",
    validConfig: false,
    xri: "addressBook..contact",
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: onm.Model.createPathAddress failed: getPathIdFromPath fail: Path \'addressBook..contact\' is not in the \'addressBook\' model\'s address space.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: relative path vectors below store",
    validConfig: false,
    xri: "//.//.foo",
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid relative path xRI. Cannot descend below root namespace.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: relative path vectors below store",
    validConfig: false,
    xri: "//.//.foo",
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid relative path xRI. Cannot descend below root namespace.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path relative to store: starts okay, but then attempts to descend.",
    validConfig: false,
    xri: "addressBook.//",
    addressBase: rootAddress,
    expectedResults: {
        error: 'onm.xRIParser failed: Invalid path xRI. You cannot descend the namespace hierarchy after beginning an ascent.'
    }
});




