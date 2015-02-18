// test-use-case-xri-parser-bad-vector-lri.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Bad xRI vector relative to store: single colon, valid LRI prefix.",
    validConfig: false,
    model: testDataModel,
    xri: "onm-lri:random2",
    expectedResults: {
        error: 'xRIP.parse \'onm-lri:random2\' failed: LRI in address space \'random2\' cannot be decoded using model \'431c97059a0240f9312f1b8854d58bfa:585db532280f349b37bf31f654d58c10\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: single colon, valid LRI prefix, invalid model version UUID.",
    validConfig: false,
    model: testDataModel,
    xri: "onm-lri:3726c371-18b6-4ed4-86b7-9818b55af218",
    expectedResults: {
        error: 'xRIP.parse \'onm-lri:3726c371-18b6-4ed4-86b7-9818b55af218\' failed: LRI in address space \'3726c371-18b6-4ed4-86b7-9818b55af218\' cannot be decoded using model \'431c97059a0240f9312f1b8854d58bfa:585db532280f349b37bf31f654d58c10\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: single colon, valid LRI prefix, valid model version UUID, corrupt path hash.",
    validConfig: false,
    model: testDataModel,
    xri: "onm-lri:585db532280f349b37bf31f654d58c10:random3",
    expectedResults: {
        error: ''
    }
});
