// test-use-case-xri-parser-root-bad-vector-uri.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');


xriParserUseCase({
    testName: "Bad xRI vector relative to store: single colon, random tokens.",
    validConfig: false,
    model: testDataModel,
    xri: "random1:random2",
    expectedResults: {
        error: 'xRIP.parse \'random1:random2\' failed: Unrecognized xRI type \'random1\'. Expected either \'onm-lri\', or \'onm-uri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: two colons, random tokens.",
    validConfig: false,
    model: testDataModel,
    xri: "random1:random2:random3",
    expectedResults: {
        error: 'xRIP.parse \'random1:random2:random3\' failed: Unrecognized xRI type \'random1\'. Expected either \'onm-lri\', or \'onm-uri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: three colons, random tokens.",
    validConfig: false,
    model: testDataModel,
    xri: "random1:random2:random3:random4",
    expectedResults: {
        error: 'xRIP.parse \'random1:random2:random3:random4\' failed: Unrecognized xRI type \'random1\'. Expected either \'onm-lri\', or \'onm-uri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: four colons, random tokens.",
    validConfig: false,
    model: testDataModel,
    xri: "random1:random2:random3:random4:random5",
    expectedResults: {
        error: 'xRIP.parse \'random1:random2:random3:random4:random5\' failed: Unrecognized xRI type \'random1\'. Expected either \'onm-lri\', or \'onm-uri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: single colon, valid URI prefix.",
    validConfig: false,
    model: testDataModel,
    xri: "onm-uri:random2",
    expectedResults: {
        error: 'xRIP.parse \'onm-uri:random2\' failed: URI in address space \'random2\' cannot be decoded using model \'431c97059a0240f9312f1b8854d58bfa:585db532280f349b37bf31f654d58c10\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI vector relative to store: single colon, valid URI prefix, invalid model UUID.",
    validConfig: false,
    model: testDataModel,
    xri: "onm-uri:66981d42-6e8d-45a6-b043-d800b46b0fa6",
    expectedResults: {
        error: 'xRIP.parse \'onm-uri:66981d42-6e8d-45a6-b043-d800b46b0fa6\' failed: URI in address space \'66981d42-6e8d-45a6-b043-d800b46b0fa6\' cannot be decoded using model \'431c97059a0240f9312f1b8854d58bfa:585db532280f349b37bf31f654d58c10\'.'
    }
});


xriParserUseCase({
    testName: "Bad xRI vector relative to store: two colons, valid URI prefix, valid model UUID, corrupt path.",
    validConfig: false,
    model: testDataModel,
    xri: "onm-uri:431c97059a0240f9312f1b8854d58bfa:random3",
    expectedResults: {
        error: 'xRIP.parse \'onm-uri:431c97059a0240f9312f1b8854d58bfa:random3\' failed: Path token 1, \'.>>>random3<<<\', vectors outside model\'s address space. Hint: parent namespace \'addressBook\' declares child namespace(s): \'contacts\' of type \'extensionPoint\', \'properties\' of type \'child\'.'
    }
});

