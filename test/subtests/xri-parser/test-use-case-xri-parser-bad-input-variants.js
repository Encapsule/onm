// test-use-case-xri-parser-bad-input-variants.js

var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Bad xRI input: request object missing required property 'model'",
    validConfig: false,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'model\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object 'model' property value undefined",
    validConfig: false,
    model: undefined,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'model\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object 'model' property value null",
    validConfig: false,
    model: null,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'model\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object 'model' property value type not onm.Model",
    validConfig: false,
    model: "WAT",
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object \'model\' value type \'[object String]\'. Expected onm.Model reference.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object missing required property 'xri'",
    validConfig: false,
    model: testDataModel,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'xri\'.'
    }
});


xriParserUseCase({
    testName: "Bad xRI input: request object 'xri' property value is undefined",
    validConfig: false,
    model: testDataModel,
    xri: undefined,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'xri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object 'xri' property value is null",
    validConfig: false,
    model: testDataModel,
    xri: null,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'xri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object 'xri' property value type not string",
    validConfig: false,
    model: testDataModel,
    xri: 5,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object \'xri\' value type \'[object Number]\'. Expected string reference.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: request object 'xri' property value is zero-length string",
    validConfig: false,
    model: testDataModel,
    xri: '',
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'xri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: attempted xRI path parse with request object 'addressBase' property value type not onm.Address",
    validConfig: false,
    model: testDataModel,
    addressBase: [],
    xri: 'shouldNotEvenBeEvaluated',
    expectedResults: {
        error: 'xRIP.parse \'shouldNotEvenBeEvaluated\' failed: Invalid request object \'addressBase\' value type \'[object Array]\'. Expected onm.Address reference.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: xRI containing a single colon with request object 'addressBase' property value set to anything.",
    validConfig: false,
    model: testDataModel,
    addressBase: [],
    xri: 'random1:',
    expectedResults: {
        error: 'xRIP.parse \'random1:\' failed: Invalid request object sets \'addressBase\' value in the context of a vector xRI parse.'
    }
});

xriParserUseCase({
    testName: "Bad xRI input: xRI containing a single colon with with a bogus onm vector prefix.",
    validConfig: false,
    model: testDataModel,
    xri: 'bogus:',
    expectedResults: {
        error: 'xRIP.parse \'bogus:\' failed: Unrecognized xRI type \'bogus\'. Expected either \'onm-lri\', or \'onm-uri\'.'
    }
});


