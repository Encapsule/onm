// test-use-case-xri-parser-anonymous-bad-paths.js


var testData = require('../../fixture/address-book-data-model');
var testDataModel = testData.createModel();
var rootAddress = testDataModel.createRootAddress();
var xriParserUseCase = require('./test-runner-xri-parser');

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, null path",
    validConfig: false,
    model: testDataModel,
    xri: "",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse failed: Invalid request object missing required property \'xri\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, try to sneak in a path of a single space",
    validConfig: false,
    model: testDataModel,
    xri: " ",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \' \' failed: Path beginning with token \' \' cannot be parsed relative to this model\'s anonymous namespace. Expected either \'*\' or \'addressBook\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, bad address space entry attempt 1",
    validConfig: false,
    model: testDataModel,
    xri: "hey man, what's going on?",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'hey man, what\'s going on?\' failed: Path beginning with token \'hey man, what\'s going on?\' cannot be parsed relative to this model\'s anonymous namespace. Expected either \'*\' or \'addressBook\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, bad address space entry attempt 2",
    validConfig: false,
    model: testDataModel,
    xri: "!", 
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'!\' failed: Path beginning with token \'!\' cannot be parsed relative to this model\'s anonymous namespace. Expected either \'*\' or \'addressBook\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, bad address space entry attempt 3",
    validConfig: false,
    model: testDataModel,
    xri: "addressBookWhoops", 
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'addressBookWhoops\' failed: Path beginning with token \'addressBookWhoops\' cannot be parsed relative to this model\'s anonymous namespace. Expected either \'*\' or \'addressBook\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, bad address space entry attempt 4",
    validConfig: false,
    model: testDataModel,
    xri: "littleLambsEatIvy", 
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'littleLambsEatIvy\' failed: Path beginning with token \'littleLambsEatIvy\' cannot be parsed relative to this model\'s anonymous namespace. Expected either \'*\' or \'addressBook\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, wildcard entry into address space w/bad 2nd token",
    validConfig: false,
    model: testDataModel,
    xri: "*.fail",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'*.fail\' failed: Path token 2, \'*.>>>fail<<<\', vectors outside model\'s address space. Hint: parent namespace \'addressBook\' declares child namespace(s): \'contacts\' of type \'extensionPoint\', \'properties\' of type \'child\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, wildcard entry into address space w/bad 3rd token",
    validConfig: false,
    model: testDataModel,
    xri: "*.properties.fail",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'*.properties.fail\' failed: Path token 3, \'*.properties.>>>fail<<<\', vectors outside model\'s address space. Hint: parent namespace \'properties\' declares child namespace(s): \'subproperties\' of type \'child\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, wildcard entry into address space w/bad 4th token",
    validConfig: false,
    model: testDataModel,
    xri: "*.properties.subproperties.fail",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'*.properties.subproperties.fail\' failed: Path token 4, \'*.properties.subproperties.>>>fail<<<\', vectors outside model\'s address space. Hint: parent namespace \'subproperties\' declares child namespace(s): \'collection\' of type \'extensionPoint\'.'
    }
});

xriParserUseCase({
    testName: "Bad xRI path: relative to model anonymous namespace, wildcard entry into address space w/jsonTag at 5th token, error at 6th",
    validConfig: false,
    model: testDataModel,
    xri: "*.properties.subproperties.collection.+.fail",
    addressBase: undefined,
    expectedResults: {
        error: 'xRIP.parse \'*.properties.subproperties.collection.+.fail\' failed: Path token 6, \'*.properties.subproperties.collection.+.>>>fail<<<\', vectors outside model\'s address space. Hint: parent namespace \'someObject\' is a leaf namespace with no declared children.'
    }
});


